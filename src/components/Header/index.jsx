import { Container, Logo, Search, Options } from "./styles"

import { Input } from "../Input"
import { Button } from '../Button'

import MenuIcon from "../../assets/menu.svg"
import SearchIcon from "../../assets/search.svg"
import OrdersIcon from "../../assets/orders.svg"
import BlueHexagon from "../../assets/blueHexagon.svg"

import { useAuth } from "../../hooks/auth"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { api } from "../../services/api"
import jwt_decode from "jwt-decode"


export function Header(){

	const navigate = useNavigate()	
	const { user, token } = useAuth()

	const [orders, setOrders] = useState([])
    const [search, setSearch] = useState("")
    const [searchOptions, setSearchOptions] = useState([])
	const [isAdmin, setIsAdmin] = useState()

	const formatPrice = new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' });

	
	function handleGoToNewDish(){
		navigate("/new")
	}

	function handleGoToHome(){
		navigate("/")
	}

	function handleGoToCart(){
		navigate("/cart")
	}
	
	function handleGoToMenu(){
		navigate("/menu")
	}

	function handleGoToDetails(id){
		navigate(`/details/${id}`)
	}

	async function handleCheckAdmin(){

		const decodedToken = jwt_decode(token)
        const isAdmin = decodedToken.role === "admin"
		setIsAdmin(isAdmin)

	}

	async function fetchCart(){
		if(isAdmin==true){
			return
		}else{
			const {data:cartExists} = await api.get(`/carts/?user_id=${user.id}`)
			if(!cartExists){
				await api.post("/carts")
			}
			const {data:userCart} = await api.get(`/carts/?user_id=${user.id}`)
	
			return userCart
		}
	
	}

	async function fetchOrders(){
		if(isAdmin==true){
			return
		}else{
			const userCart = await fetchCart()
			const {data:ordersResponse} = await api.get(`/orders?cart_id=${userCart.id}`)
			setOrders(ordersResponse)
		}
	}

	async function fetchSearch(){

		const responseDish = await api.get(`/dishes/?search=${search}`)
		setSearchOptions(responseDish.data)

	}


	useEffect(()=>{

		handleCheckAdmin()
	
	})

	
	useEffect(()=>{
		
		fetchOrders()
		
	},[orders])

	useEffect(()=>{

		fetchSearch()

	},[search])


	
	return(
		
		<Container>
			
			<button className="menu"
					onClick={handleGoToMenu}>
				<img src={MenuIcon} alt="Ícone de Menu" />
			</button>
		
			<Logo onClick={handleGoToHome}>
				{isAdmin==true ? (
						<img className="adminLogo" src={BlueHexagon} alt="Logo - Hexagono azul." />
					):(
						<img src={BlueHexagon} alt="Logo - Hexagono azul." />
					)
				}	
				
				<div>
					<h1>food explorer </h1>
					{isAdmin==true &&
						<span>admin</span>
					}	
				</div>
			</Logo>

			<Search className="desktop">
				<Input 
					id="searchBar"
					placeholder="Busque por pratos ou ingredientes"
					icon={SearchIcon}
					onChange={(event)=>setSearch(event.target.value)}
					/>

					<Options
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
					</Options>		
			</Search>

			{isAdmin==true ? (
				<div className="orders">
					<Button className="desktop" title="Novo prato" onClick={handleGoToNewDish}/>
				</div>
				):(
				<div onClick={handleGoToCart} className="orders">
					<div className="mobile">
						<img src={OrdersIcon} alt="Ícone de Pedidos" />
						<div>
							<span >{`${orders.length}`}</span>
						</div>
					</div>
					<Button className="desktop" title={`Pedidos (${orders.length})`} icon={OrdersIcon} />
				</div>
				)
			}


		</Container>
		
	)
}