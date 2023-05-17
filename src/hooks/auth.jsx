import { createContext, useContext, useState, useEffect } from "react"
import { api } from "../services/api"


export const AuthContext = createContext({})

function AuthProvider({children}){

    const [data, setData] = useState({})

    async function signIn({ email,password }){
        try{
            const response = await api.post("/sessions",{ email,password })
            const { user,token } = response.data
            
            localStorage.setItem("@foodexplorer:user",JSON.stringify(user))
            localStorage.setItem("@foodexplorer:token",token)

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`
            setData({user,token})

        }catch(error){
            if(error.message){
                alert(error.response.data.message)
            }else{
                alert("Não foi possível completar o Login.")
            }
        }
    }

    async function checkAdmin({user_id}){
        
        const {data:checkAdmin} = await api.get(`/admins/${user_id}`)

        if(checkAdmin){
            return true
        }else{
            return false
        }
    }

    function signOut(){

        localStorage.removeItem("@foodexplorer:user")
        localStorage.removeItem("@foodexplorer:token")

        setData({})
    }

    async function updateProfile({user}){

        try{

            await api.put("/users",user)
        
            const {data:updatedUser}= await api.get(`/users/${data.user.id}`)
            const cleanUserInfo = {
                id:updatedUser.id,
                name:updatedUser.name,
                email:updatedUser.email
            } 
            

            localStorage.setItem("@foodexplorer:user",JSON.stringify(cleanUserInfo))
   
            setData({user:cleanUserInfo,token:data.token})
            alert("Dados do usuário atualizados.")
            
        }catch(error){
            if(error.message){
                alert(error.response.data.message)
            }else{
                alert("Não foi possível atualizar os dados do usuário.")
            }
        }
    }

    useEffect(()=>{
        const token = localStorage.getItem("@foodexplorer:token")
        const user = localStorage.getItem("@foodexplorer:user")

        if( token && user ){
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`
            setData({
                user: JSON.parse(user),
                token
            })
        }
    },[])

    return(
        <AuthContext.Provider value={{ 
                                        signIn,
                                        user: data.user,
                                        token:data.token,
                                        signOut,
                                        updateProfile,
                                        checkAdmin
                                        }}> 
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(){
    const context = useContext(AuthContext)

    return context
}




export {AuthProvider, useAuth}