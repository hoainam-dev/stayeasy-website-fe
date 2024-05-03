import React from 'react'
import Home from "../../assets/image/home.svg";
import Login from "../../assets/image/login.svg";

import HeaderItem from './headerItem';

export default function header() {
  return (
    <div className="flex justify-center items-center px-4 py-3 text-black">
      <div></div>
      <div className="flex space-x-6 rounded-lg justify-between p-3 menu">
        {/* Menu */}
        <HeaderItem title="Home" imgUrl={Home} />
        <HeaderItem title= "Login" imgUrl={Login} />
      </div>
    </div>
  )
}
