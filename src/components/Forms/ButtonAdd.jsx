import React from 'react'

function ButtonAdd( { onClick, children, icon, classNameCustom } ) {
  return (
        <button onClick= { onClick } className={classNameCustom+" px-2 py-2 bg-[#3cac38] rounded-[5px] shadow-xl justify-center items-center gap-[10px] flex"}>
        {icon}
        <span className="lg:text-md 2xl:text-lg sm:text-md text-sm font-semibold font-['Poppins']">{children}</span>
    </button>
  )
}

// w-[244px] h-[59px]

export default ButtonAdd