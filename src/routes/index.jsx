import { BrowserRouter } from "react-router-dom"
import { useAuth } from "../hooks/auth"
import jwt_decode from "jwt-decode"

import { UserRoutes } from "./user.routes"
import { AdminRoutes } from "./admin.routes"

import { AuthorizationRoutes } from "./authorization.routes"

export function Routes(){

    const { user,token } = useAuth()

     function availableRoutes(){

        if (user) {
            const decodedToken = jwt_decode(token)

            const currentTime = Date.now() / 1000;
            if (decodedToken.exp < currentTime) {
              return <AuthorizationRoutes />;
            }

            const isAdmin = decodedToken.role === "admin" 
            if (isAdmin) {
              return <AdminRoutes />
            } else {
              return <UserRoutes />
            }
          } else {
            return <AuthorizationRoutes />
          }
        }

    return(
        <BrowserRouter>
        
      
            {availableRoutes()}
   
            
        </BrowserRouter>
    )

  
}


