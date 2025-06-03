import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { scriptDeploymentSchema, createDeploymentSchema } from "../schemas/deployment.js";
import { buildScriptDeploymentCommand, buildCreateDeploymentCommand } from "../utils/command-builder.js";
import { ScriptDeploymentOptions, CreateDeploymentOptions } from "../types.js";

/**
 * Registers the script deployment tool with the MCP server
 * @param server - The MCP server instance
 */
export function registerScriptDeploymentTool(server: McpServer) {
  server.tool(
    "generate_script_deploy_command",
    scriptDeploymentSchema,
    async (options: ScriptDeploymentOptions) => {
      const command = buildScriptDeploymentCommand(options);

      return {
        content: [
          {
            type: "text",
            text: `Script deployment command to execute:\n\n${command}\n\nThis command will deploy your Foundry script and handle everything needed for deployment, including gas. No additional wallet operations are needed.`,
          },
        ],
        terminal_command: command,
        should_run_command: true,
      };
    }
  );
}

/**
 * Registers the create deployment tool with the MCP server
 * @param server - The MCP server instance
 */
export function registerCreateDeploymentTool(server: McpServer) {
  server.tool(
    "generate_create_deploy_command",
    createDeploymentSchema,
    async (options: CreateDeploymentOptions) => {
      const command = buildCreateDeploymentCommand(options);

      return {
        content: [
          {
            type: "text",
            text: `Contract deployment command to execute:\n\n${command}\n\nThis command will deploy your contract directly and handle everything needed for deployment, including gas. No additional wallet operations are needed.`,
          },
        ],
        terminal_command: command,
        should_run_command: true,
      };
    }
  );
}