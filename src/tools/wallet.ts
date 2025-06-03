import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { walletSchema } from "../schemas/commands.js";
import { buildWalletCommand } from "../utils/command-builder.js";
import { WalletOptions } from "../types.js";

/**
 * Registers the wallet management tool with the MCP server
 * @param server - The MCP server instance
 */
export function registerWalletTool(server: McpServer) {
  server.tool(
    "manage_wallet",
    walletSchema,
    async (options: WalletOptions) => {
      const command = buildWalletCommand(options);

      return {
        content: [
          {
            type: "text",
            text: `Command to execute:\n\n${command}`,
          },
        ],
        terminal_command: command,
        should_run_command: true,
      };
    }
  );
} 