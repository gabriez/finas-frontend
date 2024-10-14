import React from 'react'

function ButtonAdd( { children, icon, classNameCustom } ) {
  return (
        <button className={classNameCustom+" bg-[#3cac38] rounded-[5px] shadow-xl justify-center items-center gap-[11px] flex"}>
        {icon}
        <span className="text-xl font-semibold font-['Poppins']">{children}</span>
    </button>
  )
}

// w-[244px] h-[59px]

export default ButtonAdd