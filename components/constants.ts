import {
  AVAX_PROVIDER_URL,
  BSC_PROVIDER_URL,
  FANTOM_PROVIDER_URL,
  HECO_PROVIDER_URL,
  MAINNET_INFURA_URL,
  POLYGON_PROVIDER_URL,
  XDAI_PROVIDER_URL,
} from '~/web3/constants'
import { ChainTypes } from '~/components/utils'

// при изменении сломается только механика получения чейн айди от провайдера
export enum Chains { // Надо заменить айдишники на названия по типу и добавить солану
  Eth = '1', // eth
  Bsc = '56', // bsc
  Ftm = '250', // ftm
  Xdai = '100',
  Heco = '128',
  Avax = '43114',
  Pol = '137',
  Sol = 'solana',
}

export const limits: Record<string, number> = {
  [Chains.Eth]: 0.03, //30000000000000000
  [Chains.Ftm]: 21.79, //21791995200000000000
  [Chains.Bsc]: 0.02, //20643500000000000
  [Chains.Pol]: 7.02, //7028815300000000000
  [Chains.Heco]: 0.74, // 747630800000000000
  [Chains.Xdai]: 10.0, //10002986200000000000
  [Chains.Avax]: 0.22, //224775200000000000
  [Chains.Sol]: 0.22, // Will add limit for solana?
}

interface Status {
  id: number
  visible: boolean
  text: string
}

export const statusList: Array<Status> = [
  {
    id: 0,
    visible: false,
    text: 'Deposit transaction is',
  },
  {
    id: 2,
    visible: false,
    text: 'Swap transaction is',
  },
]

export const originTokens = [
  {
    type: ChainTypes.Evm, // Добавить тип для всех чейнов
    relayTokenIndex: 1,
    chain: Chains.Pol,
    img: '/img/tokens/matic.svg',
    title: 'MATIC',
  },
  // {
  //     type: ChainTypes.Evm,
  //   relayTokenIndex: 2,
  //   chain: Chains.Ftm,
  //   img: "/img/tokens/ftm.svg",
  //   title: "FTM"
  // },
  {
    type: ChainTypes.Evm,
    relayTokenIndex: 3,
    chain: Chains.Bsc,
    img: '/img/tokens/bnb.svg',
    title: 'BNB',
  },
  {
    type: ChainTypes.Evm,
    relayTokenIndex: 4,
    chain: Chains.Eth,
    img: '/img/tokens/eth.svg',
    title: 'ETH',
  },
  // {
  //type: ChainTypes.Evm,
  //   relayTokenIndex: 5,
  //   chain: Chains.Xdai,
  //   img: "/img/tokens/xdai.svg",
  //   title: "XDAI"
  // },
  {
    type: ChainTypes.Evm,
    relayTokenIndex: 6,
    chain: Chains.Heco,
    img: '/img/tokens/heco.svg',
    title: 'HT',
  },
  // {
  //  type: ChainTypes.Evm,
  //   relayTokenIndex: 7,
  //   chain: Chains.Avax,
  //   img: "/img/tokens/avax.svg",
  //   title: "AVAX"
  // }
  {
    type: ChainTypes.Solana,
    relayTokenIndex: 7,
    chain: Chains.Sol,
    img: '/img/tokens/sol.svg',
    title: 'SOL',
  },
]

export const destinationTokens = [
  {
    type: ChainTypes.Evm,
    relayTokenIndex: 1,
    chain: Chains.Pol,
    img: '/img/tokens/matic.svg',
    title: 'MATIC',
  },
  // {
  //type: ChainTypes.Evm,
  //   relayTokenIndex: 2,
  //   chain: Chains.Ftm,
  //   img: "/img/tokens/ftm.svg",
  //   title: "FTM"
  // },
  {
    type: ChainTypes.Evm,
    relayTokenIndex: 3,
    chain: Chains.Bsc,
    img: '/img/tokens/bnb.svg',
    title: 'BNB',
  },
  // {
  //type: ChainTypes.Evm,
  //   relayTokenIndex: 5,
  //   chain: Chains.Xdai,
  //   img: "/img/tokens/xdai.svg",
  //   title: "XDAI"
  // },
  {
    type: ChainTypes.Evm,
    relayTokenIndex: 6,
    chain: Chains.Heco,
    img: '/img/tokens/heco.svg',
    title: 'HT',
  },
  // {
  //  type: ChainTypes.Evm,
  //   relayTokenIndex: 7,
  //   chain: Chains.Avax,
  //   img: "/img/tokens/avax.svg",
  //   title: "AVAX"
  // }
  {
    type: ChainTypes.Solana,
    relayTokenIndex: 7,
    chain: Chains.Sol,
    img: '/img/tokens/sol.svg',
    title: 'SOL',
  },
]

export type ChainMap = {
  [key in Chains]: string
}

type ExplorerApiData = {
  [key in Chains]: string
}

export const chainToName: ChainMap = {
  [Chains.Pol]: 'PLG',
  [Chains.Ftm]: 'FTM',
  [Chains.Bsc]: 'BSC',
  [Chains.Eth]: 'ETH',
  [Chains.Xdai]: 'DAI',
  [Chains.Heco]: 'HEC',
  [Chains.Avax]: 'AVA',
  [Chains.Sol]: 'SOL',
}
export const explorers: ChainMap = {
  [Chains.Pol]: 'https://polygonscan.com/tx/',
  [Chains.Ftm]: 'https://ftmscan.com/tx/',
  [Chains.Bsc]: 'https://bscscan.com/tx/',
  [Chains.Eth]: 'https://etherscan.io/tx/',
  [Chains.Avax]: 'https://cchain.explorer.avax.network/tx/',
  [Chains.Xdai]: 'https://blockscout.com/xdai/mainnet/tx/',
  [Chains.Heco]: 'https://hecoinfo.com/tx/',
  [Chains.Sol]: 'https://explorer.solana.com/',
}
export const chainProviderUrls: ExplorerApiData = {
  [Chains.Pol]: POLYGON_PROVIDER_URL,
  [Chains.Ftm]: FANTOM_PROVIDER_URL,
  [Chains.Bsc]: BSC_PROVIDER_URL,
  [Chains.Xdai]: XDAI_PROVIDER_URL,
  [Chains.Eth]: MAINNET_INFURA_URL,
  [Chains.Heco]: HECO_PROVIDER_URL,
  [Chains.Avax]: AVAX_PROVIDER_URL,
  [Chains.Sol]: AVAX_PROVIDER_URL, /// change this url
}
