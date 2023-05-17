import { Routes, Route, useNavigate } from "react-router-dom"
import { useEffect } from "react"

import { Home } from "../pages/Home"
import { Menu } from "../pages/Menu"
import { Details } from "../pages/Details"
import { Profile } from "../pages/Profile"
import { Favorites } from "../pages/Favorites"
import { Cart } from "../pages/Cart"
import { History } from "../pages/History"
import { NotFound } from "../pages/NotFound"


export function UserRoutes(){
    const navigate = useNavigate()

    useEffect(() => {
        const { pathname } = window.location
        if (pathname === "/home") {
          navigate("/")
        }
      }, [navigate])

    return(

        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/menu" element={<Menu/>}/>
            <Route path="/details/:id" element={<Details/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/favorites" element={<Favorites/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/history" element={<History/>}/>
            <Route path="*" element={<NotFound />} />
        </Routes>

    )
}