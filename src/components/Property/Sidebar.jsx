import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChartBarIcon, ClipboardIcon } from "@heroicons/react/20/solid";

export default function Sidebar() {
  const [itemId, setItemId] = useState(1);

  const title = [
    // {
    //   id: 1,
    //   name: "Thống kê",
    //   link: "/property/statistic",
    //   icon: <ChartBarIcon />,
    // },
    {
      id: 1,
      name: "Xem tài sản",
      link: "/property/list",
      icon: <ClipboardIcon />,
    },
  ];
  return (
    <div>
      <ul className="border-b-2">
        {title.map((index) => (
          <Link to={index.link}>
            <li
              key={index.id}
              className={`p-3 flex font-medium items-center ${
                itemId === index.id && "bg-[#ff385c] text-white"
              }`}
              onClick={() => setItemId(index.id)}
            >
              <span className="mr-3 w-8">{index.icon}</span>
              <span>{index.name}</span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
