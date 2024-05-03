import React from 'react'
import { Link } from "react-router-dom";

export default function HeaderItem({ title, imgUrl }) {
    return (
        <div className="flex p-1 flex-row items-center cursor-pointer hover:bg-white hover:text-black hover:rounded-lg hover:p-1">
          <img src={imgUrl} className="w-6 h-6 pr-2" />
          <Link to={"/" + title}>{title}</Link>
        </div>
      );
}
