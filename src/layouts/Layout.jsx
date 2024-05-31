import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <div className="w-screen min-h-screen relative bg-slate-600">
        <Outlet/>
    </div>
  )
}

export default Layout