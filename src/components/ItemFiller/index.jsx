import { Container } from "./styles"

import { useAuth } from "../../hooks/auth"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import jwt_decode from "jwt-decode"


export function ItemFiller({...rest}){

    const navigate = useNavigate()

	const { user, token } = useAuth()
	const [isAdmin, setIsAdmin] = useState(false)

	
	function handleGoToNewDish(){
		navigate("/new")
	}

	async function handleCheckAdmin(){

		const decodedToken = jwt_decode(token)
        const isAdmin = decodedToken.role === "admin"
		setIsAdmin(isAdmin)

	}

	useEffect(()=>{

		handleCheckAdmin()

	},[])


	return(
		
		<Container className="dishItem">
		
			<div 
				onClick={isAdmin ? handleGoToNewDish : ()=>{}} 
				{...rest}
				>

				<img src="./src/assets/cooking.svg" alt="Desenho de uma frigideira fritando um ovo" />

				{isAdmin==true ? (
					<div>
						<h3> Adicione um prato</h3>
	
						<p className="desktop">A categoria está vazia.</p>
					</div>
				):(
					<div>
						<h3>Em breve...</h3>

						<p className="desktop">Nossa equipe irá disponibilizar novos pratos, fique ligado!</p>
					</div>
				)}

			</div>

		</Container>
		
	)
}