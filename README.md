# Catapulta MCP

A Model Context Protocol (MCP) implementation for Catapulta CLI, enabling AI-powered interactions with deployment and management tools.

## Overview

Catapulta MCP is a server implementation that bridges the gap between AI models and the Catapulta CLI, allowing for intelligent automation of deployment tasks and other operations. It provides a standardized way for AI models to interact with Catapulta's functionality through a secure and controlled interface.

## Features

- **Deployment Command Generation**: AI-powered generation of deployment commands with support for multiple networks
- **Safe Command Execution**: Controlled execution of CLI commands with built-in safety checks
- **Wallet Management**: Generate and manage wallets through simple commands
- **Network Pricing Information**: Real-time pricing data for deployments across different networks
- **CLI Installation**: Automated CLI installation and setup
- **Network Support**: Extensive network support including:
  - Ethereum networks (mainnet, testnets)
  - Layer 2 solutions (Arbitrum, Optimism, Base)
  - Alternative chains (BSC, Gnosis, Scroll, Polygon zkEVM)
  - Emerging networks (Blast, Sonic, Degen, Mode, Ink, Corn)
  - And many more
- **Advanced Deployment Options**:
  - Gas optimization with gas-hawk mode
  - Choice between `catapulta script` (for Foundry scripts) and `catapulta create` (for direct contract deployment)

## Installation

```bash
# Clone the repository
git clone https://github.com/catapulta-sh/catapulta-mcp.git
cd catapulta-mcp

# Install dependencies (using pnpm)
pnpm install

# Or using npm
npm install
```

## Usage

### Basic Usage

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// Create an MCP server
const server = new McpServer({
  name: "catapulta-cli-server",
  version: "0.8.0",
});

// Start the server with StdIO transport
const transport = new StdioServerTransport();
server.connect(transport).catch((error) => {
  console.error("[MCP Error]", error);
  process.exit(1);
});
```

### Script Deployment (Foundry Scripts)

```typescript
// Deploy a Foundry deployment script
const scriptCommand = await server.tool("generate_script_deploy_command", {
  script_path: "script/Deploy.s.sol",
  network: "matic",
  sponsor: true,
  gas_hawk: true,
});
```

### Direct Contract Deployment

```typescript
// Deploy a contract directly
const createCommand = await server.tool("generate_create_deploy_command", {
  contract_path: "src/MyContract.sol",
  contract_name: "MyContract",
  network: "matic",
  sponsor: true,
  gas_hawk: true,
  constructor_args: ["arg1", "arg2"],
});
```

### Network Pricing Information

```typescript
// Get pricing for all supported networks
const allPricing = await server.tool("get_network_pricing", {});

// Get pricing for a specific network (Ethereum)
const ethereumPricing = await server.tool("get_network_pricing", {
  chain_id: "1"
});

// Get pricing for Polygon
const polygonPricing = await server.tool("get_network_pricing", {
  chain_id: "137"
});
```

### Wallet Management

```typescript
// Generate a new wallet
const wallet = await server.tool("manage_wallet", {
  unsafe: true // Only for development/testing
});
```

### CLI Installation

```typescript
// Install Catapulta CLI
const install = await server.tool("install_cli");
```

## Available Tools

The MCP server provides the following tools:

1. **`generate_script_deploy_command`** - Generate commands for deploying Foundry scripts
2. **`generate_create_deploy_command`** - Generate commands for direct contract deployment
3. **`get_network_pricing`** - Fetch real-time network pricing information
4. **`manage_wallet`** - Generate and manage wallets
5. **`install_cli`** - Install the Catapulta CLI
6. **`execute_command`** - Execute safe CLI commands (help, version, login, network, buy credits)

## Supported Networks

The following networks are supported for deployments:

- **Ethereum**: main, goerli, sepolia, holesky
- **Layer 2**:
  - Arbitrum: arbitrum, arbitrumGoerli, arbitrumSepolia
  - Optimism: optimism, optimismGoerli, optimismSepolia
  - Base: base, baseTestnet, baseSepolia
  - Scroll: scroll, scrollSepolia
  - Metis: metis, metisTestnet
  - Blast: blast, blastSepolia
  - Mode: mode, modeTestnet
- **Polygon**:
  - Polygon: matic, maticMumbai, polygonAmoy
  - Polygon zkEVM: polygonZkEvm, polygonZkEvmTestnet
  - zkSync: zksyncEraMainnet, zksyncSepolia
- **Alternative Chains**:
  - BSC: bsc, bscTestnet
  - Gnosis: gnosis, gnosisTestnet
  - Avalanche: avalanche, avalancheFuji
  - Fantom: fantom, fantomTestnet
  - Celo: celo
  - Moonbeam: moonbeam, moonbeamTestnet
- **Emerging Networks**:
  - Kroma: kroma, kromaSepolia
  - Mantle: mantle, mantleSepolia
  - Sonic: sonic, sonicTestnet
  - Degen: degen
  - Ink: ink, inkTestnet
  - Corn: corn, cornTestnet
  - And many more...

## Security

The implementation includes several security measures:

- Whitelist of allowed commands
- Input validation for all parameters using Zod schemas
- Controlled execution environment
- Error handling and logging
- Safe command execution with built-in restrictions

## Development

### Prerequisites

- Node.js (v16 or higher)
- pnpm, npm or yarn
- Catapulta CLI installed

### Building

```bash
# Build the project
pnpm build
# or
npm run build

# Run in development mode
pnpm dev
# or
npm run dev

# Start the server
pnpm start
# or
npm start
```

### Using it on Cursor

- Open Cursor Settings
- Go to the MCP tab
- Click on Add new global MCP server

Paste this on the mcp.json

```json
{
  "mcpServers": {
    "Catapulta-client": {
      "command": "npx",
      "args": ["-y", "@catapulta/mcp-server@latest"],
      "env": {}
    }
  }
}
```

### Using it on VS Code

- Open VS Code Settings
- Write "MCP" in the search bar
- Select User or Workspace and click on "Edit in settings.json"

Paste this on the settings.json

```json
{
  "mcp": {
    "servers": {
      "Catapulta-client": {
        "type": "stdio",
        "command": "npx",
        "args": ["-y", "@catapulta/mcp-server@latest"]
      }
    }
  }
}
```

## Acknowledgments

- [Model Context Protocol](https://modelcontextprotocol.io)
- [Catapulta CLI](https://github.com/catapulta-sh)
