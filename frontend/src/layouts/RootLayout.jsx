import Home from "../pages/Home"
import { Outlet } from "react-router-dom"
import MyNavBar from "../components/MyNavBar"
import Hero from "../components/Hero"
import Ngos from "../pages/Ngos"
import OurBabies from "../pages/OurBabies"

function RootLayout() {
  return (
    <div>
        <Home />
        
        <Outlet />
        
    </div>
  )
}

export default RootLayout