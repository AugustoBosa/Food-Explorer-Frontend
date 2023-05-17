import { Container, Header, Main, Options, Search, SearchOptions } from "./styles"

import { Input } from "../../components/Input"
import { Footer } from "../../components/Footer"

import CloseIcon from "../../assets/close.svg"
import SearchIcon from "../../assets/search.svg"

import { useAuth } from "../../hooks/auth"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { api } from "../../services/api"
import jwt_decode from "jwt-decode"


export function Menu(){

	const [isAdmin,setIsAdmin]=useState(false)

	const [search,setSearch] = useState("")
    const [searchOptions,setSearchOptions] = useState([])

	const formatPrice = new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' });

	const { token } =useAuth()
	const navigate = useNavigate()

	const { signOut } = useAuth()
	function handleSignOut(){
		signOut()
		navigate("/")
	}

	function handleGoBack(){
		navigate(-1)
	}

	function handleGoToProfile(){
		navigate("/profile")
	}

	function handleGoToHome(){
		navigate("/")
	}
	function handleGoToFavorites(){
		navigate("/favorites")
	}
	
	function handleGoToNewDish(){
		navigate("/new")
	}
		
	function handleGoToOrders(){
		navigate("/orders")
	}

	function handleGoToHistory(){
		navigate("/history")
	}


	async function handleCheckAdmin(){

		const decodedToken = jwt_decode(token)
        const isAdmin = decodedToken.role === "admin"
		setIsAdmin(isAdmin)

	}

	function handleGoToDetails(id){
		navigate(`/details/${id}`)
	}

	useEffect(()=>{
		handleCheckAdmin()
	},[])



	

	async function fetchSearch(){
		const responseDish = await api.get(`/dishes/?search=${search}`)
		setSearchOptions(responseDish.data)
	}

	
	useEffect(()=>{
		fetchSearch()
	},[search])
	

	return(
		<Container>
			<Header>
				<button onClick={handleGoBack}>
					<img src={CloseIcon} alt="Botão de fechar." />
				</button>

				<h1>Menu</h1>
			</Header>

			<Main>

			<Search className="desktop">
				
				<Input 
					id="searchBar"
					placeholder="Busque por pratos ou ingredientes"
					icon={SearchIcon}
					onChange={(event)=>setSearch(event.target.value)}
					/>

					<SearchOptions
						active={search!=""}>
							
						{search!="" && searchOptions.length>0 && searchOptions.map(
							dish=>(
								<div 
									key={dish.id} 
									onClick={()=>handleGoToDetails(dish.id)}
								>    
									<img src={`${api.defaults.baseURL}/files/${dish.image}`} />
									<h3>{dish.name}</h3>
									<span>{formatPrice.format(dish.price)}</span>
									    
								</div>
							)
						)}

					</SearchOptions>

				</Search>

					{isAdmin==true ? (
						<Options>
							<li onClick={handleGoToHome}>Início</li>
							<li onClick={handleGoToNewDish}>Novo prato</li>
							<li onClick={handleGoToOrders}>Pedidos ativos</li>
							<li onClick={handleGoToHistory}>Histórico de pedidos</li>
							<li onClick={handleGoToProfile}>Perfil do administrador</li>
							<li onClick={handleSignOut}>Sair</li>
						</Options>
					):(
						<Options>
							<li onClick={handleGoToHome}>Início</li>
							<li onClick={handleGoToFavorites}>Meus favoritos</li>
							<li onClick={handleGoToHistory}>Histórico de pedidos</li>
							<li onClick={handleGoToProfile}>Perfil do usuário</li>
							<li onClick={handleSignOut}>Sair</li>
						</Options>
					)}
					
			</Main>

			<Footer/>
		</Container>
		
	)
}