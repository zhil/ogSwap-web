import { AbiItem } from 'web3-utils'
import Web3 from 'web3'
import { MetamaskChain } from '~/web3/evm_chain'

import { relayAddresses, contractsABI } from './constants'

declare global {
  interface Window {
    ethereum: any
    web3: any
  }
}
const { HttpProvider } = Web3.providers

export const WalletProvider = {
  Metamask: 'Metamask',
  ConnectWallet: 'ConnectWallet',
}

class Invoker {
  // async switchMetamaskNetwork(chain: MetamaskChain) {
  //   if (this.mobile) {
  //     return;
  //   }
  //   let {
  //     chainIdHex,
  //     chainName,
  //     rpcUrls,
  //     nativeCurrency,
  //     blockExplorerUrls
  //   } = chain;
  //   if (chainIdHex == this.ethereumChainId) {
  //     await window.ethereum.request({
  //       method: "wallet_switchEthereumChain",
  //       params: [
  //         {
  //           chainId: chainIdHex
  //         }
  //       ]
  //     });
  //     return;
  //   }

  //   await window.ethereum.request({
  //     method: "wallet_addEthereumChain",
  //     params: [
  //       {
  //         chainId: chainIdHex,
  //         chainName,
  //         rpcUrls,
  //         nativeCurrency,
  //         blockExplorerUrls
  //       }
  //     ]
  //   });
  // }
  async getNetworkVersion(mobile: boolean, web3: Web3) {
    if (mobile) {
      return await web3.eth.net.getId()
    }
    let res = await window.ethereum.request({ method: 'eth_chainId' })
    return parseInt(res, 16)
  }
  async resolveCurrentAddress(mobile: boolean, web3: Web3) {
    if (mobile) {
      const accounts = await web3.eth.getAccounts()
      return accounts[0].toLowerCase()
    } else {
      await window.ethereum.enable()
      const addressList = await window.ethereum.request({
        method: 'eth_accounts',
      })
      return addressList[0].toLowerCase()
    }
  }
}

export interface RelaySwapData {
  destination: string
  userAddress: string
  addressTo: string
  value: string
  chainId: string
}

export class Web3Invoker extends Invoker {
  relayAddresses = relayAddresses
  contractsABI = contractsABI

  // relay
  async checkForTransaction(
    fromBlock: number,
    nodeUrl: string,
    toAddress: string,
    fromAddress: string
  ): Promise<{ hash: string | null; block: number }> {
    const web3 = new Web3(new HttpProvider(nodeUrl))
    const toBlock = await this.getLastBlock(nodeUrl)
    toAddress = toAddress.toLowerCase().substring(2)
    const contract = new web3.eth.Contract(
      this.contractsABI.RelayContract as AbiItem[],
      fromAddress
    )
    const res = await contract.getPastEvents('DeliverRelay', {
      filter: { user: toAddress },
      fromBlock,
      toBlock,
    })
    if (res.length > 0) return { hash: res[0].transactionHash, block: toBlock }
    return { hash: null, block: toBlock }
  }
  // relay
  async makeSwap(data: RelaySwapData, web3: Web3) {
    const { destination, addressTo, value, userAddress, chainId } = data
    //@ts-ignore
    const contractAddress = this.relayAddresses[chainId]

    const contract = new web3.eth.Contract(
      this.contractsABI.RelayContract as AbiItem[],
      contractAddress
    )
    const res = await contract.methods
      .lock(destination, addressTo)
      .send({ from: userAddress, value })
    return res
  }

  async getChainBalance(nodeUrl: string, address: string): Promise<number> {
    const web3 = new Web3(new HttpProvider(nodeUrl))
    const res = await web3.eth.getBalance(address)
    return Number(web3.utils.fromWei(res))
  }

  async getLastBlock(nodeUrl: string): Promise<number> {
    const web3 = new Web3(new HttpProvider(nodeUrl))
    return await web3.eth.getBlockNumber()
  }
}

export function formatETHBalance(amount: string): string {
  const web3 = new Web3()
  return web3.utils.fromWei(amount, 'ether')
}

export function numberWithCommas(x: string): string {
  var parts = x.split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}
