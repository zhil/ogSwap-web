import _ from 'lodash'
// @ts-ignore
import { nu64, struct, u8 } from 'buffer-layout'
import {
  Token,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from '@solana/spl-token'
import {
  closeAccount,
  initializeAccount,
} from '@project-serum/serum/lib/token-instructions'
import { Provider, BN, Program } from '@project-serum/anchor'
import { OpenOrders } from '@project-serum/serum'
import { MARKET_STATE_LAYOUT_V2 } from '@project-serum/serum/lib/market'
// eslint-disable-next-line import/named
import {
  Account,
  PublicKey,
  Transaction,
  SystemProgram,
  TransactionInstruction,
  Connection,
  AccountInfo,
  ParsedAccountData,
  Signer,
  Keypair,
} from '@solana/web3.js'
import {
  ACCOUNT_LAYOUT,
  getBigNumber,
  MINT_LAYOUT,
  AMM_INFO_LAYOUT,
  AMM_INFO_LAYOUT_V3,
  AMM_INFO_LAYOUT_V4,
  getLpMintListDecimals,
} from './layouts'
import {
  getAddressForWhat,
  LIQUIDITY_POOLS,
  LIQUIDITY_POOL_PROGRAM_ID_V4,
  SERUM_PROGRAM_ID_V3,
  relayProgram,
  relayPortAddress,
} from './constants'
import {
  LP_TOKENS,
  NATIVE_SOL,
  TOKENS,
  getTokenByMintAddress,
  LiquidityPoolInfo,
  TokenAmount,
  GTON,
} from './tokens'
import {
  commitment,
  createAmmAuthority,
  findProgramAddress,
  getFilteredProgramAccountsAmmOrMarketCache,
  getMultipleAccounts,
} from '~/web3/sol_utils'
import { programIdls } from '~/web3/constants'
import { Chains } from '~/components/constants'

export interface Wallet {
  signTransaction(tx: Transaction): Promise<Transaction>
  signAllTransactions(txs: Transaction[]): Promise<Transaction[]>
  publicKey: PublicKey
}

interface TransferOpts {
  amount: number
  address: number[]
  chain: number[]
}

export async function requestInfos(conn: Connection) {
  let ammAll: {
    publicKey: PublicKey
    accountInfo: AccountInfo<Buffer>
  }[] = []
  let marketAll: {
    publicKey: PublicKey
    accountInfo: AccountInfo<Buffer>
  }[] = []

  await Promise.all([
    await (async () => {
      ammAll = await getFilteredProgramAccountsAmmOrMarketCache(
        'amm',
        conn,
        new PublicKey(LIQUIDITY_POOL_PROGRAM_ID_V4),
        [
          {
            dataSize: AMM_INFO_LAYOUT_V4.span,
          },
        ]
      )
    })(),
    await (async () => {
      marketAll = await getFilteredProgramAccountsAmmOrMarketCache(
        'market',
        conn,
        new PublicKey(SERUM_PROGRAM_ID_V3),
        [
          {
            dataSize: MARKET_STATE_LAYOUT_V2.span,
          },
        ]
      )
    })(),
  ])

  const marketToLayout: { [name: string]: any } = {}
  marketAll.forEach((item) => {
    marketToLayout[item.publicKey.toString()] = MARKET_STATE_LAYOUT_V2.decode(
      item.accountInfo.data
    )
  })

  const lpMintAddressList: string[] = []
  ammAll.forEach((item) => {
    const ammLayout = AMM_INFO_LAYOUT_V4.decode(
      Buffer.from(item.accountInfo.data)
    )
    if (
      ammLayout.pcMintAddress.toString() === ammLayout.serumMarket.toString() ||
      ammLayout.lpMintAddress.toString() === '11111111111111111111111111111111'
    ) {
      return
    }
    lpMintAddressList.push(ammLayout.lpMintAddress.toString())
  })
  const lpMintListDecimls = await getLpMintListDecimals(conn, lpMintAddressList)

  for (let indexAmmInfo = 0; indexAmmInfo < ammAll.length; indexAmmInfo += 1) {
    const ammInfo = AMM_INFO_LAYOUT_V4.decode(
      Buffer.from(ammAll[indexAmmInfo].accountInfo.data)
    )
    if (
      !Object.keys(lpMintListDecimls).includes(
        ammInfo.lpMintAddress.toString()
      ) ||
      ammInfo.pcMintAddress.toString() === ammInfo.serumMarket.toString() ||
      ammInfo.lpMintAddress.toString() === '11111111111111111111111111111111' ||
      !Object.keys(marketToLayout).includes(ammInfo.serumMarket.toString())
    ) {
      continue
    }
    const fromCoin =
      ammInfo.coinMintAddress.toString() === TOKENS.WSOL.mintAddress
        ? NATIVE_SOL.mintAddress
        : ammInfo.coinMintAddress.toString()
    const toCoin =
      ammInfo.pcMintAddress.toString() === TOKENS.WSOL.mintAddress
        ? NATIVE_SOL.mintAddress
        : ammInfo.pcMintAddress.toString()
    let coin = Object.values(TOKENS).find(
      (item) => item.mintAddress === fromCoin
    )
    if (!coin) {
      TOKENS[`unknow-${ammInfo.coinMintAddress.toString()}`] = {
        symbol: 'unknown',
        name: 'unknown',
        mintAddress: ammInfo.coinMintAddress.toString(),
        decimals: getBigNumber(ammInfo.coinDecimals),
        cache: true,
        tags: [],
      }
      coin = TOKENS[`unknow-${ammInfo.coinMintAddress.toString()}`]
    }


    let pc = Object.values(TOKENS).find((item) => item.mintAddress === toCoin)
    if (!pc) {
      TOKENS[`unknow-${ammInfo.pcMintAddress.toString()}`] = {
        symbol: 'unknown',
        name: 'unknown',
        mintAddress: ammInfo.pcMintAddress.toString(),
        decimals: getBigNumber(ammInfo.pcDecimals),
        cache: true,
        tags: [],
      }
      pc = TOKENS[`unknow-${ammInfo.pcMintAddress.toString()}`]
    }

    if (coin.mintAddress === TOKENS.WSOL.mintAddress) {
      coin.symbol = 'SOL'
      coin.name = 'SOL'
      coin.mintAddress = '11111111111111111111111111111111'
    }
    if (pc.mintAddress === TOKENS.WSOL.mintAddress) {
      pc.symbol = 'SOL'
      pc.name = 'SOL'
      pc.mintAddress = '11111111111111111111111111111111'
    }
    const lp = Object.values(LP_TOKENS).find(
      (item) => item.mintAddress === ammInfo.lpMintAddress
    ) ?? {
      symbol: `${coin.symbol}-${pc.symbol}`,
      name: `${coin.symbol}-${pc.symbol}`,
      coin,
      pc,
      mintAddress: ammInfo.lpMintAddress.toString(),
      decimals: lpMintListDecimls[ammInfo.lpMintAddress],
    }

    const { publicKey } = await createAmmAuthority(
      new PublicKey(LIQUIDITY_POOL_PROGRAM_ID_V4)
    )

    const market = marketToLayout[ammInfo.serumMarket]

    const serumVaultSigner = await PublicKey.createProgramAddress(
      [
        ammInfo.serumMarket.toBuffer(),
        market.vaultSignerNonce.toArrayLike(Buffer, 'le', 8),
      ],
      new PublicKey(SERUM_PROGRAM_ID_V3)
    )

    const itemLiquidity: LiquidityPoolInfo = {
      name: `${coin.symbol}-${pc.symbol}`,
      coin,
      pc,
      lp,
      version: 4,
      programId: LIQUIDITY_POOL_PROGRAM_ID_V4,
      ammId: ammAll[indexAmmInfo].publicKey.toString(),
      ammAuthority: publicKey.toString(),
      ammOpenOrders: ammInfo.ammOpenOrders.toString(),
      ammTargetOrders: ammInfo.ammTargetOrders.toString(),
      ammQuantities: NATIVE_SOL.mintAddress,
      poolCoinTokenAccount: ammInfo.poolCoinTokenAccount.toString(),
      poolPcTokenAccount: ammInfo.poolPcTokenAccount.toString(),
      poolWithdrawQueue: ammInfo.poolWithdrawQueue.toString(),
      poolTempLpTokenAccount: ammInfo.poolTempLpTokenAccount.toString(),
      serumProgramId: SERUM_PROGRAM_ID_V3,
      serumMarket: ammInfo.serumMarket.toString(),
      serumBids: market.bids.toString(),
      serumAsks: market.asks.toString(),
      serumEventQueue: market.eventQueue.toString(),
      serumCoinVaultAccount: market.baseVault.toString(),
      serumPcVaultAccount: market.quoteVault.toString(),
      serumVaultSigner: serumVaultSigner.toString(),
      official: false,
    }
    if (!LIQUIDITY_POOLS.find((item) => item.ammId === itemLiquidity.ammId)) {
      LIQUIDITY_POOLS.push(itemLiquidity)
    } else {
      for (
        let itemIndex = 0;
        itemIndex < LIQUIDITY_POOLS.length;
        itemIndex += 1
      ) {
        if (
          LIQUIDITY_POOLS[itemIndex].ammId === itemLiquidity.ammId &&
          LIQUIDITY_POOLS[itemIndex].name !== itemLiquidity.name &&
          !LIQUIDITY_POOLS[itemIndex].official
        ) {
          LIQUIDITY_POOLS[itemIndex] = itemLiquidity
        }
      }
    }
  }

  const liquidityPools = {} as any
  const publicKeys = [] as any

  LIQUIDITY_POOLS.forEach((pool) => {
    const {
      poolCoinTokenAccount,
      poolPcTokenAccount,
      ammOpenOrders,
      ammId,
      coin,
      pc,
      lp,
    } = pool

    publicKeys.push(
      new PublicKey(poolCoinTokenAccount),
      new PublicKey(poolPcTokenAccount),
      new PublicKey(ammOpenOrders),
      new PublicKey(ammId),
      new PublicKey(lp.mintAddress)
    )

    const poolInfo = _.cloneDeep(pool)

    poolInfo.coin.balance = new TokenAmount(0, coin.decimals)
    poolInfo.pc.balance = new TokenAmount(0, pc.decimals)

    liquidityPools[lp.mintAddress] = poolInfo
  })

  const multipleInfo = await getMultipleAccounts(conn, publicKeys, commitment)

  multipleInfo.forEach((info) => {
    if (info) {
      const address = info.publicKey.toBase58()
      const data = Buffer.from(info.account.data)

      const { key, lpMintAddress, version } = getAddressForWhat(address)

      if (key && lpMintAddress) {
        const poolInfo = liquidityPools[lpMintAddress]

        switch (key) {
          case 'poolCoinTokenAccount': {
            const parsed = ACCOUNT_LAYOUT.decode(data)
            // quick fix: Number can only safely store up to 53 bits
            poolInfo.coin.balance.wei = poolInfo.coin.balance.wei.plus(
              getBigNumber(parsed.amount)
            )

            break
          }
          case 'poolPcTokenAccount': {
            const parsed = ACCOUNT_LAYOUT.decode(data)

            poolInfo.pc.balance.wei = poolInfo.pc.balance.wei.plus(
              getBigNumber(parsed.amount)
            )

            break
          }
          case 'ammOpenOrders': {
            const OPEN_ORDERS_LAYOUT = OpenOrders.getLayout(
              new PublicKey(poolInfo.serumProgramId)
            )
            const parsed = OPEN_ORDERS_LAYOUT.decode(data)

            const { baseTokenTotal, quoteTokenTotal } = parsed
            poolInfo.coin.balance.wei = poolInfo.coin.balance.wei.plus(
              getBigNumber(baseTokenTotal)
            )
            poolInfo.pc.balance.wei = poolInfo.pc.balance.wei.plus(
              getBigNumber(quoteTokenTotal)
            )

            break
          }
          case 'ammId': {
            let parsed
            if (version === 2) {
              parsed = AMM_INFO_LAYOUT.decode(data)
            } else if (version === 3) {
              parsed = AMM_INFO_LAYOUT_V3.decode(data)
            } else {
              parsed = AMM_INFO_LAYOUT_V4.decode(data)

              const { swapFeeNumerator, swapFeeDenominator } = parsed
              poolInfo.fees = {
                swapFeeNumerator: getBigNumber(swapFeeNumerator),
                swapFeeDenominator: getBigNumber(swapFeeDenominator),
              }
            }

            const { status, needTakePnlCoin, needTakePnlPc } = parsed
            poolInfo.status = getBigNumber(status)
            poolInfo.coin.balance.wei = poolInfo.coin.balance.wei.minus(
              getBigNumber(needTakePnlCoin)
            )
            poolInfo.pc.balance.wei = poolInfo.pc.balance.wei.minus(
              getBigNumber(needTakePnlPc)
            )

            break
          }
          // getLpSupply
          case 'lpMintAddress': {
            const parsed = MINT_LAYOUT.decode(data)

            poolInfo.lp.totalSupply = new TokenAmount(
              getBigNumber(parsed.supply),
              poolInfo.lp.decimals
            )

            break
          }
        }
      }
    }
  })
  return liquidityPools
}

export async function prepare_swap(
  connection: Connection,
  wallet: any,
  poolInfo: any,
  fromCoinMint: string,
  toCoinMint: string,
  fromTokenAccount: string,
  toTokenAccount: string,
  aIn: string,
  aOut: string
): Promise<[Transaction, Signer[]]> {
  const transaction = new Transaction()
  const signers: Signer[] = []

  const owner = wallet

  const from = getTokenByMintAddress(fromCoinMint)
  const to = getTokenByMintAddress(toCoinMint)
  
  if (!from || !to) {
    throw new Error('Miss token info')
  }

  const amountIn = new TokenAmount(aIn, from.decimals, false)
  const amountOut = new TokenAmount(aOut, to.decimals, false)
  
  let fromMint = fromCoinMint
  let toMint = toCoinMint

  if (fromMint === NATIVE_SOL.mintAddress) {
    fromMint = TOKENS.WSOL.mintAddress
  }
  if (toMint === NATIVE_SOL.mintAddress) {
    toMint = TOKENS.WSOL.mintAddress
  }

  let wrappedSolAccount: PublicKey | null = null
  let wrappedSolAccount2: PublicKey | null = null

  if (fromCoinMint === NATIVE_SOL.mintAddress) {
    wrappedSolAccount = await createTokenAccountIfNotExist(
      connection,
      wrappedSolAccount,
      owner,
      TOKENS.WSOL.mintAddress,
      getBigNumber(amountIn.wei) + 1e7,
      transaction,
      signers
    )
  }
  if (toCoinMint === NATIVE_SOL.mintAddress) {
    wrappedSolAccount2 = await createTokenAccountIfNotExist(
      connection,
      wrappedSolAccount2,
      owner,
      TOKENS.WSOL.mintAddress,
      1e7,
      transaction,
      signers
    )
  }

  const newFromTokenAccount = await createAssociatedTokenAccountIfNotExist(
    fromTokenAccount,
    owner,
    fromMint,
    transaction
  )
  const newToTokenAccount = await createAssociatedTokenAccountIfNotExist(
    toTokenAccount,
    owner,
    toMint,
    transaction
  )

  transaction.add(
    swapInstruction(
      new PublicKey(poolInfo.programId),
      new PublicKey(poolInfo.ammId),
      new PublicKey(poolInfo.ammAuthority),
      new PublicKey(poolInfo.ammOpenOrders),
      new PublicKey(poolInfo.ammTargetOrders),
      new PublicKey(poolInfo.poolCoinTokenAccount),
      new PublicKey(poolInfo.poolPcTokenAccount),
      new PublicKey(poolInfo.serumProgramId),
      new PublicKey(poolInfo.serumMarket),
      new PublicKey(poolInfo.serumBids),
      new PublicKey(poolInfo.serumAsks),
      new PublicKey(poolInfo.serumEventQueue),
      new PublicKey(poolInfo.serumCoinVaultAccount),
      new PublicKey(poolInfo.serumPcVaultAccount),
      new PublicKey(poolInfo.serumVaultSigner),
      wrappedSolAccount ?? newFromTokenAccount,
      wrappedSolAccount2 ?? newToTokenAccount,
      owner,
      Math.floor(getBigNumber(amountIn.toWei())),
      Math.floor(getBigNumber(amountOut.toWei()))
    )
  )

  if (wrappedSolAccount) {
    transaction.add(
      closeAccount({
        source: wrappedSolAccount,
        destination: owner,
        owner,
      })
    )
  }
  if (wrappedSolAccount2) {
    transaction.add(
      closeAccount({
        source: wrappedSolAccount2,
        destination: owner,
        owner,
      })
    )
  }

  return [transaction, signers]
}

export function setupAnchorProvider(
  connection: Connection,
  wallet: Wallet
): Provider {
  return new Provider(connection, wallet, {})
}

function hexToBytes(hex: string) {
  for (var bytes = [], c = 0; c < hex.length; c += 2)
    bytes.push(parseInt(hex.substr(c, 2), 16))
  return bytes
}

const chainBytes: { [key: string]: number[] } = {
  ETH: [69, 84, 72],
  FTM: [70, 84, 77],
  BSC: [66, 78, 66],
  PLG: [80, 76, 71],
  HEC: [72, 69, 67],
  DAI: [68, 65, 73],
  AVA: [65, 86, 65],
  SOL: [83, 79, 76],
}

export function prepareDataForTransfer(
  user_address: string,
  chain: string,
  amount: number
): TransferOpts {
  const extraBytes: number[] = []
  extraBytes.fill(0, 0, 44)
  // we need to substring to delete 0x
  const address = hexToBytes(user_address.substring(2)).concat(extraBytes)
  return {
    address,
    chain: chainBytes[chain],
    amount,
  }
}

export async function transfer(
  user: PublicKey,
  provider: Provider,
  { amount, address, chain }: TransferOpts
): Promise<string[]> {
  let userEventDataAccount = Keypair.generate()
  const programId = new PublicKey(relayProgram)
  // @ts-ignore
  const program = new Program(programIdls.RelayProgram, programId, provider)
  const relayPort = new PublicKey(relayPortAddress)
  const acoc = await findAssociatedTokenAddress(
    user,
    new PublicKey(GTON.mintAddress)
  )

  const txnId = await program.rpc.relay(new BN(amount), address, chain, {
    accounts: {
      authority: user,
      from: acoc,
      to: GTON.associatedAddress,
      tokenProgram: TOKEN_PROGRAM_ID,
      relayPort: relayPort,
      userEventData: userEventDataAccount.publicKey,
    },
    instructions: [
      await program.account.relayEvent.createInstruction(userEventDataAccount),
    ],
    signers: [userEventDataAccount],
  })
  return [txnId, userEventDataAccount.publicKey.toString()]
}

export function swapInstruction(
  programId: PublicKey,
  // tokenProgramId: PublicKey,
  // amm
  ammId: PublicKey,
  ammAuthority: PublicKey,
  ammOpenOrders: PublicKey,
  ammTargetOrders: PublicKey,
  poolCoinTokenAccount: PublicKey,
  poolPcTokenAccount: PublicKey,
  // serum
  serumProgramId: PublicKey,
  serumMarket: PublicKey,
  serumBids: PublicKey,
  serumAsks: PublicKey,
  serumEventQueue: PublicKey,
  serumCoinVaultAccount: PublicKey,
  serumPcVaultAccount: PublicKey,
  serumVaultSigner: PublicKey,
  // user
  userSourceTokenAccount: PublicKey,
  userDestTokenAccount: PublicKey,
  userOwner: PublicKey,

  amountIn: number,
  minAmountOut: number
): TransactionInstruction {
  const dataLayout = struct([
    u8('instruction'),
    nu64('amountIn'),
    nu64('minAmountOut'),
  ])

  const keys = [
    // spl token
    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
    // amm
    { pubkey: ammId, isSigner: false, isWritable: true },
    { pubkey: ammAuthority, isSigner: false, isWritable: false },
    { pubkey: ammOpenOrders, isSigner: false, isWritable: true },
    { pubkey: ammTargetOrders, isSigner: false, isWritable: true },
    { pubkey: poolCoinTokenAccount, isSigner: false, isWritable: true },
    { pubkey: poolPcTokenAccount, isSigner: false, isWritable: true },
    // serum
    { pubkey: serumProgramId, isSigner: false, isWritable: false },
    { pubkey: serumMarket, isSigner: false, isWritable: true },
    { pubkey: serumBids, isSigner: false, isWritable: true },
    { pubkey: serumAsks, isSigner: false, isWritable: true },
    { pubkey: serumEventQueue, isSigner: false, isWritable: true },
    { pubkey: serumCoinVaultAccount, isSigner: false, isWritable: true },
    { pubkey: serumPcVaultAccount, isSigner: false, isWritable: true },
    { pubkey: serumVaultSigner, isSigner: false, isWritable: false },
    { pubkey: userSourceTokenAccount, isSigner: false, isWritable: true },
    { pubkey: userDestTokenAccount, isSigner: false, isWritable: true },
    { pubkey: userOwner, isSigner: true, isWritable: false },
  ]

  const data = Buffer.alloc(dataLayout.span)
  dataLayout.encode(
    {
      instruction: 9,
      amountIn,
      minAmountOut,
    },
    data
  )

  return new TransactionInstruction({
    keys,
    programId,
    data,
  })
}

export async function createTokenAccountIfNotExist(
  connection: Connection,
  account: string | undefined | null,
  owner: PublicKey,
  mintAddress: string,
  lamports: number | null,

  transaction: Transaction,
  signer: Array<Signer>
) {
  let publicKey

  if (account) {
    publicKey = new PublicKey(account)
  } else {
    publicKey = await createProgramAccountIfNotExist(
      connection,
      account,
      owner,
      TOKEN_PROGRAM_ID,
      lamports,
      ACCOUNT_LAYOUT,
      transaction,
      signer
    )

    transaction.add(
      initializeAccount({
        account: publicKey,
        mint: new PublicKey(mintAddress),
        owner,
      })
    )
  }

  return publicKey
}

export async function createProgramAccountIfNotExist(
  connection: Connection,
  account: string | undefined | null,
  owner: PublicKey,
  programId: PublicKey,
  lamports: number | null,
  layout: any,

  transaction: Transaction,
  signer: Array<Signer>
) {
  let publicKey

  if (account) {
    publicKey = new PublicKey(account)
  } else {
    const newAccount = Keypair.generate();
    publicKey = newAccount.publicKey

    transaction.add(
      SystemProgram.createAccount({
        fromPubkey: owner,
        newAccountPubkey: publicKey,
        lamports: lamports ?? (await connection.getMinimumBalanceForRentExemption(layout.span)),
        space: layout.span,
        programId,
      })
    )

    signer.push(newAccount)
  }

  return publicKey
}

export async function createAssociatedTokenAccountIfNotExist(
  account: string | undefined | null,
  owner: PublicKey,
  mintAddress: string,

  transaction: Transaction,
  atas: string[] = []
) {
  let publicKey
  if (account) {
    publicKey = new PublicKey(account)
  }

  const mint = new PublicKey(mintAddress)
  // @ts-ignore without ts ignore, yarn build will failed
  const ata = await Token.getAssociatedTokenAddress(
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    mint,
    owner,
    true
  )

  if (
    (!publicKey || !ata.equals(publicKey)) &&
    mintAddress !== TOKENS.WSOL.mintAddress &&
    !atas.includes(ata.toBase58())
  ) {
    transaction.add(
      Token.createAssociatedTokenAccountInstruction(
        ASSOCIATED_TOKEN_PROGRAM_ID,
        TOKEN_PROGRAM_ID,
        mint,
        ata,
        owner,
        owner
      )
    )
    atas.push(ata.toBase58())
  }

  return ata
}
// /** Function to send transaction via browser extension */
//  async function sendTransaction(
//   connection,
//   wallet,
//   transaction,
//   signers = []
// ) {
//   const txid = await wallet.sendTransaction(transaction, connection, {
//     signers,
//     skipPreflight: true,
//     preflightCommitment: commitment
//   })

//   return txid
// }


export async function getTokenAccounts(conn: Connection, user: PublicKey) {
  const TOKEN_PROGRAM_ID = new PublicKey(
    'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
  )
  const parsedTokenAccounts = await conn.getParsedTokenAccountsByOwner(
    user,
    {
      programId: TOKEN_PROGRAM_ID,
    },
    'confirmed'
  )
  const tokenAccounts: any = {}
  const auxiliaryTokenAccounts: Array<{
    pubkey: PublicKey
    account: AccountInfo<ParsedAccountData>
  }> = []

  for (const tokenAccountInfo of parsedTokenAccounts.value) {
    const tokenAccountPubkey = tokenAccountInfo.pubkey
    const tokenAccountAddress = tokenAccountPubkey.toBase58()
    const parsedInfo = tokenAccountInfo.account.data.parsed.info
    const mintAddress = parsedInfo.mint
    const balance = new TokenAmount(
      parsedInfo.tokenAmount.amount,
      parsedInfo.tokenAmount.decimals
    )

    const ata = await findAssociatedTokenAddress(
      user,
      new PublicKey(mintAddress)
    )

    if (ata.equals(tokenAccountPubkey)) {
      tokenAccounts[mintAddress] = {
        tokenAccountAddress,
        balance,
      }
    } else if (parsedInfo.tokenAmount.uiAmount > 0) {
      auxiliaryTokenAccounts.push(tokenAccountInfo)
    }
  }

  const solBalance = await conn.getBalance(user, 'confirmed')
  tokenAccounts[NATIVE_SOL.mintAddress] = {
    tokenAccountAddress: user.toBase58(),
    balance: new TokenAmount(solBalance, NATIVE_SOL.decimals),
  }
  return { auxiliaryTokenAccounts, tokenAccounts }
}

export async function findAssociatedTokenAddress(
  walletAddress: PublicKey,
  tokenMintAddress: PublicKey
) {
  const { publicKey } = await findProgramAddress(
    [
      walletAddress.toBuffer(),
      TOKEN_PROGRAM_ID.toBuffer(),
      tokenMintAddress.toBuffer(),
    ],
    ASSOCIATED_TOKEN_PROGRAM_ID
  )
  return publicKey
}
