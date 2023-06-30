import { useState } from 'react'
import type { Log } from 'viem'
import { stringify } from 'viem'
import { useContractEvent } from 'wagmi'

import { usdcContractConfig, wagmiContractConfig, merkleDropContractConfig } from './contracts'

export function WatchContractEvents() {
  const [usdcLogs, setUsdcLogs] = useState<Log[]>([])
  useContractEvent({
    ...usdcContractConfig,
    eventName: 'Transfer',
    listener: (logs) => setUsdcLogs((x) => [...x, ...logs]),
  })

  const [wagmiLogs, setWagmiLogs] = useState<Log[]>([])
  useContractEvent({
    ...wagmiContractConfig,
    eventName: 'Transfer',
    listener: (logs) => setWagmiLogs((x) => [...x, ...logs]),
  })
  const [claimLogs, setClaimLogs] = useState<Log[]>([])
  useContractEvent({
    ...merkleDropContractConfig,
    eventName: 'Claimed',
    listener: (logs) => setClaimLogs((x) => [...x, ...logs]),
  })

  return (
    <div>
      {/* <details>
        <summary>{usdcLogs.length} USDC `Transfer`s logged</summary>
        {usdcLogs
          .reverse()
          .map((log) => stringify(log))
          .join('\n\n\n\n')}
      </details>

      <details>
        <summary>{wagmiLogs.length} wagmi `Transfer`s logged</summary>
        {wagmiLogs
          .reverse()
          .map((log) => stringify(log))
          .join('\n\n\n\n')}
      </details> */}
      <details>
        <summary>{claimLogs.length} claims logged</summary>
        {claimLogs
          .reverse()
          .map((log) => stringify(log))
          .join('\n\n\n\n')}
      </details>
    </div>
  )
}
