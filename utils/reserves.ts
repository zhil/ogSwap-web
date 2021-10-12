import { callContractProps, createInstance } from "~/web3/evm_utils"
import { ProvidersUrl, contractsABI, gtonAddressesArray } from "~/web3/constants"
import { AbiItem } from 'web3-utils'

type Pool = {
  provider: ProvidersUrl,
  contract: string,
}

const pools: Pool[] = [
  {
    provider: ProvidersUrl.MAINNET_INFURA_URL,
    contract: "0xba38eca6dfdb92ec605c4281c3944fccd9dec898",
  },
  {
    provider: ProvidersUrl.FANTOM_PROVIDER_URL,
    contract: "0x25f5b3840d414a21c4fc46d21699e54d48f75fdd",
  },
  {
    provider: ProvidersUrl.HECO_PROVIDER_URL,
    contract: "0xba38eca6dfdb92ec605c4281c3944fccd9dec898",
  },
  {
    provider: ProvidersUrl.BSC_PROVIDER_URL,
    contract: "0xba38eca6dfdb92ec605c4281c3944fccd9dec898",
  },
]

export const reservesAddresses = {

}

export async function getPoolReserves(pool: Pool) {
  const props = ["token0", "getReserves",];
  const web3 = createInstance(pool.provider);
  const res = await callContractProps(web3, pool.contract, contractsABI.LpContractV2 as AbiItem[], props)
  if (gtonAddressesArray.includes(String(res["token0"]))) {
    
  }
}