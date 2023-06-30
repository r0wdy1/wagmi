
import { useState } from 'react'
import { merkleDropConfig, useMerkleDropClaim } from '../generated'
import { useContractWrite } from 'wagmi'
import { merkleDropContractConfig } from './contracts'
import { HexString,Claim, ClaimProps } from '../model/Claims'

export const ClaimReward = (props: ClaimProps) => {


  const claim = props.claim;
  const [zkAddress, setZkAddress] = useState("0x");

  const { write, data, error, isLoading, isError, isSuccess } = useContractWrite({ ...merkleDropContractConfig,
    functionName: 'claim',
    chainId: 5,
    args: [BigInt(claim.amount), props.merkleRoot, claim.proof, zkAddress]
  })
  return (
    <div>
      <div>Claim reward</div>
      <input type="text" name="zk Address" id="zkAddress" onChange={(e) => setZkAddress(e.currentTarget.value)} />
      <button
        type='button'
        onClick={() => write?.()}
      >
        claim
      </button>
      {isError && <div>{error?.message}</div>}
      {isSuccess && <div>Transaction hash: {data?.hash}</div>}
    </div>
  )
}
