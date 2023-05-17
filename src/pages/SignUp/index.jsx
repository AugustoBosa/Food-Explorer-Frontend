import { Container, Main, Header, Form } from "./styles"

import { Input } from "../../components/Input"
import { Button } from "../../components/Button"
import { ButtonText } from "../../components/ButtonText"

import BlueHexagon from "../../assets/blueHexagon.svg"

import {useState} from "react"
import {api} from "../../services/api"
import { useNavigate } from "react-router-dom"


export function SignUp(){

	const navigate = useNavigate()

	const [name,setName] = useState("")
	const [email,setEmail] = useState("")
	const [password,setPassword] = useState("")

	function handleGoToLogin(){
		navigate("/")
	}

	function handleSignUp(){

		if(!name || !email || !password){
			return alert("Por favor preencha todos os campos.")
		}
		
		api.post("/users",{name,email,password})
		.then(()=>{
			alert("Usuário cadastrado com sucesso!")
			navigate("/")
		})
		.catch(error=>{
			if(error.response){
				alert(error.response.data.message)
			}else{
				alert("Não foi possível realizar o cadastro.")
			}
		})

	}

	
	return(
		<Container>
			<Main>
				<Header>
					<img src={BlueHexagon} alt="Logo - Hexgono azul." />

					<h1>food explorer</h1>
				</Header>

				<Form>
					<h1>Crie sua conta</h1>

					<Input 
						title="Seu nome" 
						id="nameInput"
						type="text"
						placeholder="Exemplo: Maria da Silva"
						onChange={e=>setName(e.target.value)}
						/>

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
						title="Criar conta"
						onClick={handleSignUp}
						/>
						
					<ButtonText
						title="Já tenho conta"
						onClick={handleGoToLogin}
						/>
				</Form>
			</Main>
		</Container>
	)
}