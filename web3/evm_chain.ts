import { Chains } from '~/components/utils'

interface NativeCurrency {
  name: string
  decimals: number
  symbol: string
}

export type MetamaskChain = {
  chainId: string | number
  chainIdHex: string
  chainName: string
  rpcUrls: Array<string>
  nativeCurrency: NativeCurrency
  img: string
  blockExplorerUrls: Array<string>
}

export const availableChains: { [key in Chains]: MetamaskChain } = {
  [Chains.Ethereum]: {
    chainId: 1,
    chainIdHex: '0x1',
    chainName: 'Ethereum',
    rpcUrls: ['https://mainnet.infura.io/v3/ec6afadb1810471dbb600f24b86391d2'],
    nativeCurrency: { name: 'ETH', decimals: 18, symbol: 'ETH' },
    img: '/img/bridge/chains/ethereum.svg',
    blockExplorerUrls: ['https://etherscan.io'],
  },
  [Chains.Polygon]: {
    chainId: 137,
    chainIdHex: '0x89',
    chainName: 'Polygon',
    rpcUrls: ['https://rpc-mainnet.maticvigil.com/'],
    nativeCurrency: { name: 'MATIC', decimals: 18, symbol: 'MATIC' },
    img: '/img/bridge/chains/ethereum.svg',
    blockExplorerUrls: ['https://explorer.matic.network/'],
  },
  [Chains.Binance]: {
    chainId: 56,
    chainIdHex: '0x38',
    chainName: 'BSC',
    img: '/img/bridge/chains/binance.svg',
    rpcUrls: ['https://bsc-dataseed.binance.org/'],
    nativeCurrency: { name: 'BNB', decimals: 18, symbol: 'BNB' },
    blockExplorerUrls: ['https://bscscan.com'],
  },
  [Chains.Fantom]: {
    chainId: 250,
    chainIdHex: '0xFA',
    chainName: 'Fantom',
    img: '/img/bridge/chains/fantom.svg',
    rpcUrls: ['https://rpcapi.fantom.network'],
    nativeCurrency: { name: 'FTM', decimals: 18, symbol: 'FTM' },
    blockExplorerUrls: ['https://ftmscan.com/'],
  },
  [Chains.Xdai]: {
    chainName: 'xDAI Chain',
    chainId: 100,
    chainIdHex: '0x64',
    img: '',
    rpcUrls: ['https://dai.poa.network'],
    nativeCurrency: { name: 'xDAI', decimals: 18, symbol: 'XDAI' },
    blockExplorerUrls: ['https://blockscout.com/xdai/mainnet/'],
  },
  [Chains.Heco]: {
    chainName: 'Heco',
    chainId: 128,
    chainIdHex: '0x80',
    img: '',
    rpcUrls: ['https://http-mainnet.hecochain.com'],
    nativeCurrency: { name: 'HT', decimals: 18, symbol: 'HT' },
    blockExplorerUrls: ['https://hecoinfo.com'],
  },
  [Chains.Avax]: {
    chainName: 'Avalanche',
    chainId: 43114,
    chainIdHex: '0xA86A',
    img: '',
    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
    nativeCurrency: { name: 'AVAX', decimals: 18, symbol: 'AVAX' },
    blockExplorerUrls: ['https://cchain.explorer.avax.network'],
  },
}
