type Drop = {
    merkleRoot: HexString,
    tokenTotal: HexString,
    claims: Claims
}

type Claim = {
    amount: string,
    proof: HexString[]
}
type Claims = {
    [key: HexString]: Claim
}

type HexString= `0x${string}`