"use client"

import React from "react";

export default function Page({params}:any) { 
   return (
    <>
      <div>
          <h1>Profile page</h1>
          <p>{params.id}</p>
      </div>
    </>
   )
}