import { ScriptDeploymentOptions, CreateDeploymentOptions, WalletOptions } from "../types.js";

/**
 * Builds a script deployment command string from options
 * @param options - Script deployment configuration options
 * @returns Formatted command string
 */
export function buildScriptDeploymentCommand(options: ScriptDeploymentOptions): string {
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
 * Builds a create deployment command string from options
 * @param options - Create deployment configuration options
 * @returns Formatted command string
 */
export function buildCreateDeploymentCommand(options: CreateDeploymentOptions): string {
  const {
    contract_path,
    contract_name,
    network,
    sponsor = true,
    gas_hawk = false,
    simulate = false,
    simulate_block_number,
    skip_verify = false,
    libraries,
    constructor_args,
  } = options;

  const command = [
    "catapulta create",
    `${contract_path}:${contract_name}`,
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

  // IMPORTANT: Constructor args must always go at the end
  if (constructor_args && constructor_args.length > 0) {
    return `${command} --constructor-args ${constructor_args.join(" ")}`;
  }

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