import { Container } from "./styles"


import { useAuth } from "../../hooks/auth"
import { useState, useEffect } from "react"
import { api } from "../../services/api"
import jwt_decode from "jwt-decode"


export function HistoryTableRow({cart},...rest){

	const { token } = useAuth()
	const formatPrice = new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' })

	const [orders, setOrders] = useState([])
	const [formatedDateTime, setFormatedDateTime] = useState("")
	const [isAdmin, setIsAdmin] = useState(false)
	const [username, setUsername] = useState("")


	async function handleCheckAdmin(){

		const decodedToken = jwt_decode(token)
        const isAdmin = decodedToken.role === "admin"
		setIsAdmin(isAdmin)

	}

	async function fetchUser(){
		
		const {data:responseUser} = await api.get(`/users/?user_id=${cart.user_id}`)
		setUsername(responseUser.name)

	}

	async function fetchOrders(){

		const {data:responseOrders} = await api.get(`/orders?cart_id=${cart.id}`)
		setOrders(responseOrders)

	}

	function calculateTotalPrice(){

		let total = 0
		orders.forEach(order=>total=total+order.price*order.quantity)
		return(total) 

	}

	async function formatDateAndTime(){

		const day = cart.updated_at.slice(8,10).padStart(2,"0")
		const month = cart.updated_at.slice(5,7).padStart(2,"0")
		const year = cart.updated_at.slice(2,4).padStart(2,"0")

		const time = cart.updated_at.slice(11,16).replace(":","h")
		setFormatedDateTime(`${day}/${month}/${year} às ${time}`)
	}



	useEffect(()=>{

		fetchOrders()
		formatDateAndTime()
		handleCheckAdmin()
		fetchUser()

	},[])


	return(
		
		<Container {...rest}>

			<td className="status">
				<div className={cart.status}></div> 
				{cart.status}
			</td>
			<td>{String(cart.id).padStart(6,"0")}</td>

			{isAdmin && <td>{username}</td>}

			<td className="orders">{orders && orders.map(order=>(
					<p key={order.id}> {order.quantity} x {order.name} {order.removed_ingredients && <span>sem {(order.removed_ingredients).replaceAll(",",", ")}</span>}</p>
				))}
			</td>

			<td>{formatPrice.format(calculateTotalPrice())}</td>
			<td>{formatedDateTime}</td>
			
		</Container>
		
	)
}