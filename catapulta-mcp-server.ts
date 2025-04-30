#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

// Create an MCP server
const server = new McpServer({
  name: "catapulta-cli-server",
  version: "0.1.0",
});

interface CommandResult {
  status: "success" | "error";
  message?: string;
  data?: {
    output: string;
    command: string;
  };
}

/**
 * Executes a general Catapulta CLI command
 * @param {string} command - The command to execute
 * @returns {Promise<CommandResult>} - Command execution result
 */
async function executeCommand(command: string): Promise<CommandResult> {
  try {
    // Check if the command is allowed (only help, version, or other safe commands)
    const allowedCommands = ["help", "--version", "-v"];
    const commandLower = command.trim().toLowerCase();

    // Extract the main command from the input
    let mainCommand = commandLower;
    if (commandLower.startsWith("catapulta ")) {
      mainCommand = commandLower.substring("catapulta ".length).trim();
    }

    // Check if the command is in the allowed list
    const isAllowed = allowedCommands.some(
      (cmd) => mainCommand === cmd || mainCommand.startsWith(`${cmd} `)
    );

    if (!isAllowed) {
      return {
        status: "error",
        message:
          "This command is not allowed. Only help, version, and other informational commands are permitted.",
      };
    }

    const finalCommand = commandLower.startsWith("catapulta")
      ? command
      : `catapulta ${command}`;

    const { stdout, stderr } = await execAsync(finalCommand);

    if (stderr) {
      return {
        status: "error",
        message: stderr,
      };
    }

    return {
      status: "success",
      data: {
        output: stdout,
        command: finalCommand,
      },
    };
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error ? error.message : "Failed to execute command.",
    };
  }
}

// Add the deployment tool to the server
server.tool(
  "generate_deploy_command",
  {
    script_path: z.string().describe("Path to the Foundry deployment script"),
    network: z
      .enum([
        "matic",
        "maticMumbai",
        "polygonAmoy",
        "main",
        "arbitrum",
        "arbitrumGoerli",
        "arbitrumSepolia",
        "avalanche",
        "avalancheFuji",
        "optimism",
        "optimismGoerli",
        "optimismSepolia",
        "goerli",
        "sepolia",
        "base",
        "baseTestnet",
        "baseSepolia",
        "bsc",
        "bscTestnet",
        "gnosis",
        "gnosisTestnet",
        "scroll",
        "scrollSepolia",
        "metis",
        "metisTestnet",
        "zksyncEraMainnet",
        "zksyncSepolia",
        "polygonZkEvm",
        "polygonZkEvmTestnet",
        "stavenger",
        "zKatana",
        "blastSepolia",
        "blast",
        "holesky",
        "fantom",
        "fantomTestnet",
        "celo",
        "moonbeam",
        "moonbeamTestnet",
        "kroma",
        "kromaSepolia",
        "mantle",
        "mantleSepolia",
        "zeeveDemo",
        "degen",
        "bartio",
        "sonic",
        "sonicTestnet",
        "lensTestnet",
        "unichainTestnet",
        "mode",
        "modeTestnet",
        "monadTestnet",
        "ink",
        "inkTestnet",
        "corn",
        "cornTestnet",
      ])
      .describe("Target network for deployment"),
    sponsor: z
      .string()
      .toLowerCase()
      .transform((val) => val === "true")
      .pipe(z.boolean())
      .optional()
      .describe(
        "Use sponsor so Catapulta can provide gas to the wallet before deployment, or deploy without crypto or deploy without cryptocurrencies"
      ),
    gas_hawk: z
      .string()
      .toLowerCase()
      .transform((val) => val === "true")
      .pipe(z.boolean())
      .optional()
      .describe(
        "Enable gas hawk mode to save gas costs in deployments or to queue the deployment to save gas prices"
      ),
    simulate: z
      .boolean()
      .optional()
      .describe(
        "Perform a fork simulation of the deployment script, does not upload artifacts"
      ),
    simulate_block_number: z
      .string()
      .optional()
      .describe("Pass a block-height to simulation (fork) mode"),
    skip_verify: z.boolean().optional().describe("Skip Etherscan verification"),
    libraries: z
      .string()
      .optional()
      .describe(
        "Link libraries or library linking to the deployment script, format: <libraryPath>:<libraryName>:<libraryAddress>. "
      ),
  },
  async ({
    script_path,
    network,
    sponsor = true,
    gas_hawk = false,
    simulate = false,
    simulate_block_number,
    skip_verify = false,
    libraries,
  }) => {
    // Format the command
    const command = [
      "catapulta script",
      script_path,
      "--network",
      network,
      sponsor ? "--sponsor" : "",
      gas_hawk ? "--gas-hawk" : "",
      simulate ? "--simulate" : "",
      simulate_block_number
        ? `--simulate-block-number ${simulate_block_number}`
        : "",
      skip_verify ? "--skip-verify" : "",
      libraries ? `--libraries ${libraries}` : "",
    ]
      .filter(Boolean)
      .join(" ");

    return {
      content: [
        {
          type: "text",
          text: `Command to execute:\n\n${command}`,
          // When this is done, run the command in the terminal
        },
      ],
      terminal_command: command,
      should_run_command: true,
    };
  }
);

// Add tool to execute help and version commands
server.tool(
  "execute_command",
  {
    command: z
      .enum(["help", "--version", "-v", "login"])
      .describe("List of allowed commands"),
  },
  async ({ command }) => {
    // Execute the command on the terminal
    const result = await executeCommand(command);

    if (result.status === "error") {
      return {
        content: [
          {
            type: "text",
            text: `Error executing command: ${result.message}`,
          },
        ],
      };
    }

    return {
      content: [
        {
          type: "text",
          text: `Command executed successfully:\n\n${result.data?.output}`,
        },
      ],
    };
  }
);

// Add tool to install Catapulta CLI
server.tool("install_cli", {}, async () => {
  const installCommand = "npm i -g catapulta";

  try {
    const { stdout, stderr } = await execAsync(installCommand);

    if (stderr && !stderr.includes("npm WARN")) {
      return {
        content: [
          {
            type: "text",
            text: `Error installing Catapulta CLI: ${stderr}`,
          },
        ],
      };
    }

    return {
      content: [
        {
          type: "text",
          text: `Catapulta CLI installed successfully!\n\n${stdout}`,
        },
      ],
      terminal_command: installCommand,
      should_run_command: true,
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error installing Catapulta CLI: ${
            error instanceof Error ? error.message : "Unknown error"
          }`,
        },
      ],
    };
  }
});

// Add tool to manage wallet
server.tool(
  "manage_wallet",
  {
    help: z.boolean().optional().describe("Show wallet help information"),
    unsafe: z
      .boolean()
      .optional()
      .describe("Generate unsafe private key (not recommended for production)"),
  },
  async ({ help = false, unsafe = false }) => {
    // Format the command
    const command = [
      "catapulta wallet",
      help ? "--help" : "",
      unsafe ? "--unsafe-private-key" : "",
    ]
      .filter(Boolean)
      .join(" ");

    return {
      content: [
        {
          type: "text",
          text: `Command to execute:\n\n${command}`,
        },
        // When this is done, run the command in the terminal
      ],
      terminal_command: command,
      should_run_command: true,
    };
  }
);

// Start the server with StdIO transport
const transport = new StdioServerTransport();
server.connect(transport).catch((error) => {
  console.error("[MCP Error]", error);
  process.exit(1);
});

console.error("Catapulta CLI MCP server running on stdio");
