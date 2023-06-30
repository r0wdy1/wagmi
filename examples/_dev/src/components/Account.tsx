import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'

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
import { Claim } from './Claim'

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
  const { data: ensAvatar } = useEnsAvatar({
    name: ensName,
    chainId: 1,
  })
  const disconnect = useDisconnect()

  const merkleData = merkleDataRaw as Drop;
  const claim = merkleData.claims[account.address ?? '0xdead']

  return (
    <div>
      <div>
        {account?.address && (
          <div>
            <button type='button' onClick={() => disconnect.disconnect()}>
              Disconnect
            </button>
          </div>

        )}
        {isMounted && account?.connector?.name && (
          <span>Connected to {account.connector.name}</span>
        )}
        {account?.address && claim && (
          <div>
            <p>You are eligible for {claim.amount} tokens</p>
            <Claim address={account.address} claim={claim} merkleRoot={merkleData.merkleRoot} />
          </div>
        )}

      </div>

      {true && (
        <>
          {true && (
            <>
              <h4>Balance</h4>
              <Balance />

              <h4>Block Number</h4>
              <BlockNumber />


              {/* 
              <h4>Send Transaction</h4>
              <SendTransaction />

              <h4>Send Transaction Prepared</h4>
              <SendTransactionPrepared /> */}
            </>
          )}

          {/* <h4>Read Contract</h4>
          <ReadContract /> */}

          {/* <h4>Read Contracts</h4>
          <ReadContracts /> */}

          {/* <h4>Read Contracts Infinite</h4>
          <ReadContractsInfinite /> */}

          <h4>Watch Pending Transactions</h4>
          <WatchPendingTransactions />

          {/* <h4>Write Contract</h4>
          <WriteContract /> */}

          <h4>Write Contract Prepared</h4>
          <WriteContractPrepared />

          <h4>Contract Events</h4>
          <WatchContractEvents />



          {/* {true && (
            <>
              <h4>Sign Message</h4>
              <SignMessage />

              <h4>Sign Typed Data</h4>
              <SignTypedData />

              <h4>Token</h4>
              <Token />
            </>
          )} */}
        </>
      )}
    </div>
  )
}
