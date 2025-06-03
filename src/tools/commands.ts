import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { commandSchema } from "../schemas/commands.js";
import { executeCommand, installCatapultaCLI } from "../utils/command-executor.js";
import { AllowedCommand } from "../types.js";

/**
 * Registers the command execution tool with the MCP server
 * @param server - The MCP server instance
 */
export function registerCommandTool(server: McpServer) {
  server.tool(
    "execute_command",
    { command: commandSchema },
    async ({ command }: { command: AllowedCommand }) => {
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
            text: `Command executed successfully:\n\n${result.data?.output}\n\nNote: This is an informational command only. For deployments, use the generate_script_deploy_command or generate_create_deploy_command tools.`,
          },
        ],
      };
    }
  );
}

/**
 * Registers the CLI installation tool with the MCP server
 * @param server - The MCP server instance
 */
export function registerInstallTool(server: McpServer) {
  server.tool("install_cli", {}, async () => {
    const result = await installCatapultaCLI();

    if (result.status === "error") {
      return {
        content: [
          {
            type: "text",
            text: `Error installing Catapulta CLI: ${result.message}`,
          },
        ],
      };
    }

    return {
      content: [
        {
          type: "text",
          text: `Catapulta CLI installed successfully!\n\n${result.data?.output}`,
        },
      ],
      terminal_command: result.data?.command,
      should_run_command: true,
    };
  });
} 