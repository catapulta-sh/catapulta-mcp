import { z } from "zod";
import { ALLOWED_COMMANDS } from "../config/config.js";

export const commandSchema = z
  .enum(ALLOWED_COMMANDS)
  .describe(
    "List of allowed commands. These are informational commands only and should not be used for deployment operations."
  );

export const walletSchema = {
  help: z.boolean().optional().describe("Show wallet help information"),
  unsafe: z
    .boolean()
    .optional()
    .describe("Generate unsafe private key (not recommended for production)"),
}; 