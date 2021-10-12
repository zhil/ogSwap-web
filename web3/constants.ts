import RelayContract from './abi/relay_contract.json'
import ERC20ABI from './abi/erc20.json'

export const treasuryAddress = '0x953555e0Af401Bd031a5a53c72EFa81fae464276'

export const contractsAddresses: Record<string, string> = {
  gravity: '0x953555e0Af401Bd031a5a53c72EFa81fae464276',
  treasury: '0x89bE71535fFC044CC829EE8B919Cd145d71154E4',
  linear: '0xe02fd777cf41ab724c64aff649550094c9963da2',
  farm: '0x4Cb8824d45312D5dC9d9B5260fb2B1dEC297015b',
  dodoPool: '0x9f99bd1cb3a51bb6356b5de6598c5a2548fba29b',
  voter: '0x8fe0437D2D2c2d591d9CBC34D9e5803db701Dd7F',
  voterv2: '0xbf7F3Db33CfaEFA2c8d44cADc5D38d5899B2a1FF',
  balanceKeeperv2: '0x4AB096F49F2Af3cfcf2D851094FA5936f18aed90',
  balanceKeeper: '0x12a063906756e53dD94D63a67106528d3662eAd2',
  gtonEth: '0x01e0E2e61f554eCAaeC0cC933E739Ad90f24a86d',
  gtonFtm: '0xC1Be9a4D5D45BeeACAE296a7BD5fADBfc14602C4',
  gtonBsc: '0x64D5BaF5ac030e2b7c435aDD967f787ae94D0205',
  gtonPol: '0xf480f38c366daac4305dc484b2ad7a496ff00cea',
  ebShares: '0x5Db7d8Aeb9E1942a40c143fd5493237Da6150329',
}

export const relayAddresses: Record<string, string> = {
  '137': '0x308dc032417bb4b9a79606a6c61fce3c375cf6d5',
  '250': '0x48eded8ec5c52308011f191600c0e1ae60f49be6',
  '56': '0xde87ca6b2e0ff2913f2bc14232aaf400fc3826d3',
  '1': '0x53dd6d712ad1b7613bca7cf7f34e436f75729dd9',
  '128': '0xf9cdabb96cffdd53817aea813273cbe8c39b328e',
  '43114': '0xf9cdabb96cffdd53817aea813273cbe8c39b328e',
  '100': '0xbba98ea00ab995a467e9afabbb15dbddd29e1f44',
}

export const gtonAddresses = [
  '0x01e0E2e61f554eCAaeC0cC933E739Ad90f24a86d',
  '0xC1Be9a4D5D45BeeACAE296a7BD5fADBfc14602C4',
  '0x64D5BaF5ac030e2b7c435aDD967f787ae94D0205',
]

// export const treasuryERC20Tokens: { title: string; address: string }[] = [
//   {
//     title: "usdt",
//     address: "0xdac17f958d2ee523a2206206994597c13d831ec7"
//   },
//   {
//     title: "usdc",
//     address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
//   },
//   {
//     title: "dai",
//     address: "0x6b175474e89094c44da98b954eedeac495271d0f"
//   },
//   {
//     title: "busd",
//     address: "0x4fabb145d64652a948d72533023f6e7a623c7c53"
//   },
//   {
//     title: "husd",
//     address: "0xdf574c24545e5ffecb9a659c229253d4111d87e1"
//   },
//   {
//     title: "susd",
//     address: "0x57ab1ec28d129707052df4df418d58a2d46d5f51"
//   }
// ];

export const INFURA_PROVIDER_IDS = [
  'ec6afadb1810471dbb600f24b86391d2',
  '0e4a083280ed4a7884f13fb0c9fe8164',
  '4ee9f6f0bef84f5eb9b6c22c111992b7',
  'c61a2aa12dd342c3916e901f72999335',
  '5a26794976aa4f96a7cecf371add71e6',
  '4dabfbc57f1c482ebff40ee18e1b14a1',
  '66cbabab547a4daba20352f918075b57',
  '1ff338253d8b496389d992e70bacc032',
  'caba4ccd1c2746dea5d9a4ceab16664e',
  'd456e06a80f44aca9e273f0172d035f1',
  '1aa32c72e12b42e2a0e505a78a170266',
  'd192e68238ba46c9b748bbfb0d428050',
]

export const FANTOM_PROVIDER_URL = 'https://rpc.ftm.tools'
export const BSC_PROVIDER_URL = 'https://bsc-dataseed.binance.org'
export const POLYGON_PROVIDER_URL =
  'https://target.nodes.gravityhub.org/polygon'
export const HECO_PROVIDER_URL = 'https://http-mainnet.hecochain.com'
export const AVAX_PROVIDER_URL = 'https://api.avax.network/ext/bc/C/rpc'
export const XDAI_PROVIDER_URL = 'https://dai.poa.network'

export const MAINNET_INFURA_URL =
  'https://mainnet.infura.io/v3/ec6afadb1810471dbb600f24b86391d2'

export const defaultChain = { url: FANTOM_PROVIDER_URL, id: 250 }

export const contractsABI = {
  RelayContract,
  ERC20ABI,
}
