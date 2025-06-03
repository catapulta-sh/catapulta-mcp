import { z } from "zod";
import { NETWORKS } from "../config/config.js";

export const scriptDeploymentSchema = {
  script_path: z
    .string()
    .describe(
      "Path to the Foundry deployment script (e.g., script/Deploy.s.sol). This tool deploys Foundry scripts."
    ),
  network: z
    .enum(NETWORKS)
    .describe(
      "Target network for deployment. Catapulta will handle gas automatically - no need for wallet operations."
    ),
  gas_hawk: z
    .string()
    .toLowerCase()
    .transform((val) => val === "true")
    .pipe(z.boolean())
    .optional()
    .describe(
      "Enable gas hawk mode to save gas costs in deployments. This is optional and only affects gas optimization."
    ),
  simulate: z
    .boolean()
    .optional()
    .describe(
      "Perform a fork simulation of the deployment script. This is for testing only and does not require wallet operations."
    ),
  simulate_block_number: z
    .string()
    .optional()
    .describe(
      "Pass a block-height to simulation (fork) mode. Only used with simulate option."
    ),
  skip_verify: z
    .boolean()
    .optional()
    .describe(
      "Skip Etherscan verification. This is optional and only affects contract verification."
    ),
  libraries: z
    .string()
    .optional()
    .describe(
      "Link libraries to the deployment script. Format: <libraryPath>:<libraryName>:<libraryAddress>. This is only needed if your contract uses external libraries and only if the developer knows what they are doing. Advanced users only."
    ),
  private_key: z
    .string()
    .optional()
    .describe(
      "Private key to use for deployment. This is optional and only affects deployment."
    ),
};

export const createDeploymentSchema = {
  contract_path: z
    .string()
    .describe(
      "Path to the contract file (e.g., src/MyContract.sol). This tool deploys contracts directly."
    ),
  contract_name: z
    .string()
    .describe(
      "Name of the contract to deploy (e.g., MyContract). This is the contract name inside the Solidity file."
    ),
  network: z
    .enum(NETWORKS)
    .describe(
      "Target network for deployment. Catapulta will handle gas automatically - no need for wallet operations."
    ),
  gas_hawk: z
    .string()
    .toLowerCase()
    .transform((val) => val === "true")
    .pipe(z.boolean())
    .optional()
    .describe(
      "Enable gas hawk mode to save gas costs in deployments. This is optional and only affects gas optimization."
    ),
  simulate: z
    .boolean()
    .optional()
    .describe(
      "Perform a fork simulation of the deployment. This is for testing only and does not require wallet operations."
    ),
  simulate_block_number: z
    .string()
    .optional()
    .describe(
      "Pass a block-height to simulation (fork) mode. Only used with simulate option."
    ),
  skip_verify: z
    .boolean()
    .optional()
    .describe(
      "Skip Etherscan verification. This is optional and only affects contract verification."
    ),
  libraries: z
    .string()
    .optional()
    .describe(
      "Link libraries to the deployment. Format: <libraryPath>:<libraryName>:<libraryAddress>. This is only needed if your contract uses external libraries and only if the developer knows what they are doing. Advanced users only."
    ),
  private_key: z
    .string()
    .optional()
    .describe(
      "Private key to use for deployment. This is optional and only affects deployment."
    ),
  constructor_args: z
    .array(z.string())
    .optional()
    .describe(
      "Constructor arguments for the contract deployment. Array of strings representing the arguments to pass to the contract constructor. These will be added at the end of the command."
    ),
};

export const pricingSchema = {
  chain_id: z
    .string()
    .optional()
    .describe(
      "Specific chain ID to get pricing for (e.g., '1' for Ethereum, '137' for Polygon). If not provided, returns pricing for all supported networks."
    ),
};
