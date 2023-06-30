import { defineConfig } from '@wagmi/cli'
import { actions, erc, etherscan, react } from '@wagmi/cli/plugins'

export default defineConfig({
  out: 'src/generated.ts',
  contracts: [
    {
      name: 'Wagmipet',
      address: {
        5: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
      },
      abi: [
        {
          inputs: [{ type: 'address' }],
          name: 'love',
          outputs: [{ type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
      ],
    },

    {
      name: 'MerkleDrop',
      address: {
        5: '0xC6A4A86747aA66FC0eDd1b6033886281dc78e72e'
      },
      abi: [
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "cumulativeAmount",
              "type": "uint256"
            },
            {
              "internalType": "bytes32",
              "name": "expectedMerkleRoot",
              "type": "bytes32"
            },
            {
              "internalType": "bytes32[]",
              "name": "merkleProof",
              "type": "bytes32[]"
            },
            {
              "internalType": "bytes",
              "name": "zkAddress",
              "type": "bytes"
            }
          ],
          "name": "claim",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ]
    }
  ],
  plugins: [
    erc(),
    react(),
    actions(),
  ],
})
