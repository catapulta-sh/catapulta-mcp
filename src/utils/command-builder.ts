import { DeploymentOptions, WalletOptions } from "../types.js";

/**
 * Builds a deployment command string from options
 * @param options - Deployment configuration options
 * @returns Formatted command string
 */
export function buildDeploymentCommand(options: DeploymentOptions): string {
  const {
    script_path,
    network,
    sponsor = true,
    gas_hawk = false,
    simulate = false,
    simulate_block_number,
    skip_verify = false,
    libraries,
  } = options;

  const command = [
    "catapulta script",
    script_path,
    "--network",
    network,
    sponsor ? "--sponsor" : "",
    gas_hawk ? "--gas-hawk" : "",
    simulate ? "--simulate" : "",
    simulate_block_number
      ? `--simulate-block-number ${simulate_block_number}`
      : "",
    skip_verify ? "--skip-verify" : "",
    libraries ? `--libraries ${libraries}` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return command;
}

/**
 * Builds a wallet management command string from options
 * @param options - Wallet configuration options
 * @returns Formatted command string
 */
export function buildWalletCommand(options: WalletOptions): string {
  const { help = false, unsafe = false } = options;

  const command = [
    "catapulta wallet",
    help ? "--help" : "",
    unsafe ? "--unsafe-private-key" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return command;
} 