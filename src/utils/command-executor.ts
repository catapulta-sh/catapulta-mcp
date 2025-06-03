import { exec } from "child_process";
import { promisify } from "util";
import { CommandResult } from "../types.js";
import { ALLOWED_COMMANDS } from "../config/config.js";

const execAsync = promisify(exec);

/**
 * Executes a general Catapulta CLI command
 * @param {string} command - The command to execute
 * @returns {Promise<CommandResult>} - Command execution result
 */
export async function executeCommand(command: string): Promise<CommandResult> {
  try {
    // Check if the command is allowed (only help, version, or other safe commands)
    const commandLower = command.trim().toLowerCase();

    // Extract the main command from the input
    let mainCommand = commandLower;
    if (commandLower.startsWith("catapulta ")) {
      mainCommand = commandLower.substring("catapulta ".length).trim();
    }

    // Check if the command is in the allowed list
    const isAllowed = ALLOWED_COMMANDS.some(
      (cmd) => mainCommand === cmd || mainCommand.startsWith(`${cmd} `)
    );

    if (!isAllowed) {
      return {
        status: "error",
        message:
          "This command is not allowed. Only help, version, and other informational commands are permitted.",
      };
    }

    const finalCommand = commandLower.startsWith("catapulta")
      ? command
      : `catapulta ${command}`;

    const { stdout, stderr } = await execAsync(finalCommand);

    if (stderr) {
      return {
        status: "error",
        message: stderr,
      };
    }

    return {
      status: "success",
      data: {
        output: stdout,
        command: finalCommand,
      },
    };
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error ? error.message : "Failed to execute command.",
    };
  }
}

/**
 * Installs Catapulta CLI globally
 * @returns {Promise<CommandResult>} - Installation result
 */
export async function installCatapultaCLI(): Promise<CommandResult> {
  const installCommand = "npm i -g catapulta";

  try {
    const { stdout, stderr } = await execAsync(installCommand);

    if (stderr && !stderr.includes("npm WARN")) {
      return {
        status: "error",
        message: stderr,
      };
    }

    return {
      status: "success",
      data: {
        output: stdout,
        command: installCommand,
      },
    };
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error ? error.message : "Failed to install Catapulta CLI",
    };
  }
} 