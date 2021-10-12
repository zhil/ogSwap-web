export interface Balance {
  dollarValue: number
}

export interface Wallet {
  label: string
  id: number
}

export interface WalletBody {
  provider: string
  isConnected: boolean
  label: string
  balance: Balance
  wallet: Wallet
}
