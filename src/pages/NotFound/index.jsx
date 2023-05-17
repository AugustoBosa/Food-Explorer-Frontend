import { Container } from "./styles"

import { Button } from "../../components/Button"
import { useNavigate } from "react-router-dom"


export function NotFound(){
	const navigate = useNavigate()
	
	function handleGoToHome(){
		navigate("/")
	}

	return(
		
		<Container>

			<div>
				<h1>Oops, você parece estar meio perdido...</h1>
				<Button 
					title="Clique aqui para voltar para o site"
					onClick={handleGoToHome}/>
			</div>
			
		</Container>
		
	)
}