import { AllowedCommand, Network } from './config/config';

export interface CommandResult {
  status: "success" | "error";
  message?: string;
  data?: {
    output: string;
    command: string;
  };
}

export interface ScriptDeploymentOptions {
  script_path: string;
  network: string;
  sponsor?: boolean;
  gas_hawk?: boolean;
  simulate?: boolean;
  simulate_block_number?: string;
  skip_verify?: boolean;
  libraries?: string;
  private_key?: string;
}

export interface CreateDeploymentOptions {
  contract_path: string;
  contract_name: string;
  network: string;
  sponsor?: boolean;
  gas_hawk?: boolean;
  simulate?: boolean;
  simulate_block_number?: string;
  skip_verify?: boolean;
  libraries?: string;
  private_key?: string;
  constructor_args?: string[];
}

export interface WalletOptions {
  help?: boolean;
  unsafe?: boolean;
}

export type { AllowedCommand, Network };

export interface NetworkPricing {
  openzeppelin: string;
  oneGas: string;
  network: string;
}

export interface PricingResponse {
  [chainId: string]: NetworkPricing;
}

export interface PricingOptions {
  chain_id?: string;
}
