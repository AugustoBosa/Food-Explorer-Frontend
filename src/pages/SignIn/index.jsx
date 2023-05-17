import { Container, Main, Header, Form } from "./styles"

import { Input } from "../../components/Input"
import { Button } from "../../components/Button"
import { ButtonText } from "../../components/ButtonText"

import BlueHexagon from "../../assets/blueHexagon.svg"

import { useAuth } from "../../hooks/auth"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { api } from "../../services/api"


export function SignIn(){

	const navigate = useNavigate()

	const { signIn } = useAuth()
	
	const [email,setEmail] = useState("")
	const [password,setPassword] = useState("")

	function handleGoToRegister(){
		navigate("/register")
	}

	async function handleSignIn(){
		signIn({ email,password })
	}

	
	return(
		<Container>
			<Main>
				<Header>
					<img src={BlueHexagon} alt="Logo - Hexágono azul." />

					<h1>food explorer</h1>
				</Header>

				<Form>
					<h1>Faça login</h1>

					<Input 
						title="Email" 
						id="emailInput"
						type="text"
						placeholder="Exemplo: exemplo@exemplo.com.br"
						onChange={e=>setEmail(e.target.value)}
						/>

					<Input 
						title="Senha" 
						id="passwordInput"
						type="password"
						placeholder="No mínimo 6 caracteres"
						onChange={e=>setPassword(e.target.value)}
						/>	

					<Button
						title="Entrar"
						onClick={handleSignIn}
						/>
						
					<ButtonText
						title="Criar uma conta"
						onClick={handleGoToRegister}
						/>
				</Form>
			</Main>
		</Container>
	)
}