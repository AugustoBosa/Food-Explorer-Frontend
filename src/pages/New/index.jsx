import { Container, Content, Info, Select, Ingredients, TextArea } from "./styles"

import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer"
import { Button } from "../../components/Button"
import { Input } from "../../components/Input"
import { TagEdit } from "../../components/TagEdit"

import LeftArrow from "../../assets/leftArrow.svg"
import Upload from "../../assets/upload.svg"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { api } from "../../services/api"

export function New(){

	const navigate = useNavigate()

	const [categories, setCategories] = useState([])
	const [name, setName] = useState("")
	const [category, setCategory] = useState("")
	const [ingredients, setIngredients] = useState([])
	const [price, setPrice] = useState(0)
	const [description, setDescription] = useState("")
	const [dishImageFile, setDishImageFile] = useState("")
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
			const exists = ingredients.filter(selected=> selected.id==ingredient.id)
			if(exists.length==0){
				setOptions((prevState=>[...prevState,ingredient]))
			}

		})        
	}

	async function fetchCategories(){

		const {data:categoriesResponse} = await api.get(`/categories`)
		setCategories(categoriesResponse)

	}

		
	async function handleCreateIngredient(){
		
		if(newIngredient==""){
			alert("Informe um nome para o ingrediente.")
			return
		}

		const fixedNewIngredient = String(newIngredient).toLowerCase().trim()

		const {data:ingredientExists} = await api.get(`/ingredients/?name=${fixedNewIngredient}`)

			if(ingredientExists){
				
				const ingredientAdded =  ingredients.find(ingredient=> ingredient.id==ingredientExists.id)
				if (ingredientAdded){
					alert("Ingrediente já adicionado")
					setNewIngredient("")
					return
				}
	
				setIngredients((prevState=>[...prevState,ingredientExists]))
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
		const {data:responseIngredient} = await api.get(`/ingredients/?name=${fixedIngredientName}`)
		setIngredients((prevState=>[...prevState,responseIngredient]))
		setNewIngredient("")

	}

	function handleRemoveIngredient(ingredientName){

        setIngredients(prevState=>prevState.filter(ingredient => ingredient !== ingredientName))
   
	}

	async function handleUploadImage(event){

        const file = event.target.files[0]
        setDishImageFile(file)

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

	async function handleCreateDish(){

		if(newIngredient!=""){
			const confirm = window.confirm("Existem ingredientes não adicionados, deseja continuar?")

			if(!confirm){
				return
			}
		}

		await api.post("/dishes/",{name,category,price,description})
		.then(async()=>{
			const {data:newDish} = await api.get(`/dishes?name=${name}`)
			ingredients.map(ingredient=>{
				handleCreateRecipe(newDish.id,ingredient.id)
			})	
	
			const fileUploadForm = new FormData()
			fileUploadForm.append("image",dishImageFile)
	
			await api.patch(`/dishes/image/${newDish.id}`,fileUploadForm)
	
			alert(`"${name}" adicionado ao menu.`)
			navigate("/")
		})
		
		.catch(error=>{
			if(error.response){
				alert(error.response.data.message)
			}else{
				alert("Não foi possível cadastrar o prato.")
			}
		})
	
		
	}


	useEffect(()=>{
		fetchCategories()
	},[])

	useEffect(()=>{
		fetchOptions()
	},[ingredients,newIngredient])

	useEffect(()=>{
		if(!name || !category || !ingredients || !price || !description || !dishImageFile){
			setIsButtonDisabled(true)
		}else{
			setIsButtonDisabled(false)
		}
	},[name,category,ingredients,price,description,dishImageFile])


	return(
		
		<Container>
			<Header />

			<Content>
				<button onClick={handleGoBack}>
					<img src={LeftArrow} alt="Seta para a esquerda." />
					<span>voltar</span>
				</button>

				<h1>Novo prato</h1>

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
							placeholder="Ex.: Salada Caesar"
							title="Nome" 
							id="nameInput"
							type="text"
							onChange={e=>setName(e.target.value)}
							/>
						
						<Select className ="dishCategory">
							<label htmlFor="categorySelect">
								Categoria
							</label>
							
							<select  
								id="categorySelect"
								defaultValue={"default"}
								onChange={e=>setCategory(e.target.value)}
							>
                            	<option value={"default"}  hidden  disabled>Selecione</option>

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

									{ingredients &&
										ingredients.map(ingredient=>(
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
										onChange={event=>setNewIngredient(event.target.value)}
										onClickButton={handleCreateIngredient}
										onClickOption={(event)=>handleAddIngredient(event.target.value)}
										options={options}
										/>
							</div>
						</Ingredients>

						<Input
							className ="dishPrice" 
							placeholder="00,00"
							prefix="R$"
							title="Preço" 
							id="priceInput"
							type="number"
							step="0.01" 
							onChange={e=>setPrice(e.target.value)}
							/>
					</div>

					
					<div>
						<TextArea>
							<label htmlFor="descriptionInput">
								Descrição
							</label>

							<textarea 
								placeholder="Fale brevemente sobre o prato, seus ingredientes e composição." 
								id="descriptionInput"
								onChange={e=>setDescription(e.target.value)}>

							</textarea>
						</TextArea>
					</div>
					
					
					<div>
						<Button 
							className="addDish"
							title={`Salvar alterações`} 
							disabled={isButtonDisabled}
							onClick={handleCreateDish}
						/>
					</div>
				</Info>
			</Content>
			
			<Footer />
		</Container>
		
	)
}