"use client"; 
import React from "react";
import { BiLoaderAlt } from "react-icons/bi";

const Loader: React.FC = () => {
  return (
     <>
      <BiLoaderAlt className="text-xl animate-spin"/>
     </>
  );
};

export default Loader;


