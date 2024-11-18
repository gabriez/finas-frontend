import { TITLE } from "../../constants"

const Home = () => {
	document.title = `${TITLE} - Home`;
  return (
    <div className="text-white flex flex-col justify-center min-h-screen items-center">
      <h1 className="text-4xl lg:text-6xl font-bold text-center">Fundación de Infraestructura</h1>
      <h2 className="text-2xl lg:text-4xl">Asistencial Socialista</h2>
    </div>
  )
}

export default Home