"use client"

import React from "react";
import ItemDetails from "../../../components/item/ItemDetails";
import Header01 from "../../../components/header/Header01";

export default function Item({ params }){
  return (
    <>
      {/* <Header01/> */}
      <main>
          <ItemDetails id={params.id}/>
      </main>
    </>
  );
}