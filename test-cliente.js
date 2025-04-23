import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

async function main() {
  // Create and connect the MCP client
  const client = new Client({
    name: "crypto-price-test-client", 
    version: "0.1.0"
  });
  
  try {
    // Connect to our server
    await client.connect(
      new StdioClientTransport({
        command: "node",
        args: ["crypto-price-server.js"]
      })
    );
    
    console.log("Connected to MCP server");
    
    // Test with Bitcoin as specified in requirements
    const result = await client.callTool({
      name: "price",
      arguments: {
        crypto: "bitcoin"
      }
    });
    
    console.log("Result from MCP server:");
    console.log(JSON.stringify(result, null, 2));
    
    // Parse the result text content to check if it's working as expected
    try {
      const responseData = JSON.parse(result.content[0].text);
      if (responseData.status === 'success') {
        console.log("✅ Test successful! Found price for Bitcoin:");
        console.log(`${responseData.data.asset}: ${responseData.data.price} ${responseData.data.currency}`);
      } else {
        console.log("❌ Test failed. Error:", responseData.message);
      }
    } catch (error) {
      console.error("Failed to parse response:", error);
    }
    
  } catch (error) {
    console.error("Error running test:", error);
  } finally {
    // Ensure we disconnect the client
    await client.disconnect();
    process.exit(0);
  }
}

main();
