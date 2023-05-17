import { Container, Content, Info, Select, Ingredients, TextArea } from "./styles"

import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer"
import { Button } from "../../components/Button"
import { Input } from "../../components/Input"
import { TagEdit } from "../../components/TagEdit"

import LeftArrow from "../../assets/leftArrow.svg"
import Upload from "../../assets/upload.svg"

import { useState, useEffect } from "react"
import { useNavigate,useParams } from "react-router-dom"
import { api } from "../../services/api"

export function Edit(){
	
	const navigate = useNavigate()
	const params = useParams()

	const [categories, setCategories] = useState([])
	const [newName, setNewName] = useState("")
	const [newCategory, setNewCategory] = useState("")
	const [newIngredients, setNewIngredients] = useState([])
	const [newPrice, setNewPrice] = useState(0)
	const [newDescription, setNewDescription] = useState("")
	const [newDishImageFile, setNewDishImageFile] = useState("")
	const [isButtonDisabled, setIsButtonDisabled] = useState(true)
	const [newIngredient, setNewIngredient] = useState("")
	const [options, setOptions] = useState([])
	
	
	function handleGoBack(){
		navigate(-1)
	}

	async function fetchOptions(){
		const {data:ingredientsResponse} = await api.get(`/ingredients/?search=${newIngredient}`)
		setOptions([])
		
		ingredientsResponse.map(ingredient=>{

			const exists = newIngredients.filter(selected=> selected.id==ingredient.id)
			if(exists.length==0){
				setOptions((prevState=>[...prevState,ingredient]))
			}

		})        
	}

	async function fetchCategories(){

		const {data:categoriesResponse} = await api.get(`/categories`)
		setCategories(categoriesResponse)

	}

	async function fetchIngredient(ingredientName){

		const {data:ingredientResponse} = await api.get(`/ingredients/?search=${ingredientName}`)
		return ingredientResponse[0]

	}

	async function fetchDish(){

		const {data:dishResponse} = await api.get(`/dishes/${params.id}`)

		setNewName(dishResponse.name)
		setNewCategory(dishResponse.category)
		setNewPrice(dishResponse.price)
		setNewDescription(dishResponse.description)

	}

	async function fetchRecipes(){

		const {data:recipesResponse} = await api.get(`/recipes/?id=${params.id}`)
		const ingredientsFromRecipes = recipesResponse.map(recipe=>{
			return {
				id:recipe.ingredient_id,
				name:recipe.name
			}
		})
		setNewIngredients(ingredientsFromRecipes)

	}

	async function handleCreateIngredient(){
		
		if(newIngredient==""){
			alert("Informe um nome para o ingrediente.")
			return
		}

		const fixedNewIngredient = String(newIngredient).toLowerCase().trim()

		const {data:ingredientExists} = await api.get(`/ingredients/?name=${newInfixedNewIngredientgredient}`)

			if(ingredientExists){
				
				const ingredientAdded =  newIngredients.find(ingredient=> ingredient.id==ingredientExists.id)
				if (ingredientAdded){
					alert("Ingrediente já adicionado")
					setNewIngredient("")
					return
				}
	
				setNewIngredients((prevState=>[...prevState,ingredientExists]))
				setNewIngredient("")
	
			}else{		

				await api.post("/ingredients/",{name:fixedNewIngredient})

				.then(async()=>{
					await handleAddIngredient(fixedNewIngredient)
				})

				.catch(error=>{
					if(error.response){
						alert(error.response.data.message)
					}else{
						alert("Não foi possível cadastrar o ingrediente.")
					}
				})
			}

	}
			
	async function handleAddIngredient(ingredientName){

		const fixedIngredientName = String(ingredientName).toLowerCase().trim()
		const responseIngredient = await fetchIngredient(fixedIngredientName)
		setNewIngredients((prevState=>[...prevState,fixedIngredientName]))
		setNewIngredient("")

	}

	function handleRemoveIngredient(ingredientName){

        setNewIngredients(prevState=>prevState.filter(ingredient => ingredient !== ingredientName))
   
	}

	async function handleUploadImage(event){

        const file = event.target.files[0]
        setNewDishImageFile(file)

    }

	async function handleCreateRecipe(dish_id,ingredient_id){

		await api.post("/recipes/",{dish_id,ingredient_id})

		.catch(error=>{
			if(error.response){
				alert(error.response.data.message)
			}else{
				alert("Não foi possível registrar o ingrediente para o prato.")
			}
		})

	}

	async function handleDeleteRecipe(id){

		await api.delete(`/recipes/${id}`)
		.catch(error=>{
			if(error.response){
				alert(error.response.data.message)
			}else{
				alert("Não foi possível remover o ingrediente do prato.")
			}
		})
	}

	async function handleUpdateDish(){

		await api.put(`/dishes/${params.id}`,{name:newName,category:newCategory,price:newPrice,description:newDescription})
		.then(async()=>{
			const {data:recipes} = await api.get(`/recipes/?id=${params.id}`)

			recipes.map(recipe=>{
				handleDeleteRecipe(recipe.id)
			})
			
			newIngredients.map(ingredient=>{
				handleCreateRecipe(params.id,ingredient.id)			
			})

		})

		.then(async()=>{
			if(newDishImageFile){
				const fileUploadForm = new FormData()
				fileUploadForm.append("image",newDishImageFile)
	
				await api.patch(`/dishes/image/${params.id}`,fileUploadForm)
			}
	
	
			alert(`Informações atualizadas.`)
	
			navigate("/")
		})
		
		.catch(error=>{
			if(error.response){
				alert(error.response.data.message)
			}else{
				alert("Não foi possível atualizar o prato.")
			}
		})

		


	}

	async function handleDeleteDish(){
		const confirm = window.confirm("Você está certo disso?")
		if(confirm){

			await api.delete(`/dishes/image/${params.id}`)
			await api.delete(`/dishes/${params.id}`)
			
			alert("Item removido")
			navigate("/")
		}

	}


    useEffect(()=>{
	
		fetchOptions()

	},[newIngredients,newIngredient])

	useEffect(()=>{

		fetchDish()
		fetchCategories()
    	fetchRecipes()

	},[])

	useEffect(()=>{

		if(!newName || !newCategory || !newIngredients || !newPrice  || !newDescription){
			setIsButtonDisabled(true)
		}else{
			setIsButtonDisabled(false)
		}

	},[newName,newCategory,newIngredients,newPrice,newDescription])


	return(
		
		<Container>
			<Header />

			<Content>
				<button onClick={handleGoBack}>
					<img src={LeftArrow} alt="Seta para a esquerda." />
					<span>voltar</span>
				</button>

				<h1>Editar prato</h1>

				<Info>
					<div>
						<Input
							className ="dishImg" 
							icon={Upload}
							title="Imagem do prato" 
							alternativeText="Selecione uma imagem"
							id="imgInput"
							type="file"
							onChange={handleUploadImage}
							/>

						<Input
							className ="dishName" 
							placeholder={newName}
							title="Nome" 
							id="nameInput"
							type="text"
							onChange={e=>setNewName(e.target.value)}
							/>
						
						<Select className ="dishCategory">
							<label htmlFor="categorySelect">
								Categoria
							</label>
							
							<select  
								id="categorySelect"
								defaultValue={"default"}

								onChange={e=>setNewCategory(e.target.value)}
							>
                            	<option value={"default"} hidden disabled>Selecione</option>

								{categories.map(category=>(
									<option key ={category.id} value={category.id}>{category.name}</option>
								))}

							</select>
						</Select>
					</div>

					<div>
						<Ingredients className ="dishIngredients">
							<label htmlFor="tagsInput">
								Ingredientes
							</label>

							<div id="tagInput">

									{newIngredients &&
										newIngredients.map(ingredient=>(
										<TagEdit 
											key={ingredient.id}
											value={ingredient.name} 
											onClickButton={()=>handleRemoveIngredient(ingredient)}
											/>
										))
									}

									<TagEdit 
										isNew 
										placeholder="Adicionar" 
										value={newIngredient}
										onChange={e=>setNewIngredient(e.target.value)}
										onClickButton={handleCreateIngredient}
										onClickOption={(event)=>handleAddIngredient(event.target.value)}
										options={options}
										/>
							</div>
						</Ingredients>

						<Input
							className ="dishPrice" 
							placeholder={newPrice}
							prefix="R$"
							title="Preço" 
							id="priceInput"
							type="number"
							step="0.01" 
							onChange={e=>setNewPrice(e.target.value)}
							/>
					</div>

					
					<div>
						<TextArea>
							<label htmlFor="descriptionInput">
								Descrição
							</label>

							<textarea 
								id="descriptionInput"
								placeholder={newDescription}
								onChange={e=>setNewDescription(e.target.value)}>

							</textarea>
						</TextArea>
					</div>
					
					
					<div>
						<Button 
							className="removeDish"
							title={`Excluir prato`} 
							onClick={handleDeleteDish}
						/>

						<Button 
							className="updateDish"
							title={`Salvar alterações`} 
							disabled={isButtonDisabled}
							onClick={handleUpdateDish}
						/>
					</div>
					

				</Info>


			</Content>
			
			<Footer />
		</Container>
		
	)
}