import { useAccount, useDisconnect, useEnsAvatar, useEnsName, useContractRead, useToken } from 'wagmi'

import { useIsMounted } from '../hooks'
import { Balance } from './Balance'
import { BlockNumber } from './BlockNumber'
import { ReadContract } from './ReadContract'
import { ReadContracts } from './ReadContracts'
import { ReadContractsInfinite } from './ReadContractsInfinite'
import { SendTransaction } from './SendTransaction'
import { SendTransactionPrepared } from './SendTransactionPrepared'
import { SignMessage } from './SignMessage'
import { SignTypedData } from './SignTypedData'
import { Token } from './Token'
import { WatchContractEvents } from './WatchContractEvents'
import { WatchPendingTransactions } from './WatchPendingTransactions'
// import { WriteContract } from './WriteContract'
import { WriteContractPrepared } from './WriteContractPrepared'
import merkleDataRaw from '../data.json'
import { ClaimReward } from './ClaimReward'
import { ConnectKitButton } from 'connectkit'
import { merkleDropContractConfig } from './contracts'
import { useErc20BalanceOf, useMerkleDropCumulativeClaimed, useMerkleDropRead, useMerkleDropToken } from '../generated'
import { Drop, toHexString } from '../model/Claims'
import { ClaimStats } from './ClaimStats'

export const Account = () => {
  const isMounted = useIsMounted()
  const account = useAccount({
    onConnect: (data) => console.log('connected', data),
    onDisconnect: () => console.log('disconnected'),
  })
  const { data: ensName } = useEnsName({
    address: account?.address,
    chainId: 1,
  })
  const disconnect = useDisconnect()

  const merkleData = merkleDataRaw as Drop;
  const claim = merkleData.claims[account.address ?? '0xdead']

  return (
    <div>
      <ConnectKitButton />
      <div>

        {/* {isMounted && account?.connector?.name && (
          <span>Connected to {account.connector.name}</span>
        )} */}
        {account?.address && claim && (<ClaimStats claim={claim} address={account.address} merkleRoot={merkleData.merkleRoot} />)}

      </div>

      {true && (
        <>
          {true && (
            <>
              <h4>Block Number</h4>
              <BlockNumber />
            </>
          )}
          <h4>Watch Pending Transactions</h4>
          <WatchPendingTransactions />

          <h4>Contract Events</h4>
          <WatchContractEvents />
        </>
      )}
    </div>
  )
}
