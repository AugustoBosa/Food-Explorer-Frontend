import { Container, Controls } from "./styles"

import { Button } from "../Button"

import EmptyHeart from "../../assets/emptyHeart.svg"
import FullHeart from "../../assets/fullHeart.svg"
import Pencil from "../../assets/pencil.svg"
import MinusIcon from "../../assets/minus.svg"
import PlusIcon from "../../assets/plus.svg"

import { useAuth } from "../../hooks/auth"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { api } from "../../services/api"
import jwt_decode from "jwt-decode"


export function Item({dish_id, title, price, description, ...rest}){

	const { user,token } = useAuth()
    const navigate = useNavigate()

	const [ammount, setAmmount] = useState(1)
	const [isAdmin, setIsAdmin] = useState(false)
	const [favorites, setFavorites] = useState([])
	const [isFavorite, setIsFavorite] = useState(false)
	const [dish, setDish] = useState({})
	const [dishIngredients, setDishIngredients] = useState([])
	const [dishImage, setDishImage] = useState()
	const [restrictions, setRestrictions] = useState([])

	const formatedPrice = new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(price);

	const reducedDescription =  description.length > 80 ? description.substring(0, 80) + "..." : description;

	function handleGoToEdit(id){
        navigate(`/edit/${id}`)
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

	async function fetchFavorites(){

		const {data:favoritesResponse} = await api.get(`/favorites/?user_id=${user.id}`)
		setFavorites(favoritesResponse)
		
		if(favoritesResponse.filter(favorite=>favorite.dish_id==dish_id).length>0){
			setIsFavorite(true)
		}
		
	}

	async function fetchDish(){
		
		const {data:dishResponse} = await api.get(`/dishes/${dish_id}`)
		setDish(dishResponse)

		const imageURL = `${api.defaults.baseURL}/files/${dish.image}`
		setDishImage(imageURL)
	}

	async function fetchRecipes(){

		const {data:recipesResponse} = await api.get(`/recipes/?id=${dish_id}`)
		const ingredientsFromRecipes = recipesResponse.map(recipe=>{
			return {
				id:recipe.ingredient_id,
				name:recipe.name
			}
		})
		setDishIngredients(ingredientsFromRecipes)

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

	async function handleAddFavorite(){

		await api.post(`/favorites/`,{user_id:user.id,dish_id})
		.catch(error=>{
			if(error.response){
				alert(error.response.data.message)
			}else{
				alert("Não foi possível cadastrar o favorito.")
			}
		})

	}

	async function handleRemoveFavorite(){

		await api.delete(`/favorites/?user_id=${user.id}&dish_id=${dish_id}`)
		.then(()=>{
			setIsFavorite(false)
		})
		.catch(error=>{
			if(error.response){
				alert(error.response.data.message)
			}else{
				alert("Não foi possível cadastrar o ingrediente.")
			}
		})

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

		dishIngredients.forEach(ingredient=>{
			if(restrictions.includes(ingredient.id)){
				removedIngredients.push(ingredient.name)
			}	
		})
	
		await api.post("/orders",{

			cart_id:userCart.id,
			dish_id:dish_id,
			quantity:ammount,
			removed_ingredients:String(removedIngredients)
			
		})
		.then(async()=>{
			alert(`"${ammount} x ${title}" adicionado(s) ao carrinho.`)
			setAmmount(1)
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

		handleCheckAdmin()
		
		fetchRestrictions()
		fetchRecipes()

	},[])

	useEffect(()=>{

		fetchFavorites()

	},[favorites])

	useEffect(()=>{

		fetchDish()

	},[dish])


	return(
		
		<Container className="dishItem">

			{isAdmin==true ? (
				<button onClick={()=>handleGoToEdit(dish_id)} className="edit">
				<img src={Pencil} alt="Lápis." />
				</button>
			): isFavorite ? (
				<button className="favorite">
					<img src={FullHeart} alt="Coração cheio." onClick={handleRemoveFavorite}/>
				</button>
			):(
				<button className="favorite">
					<img src={EmptyHeart} alt="Coração vazio." onClick={handleAddFavorite}/>
				</button>
			)}
		

			<div {...rest}>
				<img src={dishImage} alt={`Imagem do prato ${dish.name}`} />

				<div>
					<h3>{title}</h3>

					<p className="desktop">{reducedDescription}</p>
				</div>

				<span>{formatedPrice}</span>
			</div>

			{isAdmin==false &&
				<form action="">
					<Controls>
						<button>
							<img src={MinusIcon} alt="Sinal de subtração." onClick={handleRemove}/>
						</button>

						<span>{ammount}</span>	

						<button>
							<img src={PlusIcon} alt="Sinal de adição." onClick={handleAdd}/>
						</button>
					</Controls>
				
					<Button title="incluir" onClick={handleOrder}/>
					</form>
			}
		</Container>
		
	)
}