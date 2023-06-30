export type Drop = {
    merkleRoot: HexString,
    tokenTotal: HexString,
    claims: Claims
}

export type Claim = {
    amount: string,
    proof: HexString[]
}
export type Claims = {
    [key: HexString]: Claim
}

export type HexString= `0x${string}`


function ltrim(str: string, chr:string) {
    var rgxtrim = (!chr) ? new RegExp('^\\s+') : new RegExp('^'+chr+'+');
    return str.replace(rgxtrim, '');
  }
export function toHexString(val: string):HexString{
    return `0x${ltrim(val, '0x')}`
}

export interface ClaimProps {
    address: HexString,
    claim: Claim
    merkleRoot: HexString
  }