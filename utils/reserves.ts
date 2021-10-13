import { callContractProps, createInstance } from '~/web3/evm_utils'
import { EvmChains } from '~/components/utils'
import {
  ProvidersUrl,
  contractsABI,
  gtonAddressesArray,
} from '~/web3/constants'
import { AbiItem } from 'web3-utils'
import { TokenAmount } from '~/utils/safe-math'

type Pool = {
  chain: EvmChains
  provider: ProvidersUrl
  mainPoolContract: string
  stablePoolContract: string
}

export const pools: Pool[] = [
  {
    chain: EvmChains.Ethereum,
    provider: ProvidersUrl.MAINNET_INFURA_URL,
    mainPoolContract: '0xba38eca6dfdb92ec605c4281c3944fccd9dec898',
    stablePoolContract: '0x0b3ecea6bc79be3ecc805528655c4fc173cac2dd',
  },
  {
    chain: EvmChains.Fantom,
    provider: ProvidersUrl.FANTOM_PROVIDER_URL,
    mainPoolContract: '0x25f5b3840d414a21c4fc46d21699e54d48f75fdd',
    stablePoolContract: '0x8a5555c4996b72e5725cf108ad773ce5e715ded4',
  },
  {
    chain: EvmChains.Binance,
    provider: ProvidersUrl.BSC_PROVIDER_URL,
    mainPoolContract: '0xa216571b69dd69600f50992f7c23b07b1980cfd8',
    stablePoolContract: '0xbe2c760ae00cbe6a5857cda719e74715edc22279',
  },
  {
    chain: EvmChains.Polygon,
    provider: ProvidersUrl.POLYGON_PROVIDER_URL,
    mainPoolContract: '0x7d49d50c886882220c428afbe60408904c72e2df',
    stablePoolContract: '0xf01a0a0424bda0acdd044a61af88a34636e0001c',
  },
  // {
  //   provider: ProvidersUrl.HECO_PROVIDER_URL,
  //   mainPoolContract: "0xba38eca6dfdb92ec605c4281c3944fccd9dec898",
  //   stablePoolContract: "0xba38eca6dfdb92ec605c4281c3944fccd9dec898",
  // },
  // {
  //   provider: ProvidersUrl.XDAI_PROVIDER_URL,
  //   mainPoolContract: "0xba38eca6dfdb92ec605c4281c3944fccd9dec898",
  //   stablePoolContract: "0xba38eca6dfdb92ec605c4281c3944fccd9dec898",
  // },
]

export interface PriceData extends Reserves {
  dexGtonPrice: string
}
export interface Reserves {
  gtonReserve: TokenAmount
  nativeReserve: TokenAmount
}

export async function getPoolReserves(
  provider: ProvidersUrl,
  contract: string
): Promise<Reserves> {
  const props = ['token0', 'getReserves']
  const web3 = createInstance(provider)
  const res = await callContractProps(
    web3,
    contract,
    contractsABI.LpContractV2 as AbiItem[],
    props
  )
  if (gtonAddressesArray.includes(String(res['token0']))) {
    return {
      //@ts-ignore
      gtonReserve: new TokenAmount(res['getReserves']['_reserve0'], 18),
      //@ts-ignore
      nativeReserve: new TokenAmount(res['getReserves']['_reserve1'], 18),
    }
  } else {
    return {
      //@ts-ignore
      gtonReserve: new TokenAmount(res['getReserves']['_reserve1'], 18),
      //@ts-ignore
      nativeReserve: new TokenAmount(res['getReserves']['_reserve0'], 18),
    }
  }
}

export function calculatePrice(stableReserves: TokenAmount, tokenReserves: TokenAmount): string {
  // the price in stable-token pool equals stableReserves / tokenReserves
  return stableReserves.toEther().dividedBy(tokenReserves.toEther()).toFixed(2)
}