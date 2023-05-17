import { Container, Content } from "./styles"

import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer"
import { Item } from "../../components/Item"

import { useAuth } from "../../hooks/auth"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { api } from "../../services/api"


export function Favorites(){

	const { user } = useAuth()
    const navigate = useNavigate()

	const [dishes, setDishes] = useState([])
	const [favorites, setFavorites] = useState([])
	const [favoriteDishes, setFavoriteDishes] = useState([])


	function handleGoToDetails(id){
        navigate(`/details/${id}`)
	}
	
	async function fetchFavorites(){
		const {data:favoritesResponse} = await api.get(`/favorites/?user_id=${user.id}`)
		setFavorites(favoritesResponse.map(favorite=>{return favorite.dish_id}))
	}

	async function fetchDishes(){
		const dishesResponse= await api.get(`/dishes`)
		setDishes(dishesResponse.data)
	}
	
	function filterDishes(){
		setFavoriteDishes(dishes.filter(dish=> favorites.includes(dish.id) )) 
	}
	
	useEffect(()=>{

		fetchDishes()
		fetchFavorites()
		filterDishes()

	},[favorites])


	return(
		<Container>
			<Header />
			
			<Content>
				<main>
				
					<h1>Meus Favoritos</h1>

					<div>		

						{
							favoriteDishes.map(dish=>(
							
								<Item	
									key={dish.id}
									dish_id={dish.id}
									title={dish.name}
									price={dish.price}
									description={dish.description}
									onClick={()=>handleGoToDetails(dish.id)}
								/>
	
							))
						}

					</div>

				</main>
			</Content>

			<Footer />
		</Container>
	)
}