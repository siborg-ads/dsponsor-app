"use client"

import React from "react";
import ItemDetails from "../../../components/item/ItemDetails";

export default function Item({ params }){
  return (
    <>
        <ItemDetails id={params.id}/>
    </>
  );
}