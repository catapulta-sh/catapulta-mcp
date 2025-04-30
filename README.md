

# Catapulta MCP

A Model Context Protocol (MCP) implementation for [Catapulta](https://catapulta.sh), enabling AI models to easily connect to Web3 and deploy smart contracts in +20 EVM networks without cryptocurrencies.

## Overview

Catapulta MCP is a server implementation that bridges the gap between AI models and Web3, allowing for the automation of smart contracts deployment tasks and other operations. It provides a standardized way for AI models to interact with Catapulta's functionality through a secure and controlled interface.

## Features

- **Deployment Command Generation**: AI-powered generation of deployment commands with support for multiple networks
- **Safe Command Execution**: Controlled execution of CLI commands with built-in safety checks
- **Wallet Management**: Generate, manage wallets and get gas funding through simple commands
- **Network Support**: Extensive network support including:
  - Ethereum networks (mainnet, testnets)
  - Layer 2 solutions (Arbitrum, Optimism, Base)
  - Alternative chains (BSC, Gnosis, Scroll)
- **Advanced Deployment Options**:
  - Gas optimization with gas-hawk mode

## Installation

```bash
# Clone the repository
git clone https://github.com/catapulta-sh/catapulta-mcp.git
cd catapulta-mcp

# Install dependencies
npm install
```

## Usage

### Basic Usage

```typescript
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

// Create an MCP server
const server = new McpServer({
    name: 'catapulta-cli-server',
    version: '0.1.0',
});

// Start the server with StdIO transport
const transport = new StdioServerTransport();
server.connect(transport).catch((error) => {
    console.error('[MCP Error]', error);
    process.exit(1);
});
```

### Deployment Command Generation

```typescript
// Example of generating a deployment command
const command = await server.tool('generate_deploy_command', {
    script_path: 'path/to/script',
    network: 'matic',
    sponsor: true,
    gas_hawk: true
});
```

## Supported Networks

The following networks are supported for deployments:

- **Ethereum**: main, goerli, sepolia
- **Layer 2**:
  - Arbitrum: arbitrum, arbitrumGoerli, arbitrumSepolia
  - Optimism: optimism, optimismGoerli, optimismSepolia
  - Base: base, baseTestnet, baseSepolia
- **Alternative Chains**:
  - BSC: bsc, bscTestnet
  - Gnosis: gnosis, gnosisTestnet
  - Scroll: scroll, scrollSepolia
  - And many more...

## Security

The implementation includes several security measures:

- Whitelist of allowed commands
- Input validation for all parameters
- Controlled execution environment
- Error handling and logging

## Development

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Catapulta CLI installed

### Building

```bash
# Build the project
npm run build

# Run tests
npm test
```

### Using it on Cursor

1. Open Cursor Settings
2. Go to the MCP tab
3. Click on Add new global MCP server

Paste the following JSON on the mcp.json

Max Osx, GNU/Linux
```json
{
  "mcpServers": {
    "catapulta": {
      "command": "npx",
      "args": ["-y", "@catapulta/mcp-server@latest"],
      "env": {}
    }
  }
}
```

Windows 10, Windows 11
```json
{
  "mcpServers": {
    "catapulta": {
      "command": "C:\\Windows\\System32\\cmd.exe",
      "args": [
        "/c",
        "npx",
        "-y",
        "@catapulta/mcp-server@latest"
      ],
      "env": {}
    }
  }
}
```

## Acknowledgments

- [Model Context Protocol](https://modelcontextprotocol.io)
- [Catapulta CLI](https://github.com/catapulta-sh)
