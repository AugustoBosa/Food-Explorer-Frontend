import { Container, Content, Intro, NewCategory } from "./styles"

import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer"
import { Section } from "../../components/Section"
import { Item } from "../../components/Item"
import { ItemFiller } from "../../components/ItemFiller"
import { Button } from "../../components/Button"

import { useAuth } from "../../hooks/auth"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { api } from "../../services/api"
import jwt_decode from "jwt-decode"


export function Home(){

	const { user,token } = useAuth()
    const navigate = useNavigate()

	const [dishes, setDishes] = useState([])
	const [categories, setCategories] = useState([])
	const [newCategory, setNewCategory] = useState("")
	const [isAdmin, setIsAdmin] = useState(false)


	function handleGoToDetails(id){
        navigate(`/details/${id}`)
	}

	async function handleCheckAdmin(){

		const decodedToken = jwt_decode(token)
        const isAdmin = decodedToken.role === "admin"
		setIsAdmin(isAdmin)

	}

	async function fetchCategories(){

		const {data:categoriesResponse} = await api.get(`/categories`)
		setCategories(categoriesResponse)

	}

	async function fetchDishes(){

		const {data:dishesResponse}= await api.get(`/dishes`)
		setDishes(dishesResponse)

	}

	async function handleDeleteCategory(id){

		const confirm = window.confirm("Você está certo disso?")
		if(confirm){
			await api.delete(`/categories/${id}`)
			alert("Categoria removida")
		}
	}

	async function handleAddCategory(){

		await api.post(`/categories/`,{name:newCategory})
		alert("Categoria adicionada")
		setNewCategory("")

	}

	async function handleUpdateCategory(id){

		const newName = prompt("Novo nome")
		await api.put(`/categories/${id}`,{name:newName})
		alert("Categoria modificada")


	}


	useEffect(()=>{

		handleCheckAdmin()

	},[])
	
	useEffect(()=>{

		fetchCategories()
		fetchDishes()

	},[categories])


	return(
		<Container>
			<Header />
			
			<Content>
				<main>
					<Intro>
						<div>
							<img src="./src/assets/home.svg" alt="" />
							<h2>Sabores inigualáveis</h2>
							<p>Sinta o cuidado do preparo com ingredientes selecionados.</p>
						</div>
					</Intro>

					{isAdmin==true &&
					<NewCategory>
						<label htmlFor="">Nova categoria:</label>
						<input 
							type="text" 
							placeholder="ex.: Refeições, Sobremesas..."
							onChange={event=>setNewCategory(event.target.value)}
							value={newCategory}
							/>
						<Button
							title="adicionar"
							onClick={handleAddCategory}/>
					</NewCategory>	
					}

					{categories && categories.map(category=>(
						<Section  
							title={category.name} 
							key={category.id} 
							id={category.name}
							isRemovable={dishes.filter(dish=> dish.category==category.id).length==0}
							isAdmin={isAdmin}
							onClickDelete={()=>handleDeleteCategory(category.id)}
							onClickUpdate={()=>handleUpdateCategory(category.id)}
						>
											{
								dishes.filter(dish=> dish.category==category.id).length>0?
								
									dishes.map(dish=>{
										if(dish.category==category.id){
											return(
												<Item
												
												key={dish.id}
												dish_id={dish.id}
												title={dish.name}
												price={dish.price}
												description={dish.description}
												onClick={()=>handleGoToDetails(dish.id)}/>
											)
										}
									})
								:
								<ItemFiller />
							}

							
						</Section>
					))}						

				</main>
			</Content>

			<Footer />
		</Container>
	)
}