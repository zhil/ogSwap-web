import { Connection } from '@solana/web3.js'
import { Plugin } from '@nuxt/types'
import { Chains } from '~/components/constants'
import Web3 from 'web3'
import { WalletProvider, ChainTypes } from '~/components/utils'
import { MetamaskChain } from '~/web3/evm_chain'

const { HttpProvider } = Web3.providers

function createEvmInstance(endpoint: string): Web3 {
  return new Web3(new HttpProvider(endpoint))
}

const createSolInstance = (endpoint: string) => {
  const web3 = new Connection(endpoint)
  return web3
}

declare module 'vue/types/vue' {
  interface Vue {
    $web3: Web3Invoker
  }
}

type Web3Function = (params?: Object) => Promise<string> | null
type Web3Network = (params?: Object) => Promise<Chains>

interface FunctionPack {
  [ChainTypes.Evm]: any
  [ChainTypes.Solana]: any
}

interface Web3Invoker {
  makeSwap(type: ChainTypes, params: Object): Web3Function
  resolveCurrentAddress(type: ChainTypes): Web3Function
  getNetworkVersion(type: ChainTypes): Web3Network
  switchNetwork(chain: MetamaskChain): void
}

async function makeSwapEvm(params?: Object): Promise<string> {
  return ''
}

async function makeSwapSol(params?: Object): Promise<string> {
  return ''
}

async function resolveAdrressEvm(): Promise<string> {
  await window.ethereum.enable()
  const addressList = await window.ethereum.request({
    method: 'eth_accounts',
  })
  return addressList[0].toLowerCase()
}

const chainToName = {
  // дополнить мапинг всеми сетями
  '250': Chains.Ftm,
  '56': Chains.Bsc,
  '1': Chains.Eth,
  '100': Chains.Xdai,
  '128': Chains.Heco,
  '43114': Chains.Avax,
  '137': Chains.Pol,
}

async function getNetworkVersionEvm(): Promise<number> {
  let res = await window.ethereum.request({ method: 'eth_chainId' })
  // attempt to convert the value we get from mm method to our inner Chains type
  // const stringifiedCHain = String(parseInt(res, 16));
  // const typedChain = chainToName[stringifiedCHain] as keyof typeof chainToName;
  const typeChainId = parseInt(res, 16)
  return typeChainId
}

async function resolveAdrressSol(): Promise<string> {
  return window.solana.publicKey.toString()
}

const makeSwap: FunctionPack = {
  [ChainTypes.Evm]: makeSwapEvm,
  [ChainTypes.Solana]: makeSwapSol,
}

const resolveAddress: FunctionPack = {
  [ChainTypes.Evm]: resolveAdrressEvm,
  [ChainTypes.Solana]: resolveAdrressSol,
}

const getNetworkVersion: FunctionPack = {
  [ChainTypes.Evm]: getNetworkVersionEvm,
  [ChainTypes.Solana]: async () => Chains.Sol,
}

const invoker: Web3Invoker = {
  makeSwap(type: ChainTypes, params: Object) {
    return async function () {
      return makeSwap[type](params)
    }
  },
  resolveCurrentAddress(type: ChainTypes) {
    return resolveAddress[type]
  },
  getNetworkVersion(type: ChainTypes) {
    return async function () {
      return await getNetworkVersion[type]()
    }
  },
  async switchNetwork(chain: MetamaskChain) {
    let { chainIdHex, chainName, rpcUrls, nativeCurrency, blockExplorerUrls } =
      chain
    if (chainIdHex === '0x1') {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [
          {
            chainId: chainIdHex,
          },
        ],
      })
      return
    }
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: chainIdHex,
          chainName,
          rpcUrls,
          nativeCurrency,
          blockExplorerUrls,
        },
      ],
    })
  },
}

const web3Plugin: Plugin = async (ctx, inject) => {
  inject('web3', invoker)
}

// interaction if  format like
// function (type: string) {
//  return
// }

export default web3Plugin
