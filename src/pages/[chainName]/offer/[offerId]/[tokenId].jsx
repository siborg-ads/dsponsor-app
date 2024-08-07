"use client";

import React from "react";
import Token from "@/components/layout/Token";
import { useRouter } from "next/router";

export default function TokenPage() {
  const router = useRouter();

  let offerId;
  let tokenId;
  if (router?.query?.offerId && router?.query?.tokenId) {
    offerId = Number(router?.query?.offerId);
    tokenId = BigInt(router?.query?.tokenId);
  }

  return (
    <div className="relative pb-16 ">
      <Token offerId={offerId} tokenId={tokenId} />
    </div>
  );
}
