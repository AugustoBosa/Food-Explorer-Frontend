import { Container, Content, Dish, Tags, Controls } from "./styles"

import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer"
import { Button } from "../../components/Button"
import { Tag } from "../../components/Tag"

import LeftArrow from "../../assets/leftArrow.svg"
import OrdersIcon from "../../assets/orders.svg"
import MinusIcon from "../../assets/minus.svg"
import PlusIcon from "../../assets/plus.svg"

import { useAuth } from "../../hooks/auth"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { api } from "../../services/api"
import jwt_decode from "jwt-decode"


export function Details(){

	const { user, token } = useAuth()
	const params = useParams()
	const navigate = useNavigate()

	const [dish, setDish] = useState({})
	const [ingredients, setIngredients] = useState([])
	const [ammount, setAmmount] = useState(1)
	const [dishImage, setDishImage] = useState()
	const [restrictions, setRestrictions] = useState([])
	const [isAdmin, setIsAdmin] = useState(false)
	
	const formatPrice = new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' });


	function handleGoBack(){
		navigate(-1)
	}

	function handleGoToEdit(id){
		navigate(`/edit/${id}`)
	}
	
	async function handleCheckAdmin(){

		const decodedToken = jwt_decode(token)
        const isAdmin = decodedToken.role === "admin"
		setIsAdmin(isAdmin)

	}


	function handleAdd(){

		event.preventDefault()
		setAmmount(prevState=> prevState+1)

	}

	function handleRemove(){

		event.preventDefault()
		if(ammount<=1){
			return
		}
		setAmmount(prevState=> prevState-1)

	}

	async function fetchDish(){

		const {data:dishResponse} = await api.get(`/dishes/${params.id}`)
		setDish(dishResponse)
		const imageURL = `${api.defaults.baseURL}/files/${dish.image}`
		setDishImage(imageURL)
		
	}

	async function fetchRecipes(){

		const {data:recipesResponse} = await api.get(`/recipes/?id=${params.id}`)
		const ingredientsFromRecipes = recipesResponse.map(recipe=>{
			return {
				id:recipe.ingredient_id,
				name:recipe.name
			}
		})
		setIngredients(ingredientsFromRecipes)

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

	function handleToggleRemoveIngredient(id){

		const isRemoved = restrictions.includes(id)
		if (isRemoved){
			const filteredIngredients = restrictions.filter(restriction=>restriction !=id )
			setRestrictions(filteredIngredients)
		}else{
			setRestrictions(prevState=>[...prevState,id])
		}
		
	}

	function checkIngredientStatus(id){

		const isRemoved = restrictions.includes(id) 
		if (isRemoved){
			return false
		}else{
			return true
		}
	}
	
	async function handleOrder(){
		event.preventDefault()
		
		const {data:userCartStatus} = await api.get(`/carts/?user_id=${user.id}`)

		if(userCartStatus.status!="Aberto"){
			const confirm = window.confirm("Você já possui um pedido em andamento, deseja criar um novo pedido?")

			if(confirm){
				await api.put(`/carts/${userCartStatus.id}`,{active:"false"})

				await api.post(`/carts/`)

			}else{
				return
			}
		}

		const {data:userCart} = await api.get(`/carts/?user_id=${user.id}`)

		let removedIngredients=[]

		ingredients.forEach(ingredient=>{
			if(restrictions.includes(ingredient.id)){
				removedIngredients.push(ingredient.name)
			}	
		})

		await api.post("/orders",{

			cart_id:userCart.id,
			dish_id:params.id,
			quantity:ammount,
			removed_ingredients:String(removedIngredients)
			
		})
		.then(async()=>{
			alert(`"${ammount} x ${dish.name}" adicionado(s) ao carrinho.`)
			navigate(`/`)
		})

		.catch(error=>{
			if(error.response){
				alert(error.response.data.message)
			}else{
				alert("Não foi possível cadastrar o ingrediente.")
			}
		})

	}


	useEffect(()=>{

		fetchRestrictions()

	},[])


	useEffect(()=>{
		fetchDish()
		handleCheckAdmin()
		fetchRecipes()
	},[dish]) 
	
	
	return(
		
		<Container>
			<Header />

			<Content>
				<button onClick={handleGoBack}>
					<img src={LeftArrow} alt="Seta para a esquerda." />
					<span>voltar</span>
				</button>

				<Dish>
					<img src={dishImage} alt="" />

					<div>

						<h1>{dish.name}</h1>

						<p>{dish.description}</p>

						<Tags>				
							{ingredients && ingredients.map(ingredient=>(
								isAdmin==true ?
									<Tag 
										title={ingredient.name} 
										key={ingredient.id}
										id={ingredient.id}
										active={checkIngredientStatus(ingredient.id)}
									/>
									:
									<Tag 
										title={ingredient.name} 
										key={ingredient.id}
										id={ingredient.id}
										active={checkIngredientStatus(ingredient.id)}
										onClick={()=>handleToggleRemoveIngredient(ingredient.id)}
									/>
							))}
						</Tags>

						<form action="">
							{isAdmin==false &&
								<Controls>
									<button onClick={handleRemove}>
										<img src={MinusIcon} alt="Sinal de subtração." />
									</button>

									<span>{ammount}</span>	

									<button onClick={handleAdd}>
										<img src={PlusIcon} alt="Sinal de adição." />
									</button>
								</Controls>
							}
							
					
							{isAdmin==true ? (
								<Button 
									title={`Editar prato`} 
									className="edit"
									onClick={()=>handleGoToEdit(dish.id)}	/>
							):(
								<Button 
									title={`incluir ∙ ${formatPrice.format(dish.price)}`} 
									icon={OrdersIcon}
									onClick={handleOrder}	/>
							)}
						
						</form>
						
					</div>

				</Dish>
			</Content>
			
			<Footer />
		</Container>
		
	)
}