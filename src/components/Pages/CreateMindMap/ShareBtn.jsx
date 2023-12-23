import React from 'react'
import { FaShare } from "react-icons/fa";

export default function ShareBtn({ onFormActiveChange }) {
  return (
    <div className='h-[40px] flex items-center flex-1 w-full'>
        <button 
            onClick={() => onFormActiveChange((prevState) => !prevState)} 
            className="w-full
                    bg-blue-600 
                    text-300 
                    px-3 
                    py-1 
                    rounded 
                    flex 
                    items-center 
                    justify-center 
                    gap-x-2
                    mb-1 
                    shadow-[0_2px_2px_1px_rgba(23,71,155)]
                    active:mb-0
                    active:shadow-[0_0px_2px_1px_rgba(23,71,155)]
                    ">
            <FaShare /> Chia sẻ
        </button>
    </div>
  )
}
