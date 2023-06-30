import React from "react";
import { ClaimProps, toHexString } from "../model/Claims";
import { useToken } from "wagmi";
import { useMerkleDropCumulativeClaimed, useMerkleDropToken } from "../generated";
import { ClaimReward } from "./ClaimReward";



export const ClaimStats = (props: ClaimProps) => {

    const { data: claimed, isRefetching, isSuccess: claimedIsSuccess, refetch } = useMerkleDropCumulativeClaimed({ args: [props.address] })
    const { data: tokenAddressRaw, isError, isSuccess, } = useMerkleDropToken()


    // const tokenAddress:HexString = `0x${tokenAddressRaw?.toString(16)??'0xdead'}`;

    const { data: tokenData } = tokenAddressRaw ? useToken({ address: toHexString(tokenAddressRaw) }) : { data: undefined }

    console.log(claimed);

    const amountEligible = BigInt(props.claim.amount) / BigInt(Math.pow(10, tokenData?.decimals ?? 0))
    const amountClaimed = BigInt(claimed ?? 0) / BigInt(Math.pow(10, tokenData?.decimals ?? 0))
    const amountLeftToClaim = amountEligible - amountClaimed
    return (
        <div className='flex flex-row'>
            <p className="basis-1/4">You are eligible for {amountEligible.toString(10)} {tokenData?.name}</p>
            <p>You have previously claimed {amountClaimed.toString(10)} {tokenData?.name}</p>
            <p>You have {amountLeftToClaim.toString(10)} {tokenData?.name} left to claim</p>
            <ClaimReward address={props.address} claim={props.claim} merkleRoot={props.merkleRoot} />
        </div>
    )
}