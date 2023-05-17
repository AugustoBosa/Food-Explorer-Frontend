import { Routes, Route, useNavigate } from "react-router-dom"
import { useEffect } from "react"

import { SignIn } from "../pages/SignIn"
import { SignUp } from "../pages/SignUp"
import { NotFound } from "../pages/NotFound"


export function AuthorizationRoutes(){
    const navigate = useNavigate()

    useEffect(() => {
        const { pathname } = window.location
        if (pathname === "/home") {
          navigate("/")
        }
      }, [navigate])

    return(

        <Routes>
            <Route path="/" element ={<SignIn/>}/>
            <Route path="/register" element ={<SignUp/>}/>
            <Route path="*" element={<NotFound />} />
        </Routes>
        
    )
}