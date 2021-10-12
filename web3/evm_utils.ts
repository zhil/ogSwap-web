import Web3 from "web3"
import { ProvidersUrl } from "./constants"
import { AbiItem } from 'web3-utils'

export function createInstance(nodeUrl: ProvidersUrl) {
  return new Web3(new Web3.providers.HttpProvider(nodeUrl))
}

export async function callContractProps(web3: Web3, contractAddress: string, abi: AbiItem[], props: string[]): Promise<{[key: string]: number | string}> {
  const contract = new web3.eth.Contract(
    abi,
    contractAddress
  )
  const res = {} as {[key: string]: number | string};
  for (const prop of props) {
    res[prop] = await contract.methods[prop].call().call()
  }
  return res
}