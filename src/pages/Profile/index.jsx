import { Container, Header, Main, UserInfo, Preferences,Tags } from "./styles"

import { Footer } from "../../components/Footer"
import { Input } from "../../components/Input"
import { Button } from "../../components/Button"
import {Tag} from "../../components/Tag"
import {TagEdit} from "../../components/TagEdit"

import CloseIcon from "../../assets/close.svg"

import { api } from "../../services/api"
import { useAuth } from "../../hooks/auth"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import jwt_decode from "jwt-decode"


export function Profile(){

	const  { user, updateProfile, token } = useAuth()
	const navigate = useNavigate()

	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [oldPassword, setOldPassword] = useState("")
	const [newPassword, setNewPassword] = useState("")
	const [ingredients, setIngredients] = useState([])
	const [restrictions, setRestrictions] = useState([])
	const [changedRestrictions, setChangedRestrictions] = useState("")
	const [isButtonDisabled, setIsButtonDisabled] = useState(true)
	const [isAdmin, setIsAdmin] = useState(false)


	function handleGoBack(){
		if(!isButtonDisabled){
			const confirm = window.confirm("As modificações não foram salvas, deseja continuar?")
			if(!confirm){
				return
			}
		}
		navigate(-1)
	}

	async function handleCheckAdmin(){

		const decodedToken = jwt_decode(token)
        const isAdmin = decodedToken.role === "admin"
		setIsAdmin(isAdmin)

	}


	async function fetchIngredients(){

		const {data:responseIngredients}= await api.get(`/ingredients/`)
		setIngredients(responseIngredients)
		
	}

	async function fetchRestrictions(){

		const {data:restrictionsResponse} = await api.get(`/restrictions/?user_id=${user.id}`)
		
		const restrictionsIngredients = restrictionsResponse.map(restriction=>{	
			if(!restrictions.includes(restriction.ingredient_id)){
				return(restriction.ingredient_id)
			}
		})
		
		setRestrictions(restrictionsIngredients)
	
	}
	
	async function removeRestriction(id){

		await api.delete(`/restrictions/${id}`)	
			.catch(error=>{
			if(error.response){
				alert(error.response.data.message)
			}else{
				alert("Não foi possível remover o ingrediente.")
			}
		})	

	}

	async function addRestriction(id){

		await api.post(`/restrictions/`,{ingredient_id:id})		
		.catch(error=>{
			if(error.response){
				alert(error.response.data.message)
			}else{
				alert("Não foi possível adicionar o ingrediente.")
			}
		})	

	}

	function checkIngredientStatus(ingredient_id){

		const isRemoved = restrictions.includes(ingredient_id)
		return !isRemoved

	}

	function handleToggleIngredient(ingredient_id){

		const isRemoved = restrictions.includes(ingredient_id)
		setChangedRestrictions(1)
		
		if(isRemoved){
			const filteredRestrictions = restrictions.filter(restriction=> restriction!=ingredient_id)
			setRestrictions(filteredRestrictions)
		}else{
			setRestrictions(prevState=>[...prevState, ingredient_id])
		}
		
	}

	async function handleEditIngredient(id){

		const newName = prompt("digite o novo nome para o ingrediente.")
		if(!newName){ 
			return
		}
		
		await api.put(`/ingredients/${id}`,{name:newName})
		.catch(error=>{
			if(error.response){
				alert(error.response.data.message)
			}else{
				alert("Não foi possível atualizar o ingrediente.")
			}
		})
	}

	async function handleDeteleIngredient(id){

		const confirm = window.confirm("Você está certo disso?")
		if (confirm){
			await api.delete(`/ingredients/${id}`)
			.catch(error=>{
					if(error.response){
						alert(error.response.data.message)
					}else{
						alert("Não foi possível remover o ingrediente.")
					}
			})
		}

	}

	async function handleUpdateProfile(){

		const updatedUser ={
			name,
			email,
			password:newPassword,
			old_password:oldPassword
		}
		updateProfile({user:updatedUser})

	
		.then(async()=>{

			if(!isAdmin){
				const {data:existingRestrictions} = await api.get(`/restrictions/?user_id=${user.id}`)

					existingRestrictions.forEach(restriction=>{
						removeRestriction(restriction.id)
					})
		
					restrictions.forEach(ingredientId=>{
						addRestriction(ingredientId)
					})

			}
			
			navigate(-1)
	
		})	
	
	}


	useEffect(()=>{

		handleCheckAdmin()
		fetchRestrictions()

	},[])

	useEffect(()=>{

		fetchIngredients()

	},[ingredients])

	useEffect(()=>{
		if(name || email || oldPassword || newPassword || changedRestrictions ){
			setIsButtonDisabled(false)
		}else{
			setIsButtonDisabled(true)
		}
	},[name, email, oldPassword, newPassword, changedRestrictions])


	return(
		
		<Container>

			<Header>
				<button onClick={handleGoBack}>
					<img src={CloseIcon} alt="Botão de fechar." />
				</button>


				{isAdmin ?(
					<h1>Perfil do administrador</h1>
				):(
					<h1>Perfil do usuário</h1>
				)}

			</Header>

			<Main>
				<UserInfo>

					<h2>Informações da conta</h2>

					<Input 
						title="Nome do usuário" 
						id="nameInput"
						type="text"
						placeholder={user.name}
						onChange={e=>setName(e.target.value)}
						/>

					<Input 
						title="Email" 
						id="emailInput"
						type="text"
						placeholder={user.email}
						onChange={e=>setEmail(e.target.value)}
						/>

					<Input 
						title="Senha Atual" 
						id="oldPasswordInput"
						type="password"
						placeholder="No mínimo 6 caracteres"
						onChange={e=>setOldPassword(e.target.value)}
						/>	

						
					<Input 
						title="Senha Nova" 
						id="newPasswordInput"
						type="password"
						placeholder="No mínimo 6 caracteres"
						onChange={e=>setNewPassword(e.target.value)}
						/>	


					<Button
						title="Salvar informações"
							disabled={isButtonDisabled}
							onClick={handleUpdateProfile}
						/>
						

				</UserInfo>

				<Preferences>	

				{isAdmin ?(

					<div>
						<h2>Editar Ingredientes</h2>
						<p>Clique sobre o ingrediente para renomeá-lo, ou no "x" para removê-lo.</p>
					</div>

				):(

					<div>
						<h2>Restrições Alimentares</h2>
						<p>Selecione quais ingredientes você gostaria de retirar automaticamente de todos os pedidos</p>
					</div>

				)}

					<Tags>		

						{isAdmin ?(
							ingredients.length>0 && ingredients.map(ingredient=>(
								<TagEdit 
									key={ingredient.id}
									value={ingredient.name}
									onClick={()=>handleEditIngredient(ingredient.id)}
									onClickButton={()=>handleDeteleIngredient(ingredient.id)} />
							))
								):(
							ingredients.length>0 && ingredients.map(ingredient=>(
								<Tag 
									title={ingredient.name} 
									key={ingredient.id}
									id={ingredient.id}
									active={checkIngredientStatus(ingredient.id)}
									onClick={()=>handleToggleIngredient(ingredient.id)}
								/>
						))

				)}
	
					</Tags>

				</Preferences>

			</Main>

			<Footer/>
		</Container>
		
	)
}