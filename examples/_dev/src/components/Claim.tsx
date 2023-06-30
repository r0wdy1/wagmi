import { useContractWrite } from 'wagmi'
import { useState } from 'react'
import { usePrepareMerkleDropClaim } from '../generated'
interface ClaimProps {
  address: HexString,
  claim: Claim
  merkleRoot: HexString
}
export const Claim = (props: ClaimProps) => {

  const claim = props.claim;
  const [zkAddress, setZkAddress] = useState<HexString>("0x");

  const { config: prepareClaimConfig } =
    usePrepareMerkleDropClaim({ args: [BigInt(claim.amount), props.merkleRoot, claim.proof, zkAddress] });

  const { write: prepareClaim, data, error, isLoading, isError, isSuccess } =
    useContractWrite(prepareClaimConfig)  
  return (
    <div>
      <div>Claim reward</div>
      <input type="text" name="zk Address" id="zkAddress" onChange={(e) => setZkAddress(`0x${e.currentTarget.value}`)} />
      <button
        type='button'
        disabled={isLoading || !prepareClaim}
        onClick={() => prepareClaim?.()}
      >
        claim
      </button>
      {isError && <div>{error?.message}</div>}
      {isSuccess && <div>Transaction hash: {data?.hash}</div>}
    </div>
  )
}
