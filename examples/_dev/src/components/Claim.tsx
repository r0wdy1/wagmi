import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi'

import { wagmiContractConfig, merkleDropContractConfig } from './contracts'
import { useState } from 'react'
import { useMerkleDropClaim, useMerkleDropWrite, usePrepareMerkleDropClaim } from '../generated'
import { log } from 'console'



interface ClaimProps {
  address: HexString,
  claim: Claim
  merkleRoot: HexString
}
export const Claim = (props: ClaimProps) => {


  // const { config } = usePrepareContractWrite({
  //   ...wagmiContractConfig,
  //   functionName: 'mint',
  // })

  // const { address, isConnecting, i sDisconnected } = useAccount();

  const claim = props.claim;
  const [zkAddress, setZkAddress] = useState("");
  const args = [BigInt(claim?.amount ?? 0), props.merkleRoot, claim.proof, zkAddress]
  console.log('args', args)

  const { write: writeClaim } = useMerkleDropClaim();

  // const { config: prepareClaimConfig } =
  //   usePrepareMerkleDropClaim();

  // const { write: prepareClaim, data, error, isLoading, isError, isSuccess } =
  //   useContractWrite(prepareClaimConfig)
  // const { config } = usePrepareContractWrite({
  //   abi: [{
  //     "inputs": [
  //       {
  //         "internalType": "uint256",
  //         "name": "cumulativeAmount",
  //         "type": "uint256"
  //       },
  //       {
  //         "internalType": "bytes32",
  //         "name": "expectedMerkleRoot",
  //         "type": "bytes32"
  //       },
  //       {
  //         "internalType": "bytes32[]",
  //         "name": "merkleProof",
  //         "type": "bytes32[]"
  //       },
  //       {
  //         "internalType": "bytes",
  //         "name": "zkAddress",
  //         "type": "bytes"
  //       }
  //     ],
  //     "name": "claim",
  //     "outputs": [],
  //     "stateMutability": "nonpayable",
  //     "type": "function"
  //   }],
  //   address: '0xC6A4A86747aA66FC0eDd1b6033886281dc78e72e',
  //   functionName: 'claim',
  //   args: [BigInt(claim.amount), props.merkleRoot, claim.proof, zkAddress]
  // })
  // const { write, data, error, isLoading, isError, isSuccess } =
  //   useContractWrite(config)

  console.log("found proof ", claim.proof)
  // console.log("isLoading = ", isLoading)

  // writeClaim({args: [BigInt(claim.amount), props.merkleRoot, claim.proof, zkAddress]})
  return (
    <div>
      <div>Claim reward</div>
      <input type="text" name="zk Address" id="zkAddress" onChange={(e) => setZkAddress(e.currentTarget.value)} />
      <button
        type='button'
        // disabled={isLoading || !prepareClaim?.({args:[BigInt(claim.amount), props.merkleRoot, claim.proof, zkAddress]})}
        onClick={() => writeClaim?.({args: [BigInt(claim.amount), props.merkleRoot, claim.proof, zkAddress]})}
        // onClick={() => {}}
      >
        claim
      </button>
      {/* {isError && <div>{error?.message}</div>} */}
      {/* {isSuccess && <div>Transaction hash: {data?.hash}</div>} */}
    </div>
  )
}
