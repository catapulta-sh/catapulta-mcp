import { z } from "zod";
import { ALLOWED_COMMANDS, COMMAND_DESCRIPTIONS } from "../config/config.js";

export const commandSchema = z
  .enum(ALLOWED_COMMANDS)
  .describe(
    `Available Catapulta CLI commands for information and authentication:
    
${Object.entries(COMMAND_DESCRIPTIONS)
  .map(([cmd, desc]) => `• ${cmd}: ${desc}`)
  .join('\n')}

These are informational commands only and should not be used for deployment operations. For deployments, use the generate_script_deploy_command or generate_create_deploy_command tools.`
  );

export const walletSchema = {
  help: z.boolean().optional().describe("Show wallet help information"),
  unsafe: z
    .boolean()
    .optional()
    .describe("Generate unsafe private key (not recommended for production)"),
}; 