"use client";

import React from "react";
import Token from "@/components/layout/Token";
import { GetServerSideProps } from "next";

export const getServerSideProps = (async (context) => {
  return {
    props: {
      params: context.params
    }
  };
}) satisfies GetServerSideProps<{}>;

export default function TokenPage({ params }) {
  return (
    <div className="relative pb-16 ">
      <Token chainId={params.chainId} offerId={params.offerId} tokenId={params.tokenId} />
    </div>
  );
}
