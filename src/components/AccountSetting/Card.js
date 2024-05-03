import React from 'react'
import {Link} from "react-router-dom";

export default function Card({svg, title, description, href}) {
  return (
    <>
      <div className='px-[1.7rem] pt-[2rem] rounded-3xl shadow-checkout-shadow min-[896px]:w-[32%] min-[550px]:w-[47%] max-[550px]:w-[100%] h-auto'>
        <Link to={href}>
          {svg}
          <h3 className='mt-[2.4rem] text-[1.65rem]'>{title}</h3>
          <p className='text-[1.5rem] text-gray-500'>{description}</p>
        </Link>
      </div>
    </>
  )
}


