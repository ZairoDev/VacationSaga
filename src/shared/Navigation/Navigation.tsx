import React from "react";
import NavigationItem from "./NavigationItem";
import { NAVIGATION_DEMO } from "@/data/navigation";

function Navigation() {

  let token = "";
  const IsServer = typeof window === "undefined";
  if (!IsServer) {
    token = window.localStorage.getItem("token") || "";
  }

  let navigationWhenLoggedIn = NAVIGATION_DEMO;
  if (token){
    navigationWhenLoggedIn = NAVIGATION_DEMO.filter((item) => item.href!="/signup");
  }else{
    navigationWhenLoggedIn = NAVIGATION_DEMO.filter((item) => item.name!="Logout");
  }

  return (
    <ul className="nc-Navigation hidden lg:flex lg:flex-wrap lg:space-x-1 relative">
      {navigationWhenLoggedIn.map((item) => (
        <NavigationItem key={item.id} menuItem={item} />
      ))}
    </ul>
  );
}

export default Navigation;
