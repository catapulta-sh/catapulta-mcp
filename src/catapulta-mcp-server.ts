#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  registerScriptDeploymentTool,
  registerCreateDeploymentTool,
  registerCommandTool,
  registerInstallTool,
  registerWalletTool,
  registerPricingTool,
} from "./tools/index.js";

// Create an MCP server
const server = new McpServer({
  name: "catapulta-cli-server",
  version: "0.8.0",
});

// Register all tools
registerScriptDeploymentTool(server);
registerCreateDeploymentTool(server);
registerCommandTool(server);
registerInstallTool(server);
registerWalletTool(server);
registerPricingTool(server);

// Start the server with StdIO transport
const transport = new StdioServerTransport();
server.connect(transport).catch((error) => {
  console.error("[MCP Error]", error);
  process.exit(1);
});

console.error("Catapulta CLI MCP server running on stdio");
