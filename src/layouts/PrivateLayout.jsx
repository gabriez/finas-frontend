import { Outlet } from "react-router-dom"

const PrivateLayout = () => {
  return (
    <div className="bg-[url(./backgroundPrivateLayout.jpeg)] bg-cover bg-[#063A0A] bg-blend-multiply min-h-screen">
        <Outlet/>

    </div>
  )
}

export default PrivateLayout