import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { pricingSchema } from "../schemas/deployment.js";
import { PricingOptions, PricingResponse, NetworkPricing } from "../types.js";

/**
 * Fetches pricing information from Catapulta API
 * @param chainId - Optional specific chain ID to filter
 * @returns Pricing information
 */
async function fetchPricingData(chainId?: string): Promise<PricingResponse> {
  try {
    const response = await fetch("https://catapulta.sh/api/pricing");
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: PricingResponse = await response.json();
    
    // If specific chain ID requested, filter the response
    if (chainId && data[chainId]) {
      return { [chainId]: data[chainId] };
    } else if (chainId && !data[chainId]) {
      throw new Error(`Chain ID ${chainId} not found in pricing data`);
    }
    
    return data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    throw new Error(`Failed to fetch pricing data: ${errorMessage}`);
  }
}

/**
 * Formats pricing data for display
 * @param data - Pricing response data
 * @returns Formatted string
 */
function formatPricingData(data: PricingResponse): string {
  let output = "🏷️ **Catapulta Network Pricing Information**\n\n";
  
  const entries = Object.entries(data);
  
  if (entries.length === 1) {
    const [chainId, pricing] = entries[0];
    output += `**${pricing.network} (Chain ID: ${chainId})**\n`;
    output += `• ERC20 Token Deployment Cost: $${parseFloat(pricing.openzeppelin).toFixed(4)} USD\n`;
    output += `• Standard Transaction Cost (100k gas): $${parseFloat(pricing.oneGas).toFixed(4)} USD\n\n`;
  } else {
    output += "| Chain ID | Network | ERC20 Deploy Cost | Tx Cost (100k gas) |\n";
    output += "|----------|---------|-------------------|--------------------|\n";
    
    // Sort by chain ID numerically
    const sortedEntries = entries.sort(([a], [b]) => parseInt(a) - parseInt(b));
    
    for (const [chainId, pricing] of sortedEntries) {
      const deploymentCost = parseFloat(pricing.openzeppelin).toFixed(4);
      const txCost = parseFloat(pricing.oneGas).toFixed(4);
      output += `| ${chainId} | ${pricing.network} | $${deploymentCost} | $${txCost} |\n`;
    }
    output += "\n";
  }
  
  output += "💡 **Notes:**\n";
  output += "• ERC20 Deploy Cost: Estimated cost to deploy an OpenZeppelin ERC20 token\n";
  output += "• Tx Cost: Cost for a transaction using 100,000 gas units\n";
  output += "• Prices are in USD and may fluctuate based on network conditions\n";
  
  return output;
}

/**
 * Registers the pricing tool with the MCP server
 * @param server - The MCP server instance
 */
export function registerPricingTool(server: McpServer) {
  server.tool(
    "get_network_pricing",
    pricingSchema,
    async (options: PricingOptions) => {
      try {
        const pricingData = await fetchPricingData(options.chain_id);
        const formattedOutput = formatPricingData(pricingData);

        return {
          content: [
            {
              type: "text",
              text: formattedOutput,
            },
          ],
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return {
          content: [
            {
              type: "text",
              text: `❌ Error fetching pricing data: ${errorMessage}`,
            },
          ],
        };
      }
    }
  );
} 