import UserPlus from "../../icons/UserPlus"

const Usuarios = () => {
  return (
    <div className="text-white flex flex-col justify-center min-h-screen items-center">
      <div className="flex 2xl:w-[1600px] w-[1200px] justify-between items-center" style={{color: '#ffffff', fontFamily: 'Poppins-Black' }}>
        <h1 className="">Lista de Usuarios</h1>
        <button><UserPlus className=""/> Añadir Usuario</button> 
      </div>
    </div>
  )
}

export default Usuarios