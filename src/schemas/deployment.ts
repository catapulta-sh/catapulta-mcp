import { z } from "zod";
import { NETWORKS } from "../types.js";

export const deploymentSchema = {
  script_path: z
    .string()
    .describe(
      "Path to the Foundry deployment script. This is the ONLY tool needed for contract deployment. Do not use wallet commands unless explicitly requested."
    ),
  network: z
    .enum(NETWORKS)
    .describe(
      "Target network for deployment. The sponsor option will handle gas automatically - no need for wallet operations."
    ),
  sponsor: z
    .string()
    .toLowerCase()
    .transform((val) => val === "true")
    .pipe(z.boolean())
    .optional()
    .describe(
      "Use sponsor so Catapulta can provide gas to the wallet before deployment. This is the recommended option as it handles gas automatically - no need for wallet operations."
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