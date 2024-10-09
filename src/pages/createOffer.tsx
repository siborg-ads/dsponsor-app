"use client";
import dynamic from "next/dynamic";
// import CreateOffer from "@/components/layout/CreateOffer";

const CreateOffer = dynamic(() => import("@/components/layout/CreateOffer"), {
  ssr: false, // Disable server-side rendering

  loading: () => <div className="flex items-center justify-center w-full h-screen">coucou</div>
});

export default function CreateOfferPage() {
  return (
    <div className="">
      <div className="relative ">
        <CreateOffer />
      </div>
    </div>
  );
}
