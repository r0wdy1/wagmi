import { useContractWrite, usePrepareContractWrite } from 'wagmi'
interface ClaimProps {
  address: HexString,
  claim: Claim
  merkleRoot: HexString
}
export const Claim = (props: ClaimProps) => {

  const claim = props.claim;

  const { config: config } = usePrepareContractWrite({
    abi: [
      {
        stateMutability: 'nonpayable',
        type: 'function',
        inputs: [
          { name: 'cumulativeAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'expectedMerkleRoot', internalType: 'bytes32', type: 'bytes32' },
          { name: 'merkleProof', internalType: 'bytes32[]', type: 'bytes32[]' },
          { name: 'zkAddress', internalType: 'bytes', type: 'bytes' },
        ],
        name: 'claim',
        outputs: [],
      },
    ],
    address: '0xC6A4A86747aA66FC0eDd1b6033886281dc78e72e',
    functionName: 'claim', args: [BigInt(0), props.merkleRoot, claim.proof, '0x0'] })

const { write, isLoading } =
  useContractWrite(config)

return (
  <div>
    <div>Claim reward</div>
    <button
      type='button'
      disabled={isLoading || !write}
      onClick={() => write?.()}
    >
      claim
    </button>
  </div>
)
}
