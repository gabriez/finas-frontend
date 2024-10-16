import React from 'react'

function SupportInterface() {
  return (
    <div className="text-white flex flex-col justify-center min-h-screen pl-[8.5%]">
    <div className="flex 2xl:w-[1125px] border-b-2 mb-4 pb-2 border-[#5df153]">
      <h1 className="text-white text-[40px] font-bold font-['Poppins']">Respaldo de la Base de Datos del Sistema</h1>
      
    </div>
    <form
      className="flex w-[992px] h-[401px] bg-white p-12  rounded-lg "
    >
        <div className="w-full flex-col justify-start items-start gap-2.5 inline-flex">
          <div className="w-[850px] flex gap-10 items-center pb-5">
        <label
          className="w-[500px] text-gray-700 text-lg font-bold"
          htmlFor="email"
        >
          Email
        </label>

        <input
          type="text"
          name="email"
          placeholder="Introduzca su email"
          
          
          className="shadow appearance-none border rounded w-full py-3 px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        </div>
        <div className="w-[850px] flex gap-10 items-center pb-5">
        <label
          className="w-[500px] text-gray-700 text-lg font-bold"
          htmlFor="password"
        >
          Contraseña
        </label>

        <input
          type="text"
          name="password"
          placeholder="Introduzca su contraseña"
          
          
          className="shadow appearance-none border rounded w-full py-3 px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        </div>
        <div className="w-[850px] flex gap-10 items-center pb-5">
        <label
          className="w-[500px] text-gray-700 text-lg font-bold"
          htmlFor="database"
        >
          Base de datos
        </label>

        <input
          type="text"
          name="database"
          placeholder="Nombre de la Base de Datos a Respaldar “Finas”"
          
          
          className="shadow appearance-none border rounded w-full py-3 px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        </div>
        <button
          type="submit"
          className=" bg-[#3CAC38] hover:bg-[#063A0A] mx-[22rem] my-[2rem] text-white font-bold text-xl py-2 px-20 rounded focus:outline-none focus:shadow-outline hover:shadow-2xl"
        >
          Respaldar
        </button>
        </div>
    </form>
    </div>
  )
}

export default SupportInterface;