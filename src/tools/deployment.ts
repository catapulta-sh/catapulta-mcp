import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { deploymentSchema } from "../schemas/deployment.js";
import { buildDeploymentCommand } from "../utils/command-builder.js";
import { DeploymentOptions } from "../types.js";

/**
 * Registers the deployment tool with the MCP server
 * @param server - The MCP server instance
 */
export function registerDeploymentTool(server: McpServer) {
  server.tool(
    "generate_deploy_command",
    deploymentSchema,
    async (options: DeploymentOptions) => {
      const command = buildDeploymentCommand(options);

      return {
        content: [
          {
            type: "text",
            text: `Command to execute:\n\n${command}\n\nIMPORTANT: This command will handle everything needed for deployment, including gas. No additional wallet operations are needed.`,
          },
        ],
        terminal_command: command,
        should_run_command: true,
      };
    }
  );
} 