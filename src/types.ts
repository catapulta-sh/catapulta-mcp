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

export const ALLOWED_COMMANDS = [
  "help",
  "--version",
  "-v",
  "login",
  "network",
] as const;
export type AllowedCommand = (typeof ALLOWED_COMMANDS)[number];

export const NETWORKS = [
  "matic",
  "maticMumbai",
  "polygonAmoy",
  "main",
  "arbitrum",
  "arbitrumGoerli",
  "arbitrumSepolia",
  "avalanche",
  "avalancheFuji",
  "optimism",
  "optimismGoerli",
  "optimismSepolia",
  "goerli",
  "sepolia",
  "base",
  "baseTestnet",
  "baseSepolia",
  "bsc",
  "bscTestnet",
  "gnosis",
  "gnosisTestnet",
  "scroll",
  "scrollSepolia",
  "metis",
  "metisTestnet",
  "zksyncEraMainnet",
  "zksyncSepolia",
  "polygonZkEvm",
  "polygonZkEvmTestnet",
  "stavenger",
  "zKatana",
  "blastSepolia",
  "blast",
  "holesky",
  "fantom",
  "fantomTestnet",
  "celo",
  "moonbeam",
  "moonbeamTestnet",
  "kroma",
  "kromaSepolia",
  "mantle",
  "mantleSepolia",
  "zeeveDemo",
  "degen",
  "bartio",
  "sonic",
  "sonicTestnet",
  "lensTestnet",
  "unichainTestnet",
  "mode",
  "modeTestnet",
  "monadTestnet",
  "ink",
  "inkTestnet",
  "corn",
  "cornTestnet",
] as const;

export type Network = (typeof NETWORKS)[number];
