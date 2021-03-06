import { WalletProvider } from '~/components/utils'



export interface Wallet {
  label: string
  id: number
}

export interface WalletBody {
  provider: WalletProvider | null
  isConnected: boolean
  checked: boolean
  wallet: Wallet,
  address: string
}
