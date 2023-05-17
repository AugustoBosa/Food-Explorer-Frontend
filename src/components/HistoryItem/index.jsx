import { Container, Details, Info } from "./styles"

import { useAuth } from "../../hooks/auth"
import { useState } from "react"
import { api } from "../../services/api"
import { useEffect } from "react"
import jwt_decode from "jwt-decode"

export function HistoryItem({cart}, ...rest){

	const { user, token } = useAuth()

	const [orders, setOrders]   = useState([])
	const [priceTotal, setpriceTotal] = useState(0)
	const [formatedDateTime, setFormatedDateTime] = useState("")
	const [username, setUsername] = useState("")
	const [isAdmin, setIsAdmin] = useState(false)
	
	const formatPrice = new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' })


	async function handleCheckAdmin(){

		const decodedToken = jwt_decode(token)
        const isAdmin = decodedToken.role === "admin"
		setIsAdmin(isAdmin)

	}

	async function fetchOrders(){

		const ordersResponse = await api.get(`/orders?cart_id=${cart.id}`)
		setOrders(ordersResponse.data)

	}

	async function fetchUser(){
		
		const {data:responseUser} = await api.get(`/users/?user_id=${cart.user_id}`)
		setUsername(responseUser.name)

	}

	async function formatDateAndTime(){
	
		const day = cart.updated_at.slice(8,10).padStart(2,"0")
		const month = cart.updated_at.slice(5,7).padStart(2,"0")
		const year = cart.updated_at.slice(2,4).padStart(2,"0")

		const time = cart.updated_at.slice(11,16).replace(":","h")
		setFormatedDateTime(`${day}/${month}/${year} às ${time}`)

	}

	function calculateTotalPrice(){

		let total = 0
		orders.map(order=>total=total+order.price*order.quantity)
		setpriceTotal(total) 

	}

	
	useEffect(()=>{

		handleCheckAdmin()

	})
	

	useEffect(()=>{

		fetchOrders()
		calculateTotalPrice()
		formatDateAndTime()
		fetchUser()
		
	},[orders])


	return(
		
		<Container  {...rest}>

			<Details>
				<span>{(String(cart.id)).padStart(6,"0")} <div className={cart.status}></div></span>
				<span>{formatedDateTime}</span>
				{isAdmin && <h3>{username}</h3>}
			</Details>

			<Info>
				{orders.map(order=>(
					<p key={order.id}> {order.quantity} x {order.name} {order.removed_ingredients!="" && 
					<span>sem {(order.removed_ingredients).replaceAll(",",", ")}</span>
					}</p>
				))}
				<span>Total: {formatPrice.format(priceTotal)}</span>
			</Info>
				

		</Container>
		
	)
}