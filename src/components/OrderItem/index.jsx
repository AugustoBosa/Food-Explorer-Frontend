import { Container, Details, Info, Controls } from "./styles"

import { Button } from "../Button"

import { useState } from "react"
import { api } from "../../services/api"
import { useEffect } from "react"

export function OrderItem({cart}, ...rest){


	const [orders, setOrders]   = useState([])
	const [priceTotal, setpriceTotal] = useState(0)
	const [formatedDateTime, setFormatedDateTime] = useState("")


	const formatPrice = new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' })


	async function HandleCartAdvance(id){

		const currentStatus=cart.status
		if(currentStatus=="Pendente"){
			await api.put(`/carts/${id}`,{status:"Preparando"})
			return
		}
		if(currentStatus=="Preparando"){
			await api.put(`/carts/${id}`,{status:"Entregando"})
			return
		}
		if(currentStatus=="Entregando"){
			await api.put(`/carts/${id}`,{status:"Finalizado"})
			return
		}

	}

	async function HandleCancelCart(id){

			await api.put(`/carts/${id}`,{active:"false",status:"Cancelado"})
			
			.catch(error=>{
				if(error.response){
					alert(error.response.data.message)
				}else{
					alert("Não foi possível cancelar o pedido.")
				}
			})
	
	}

	async function fetchOrders(){

		const ordersResponse = await api.get(`/orders?cart_id=${cart.id}`)
		setOrders(ordersResponse.data)

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

		fetchOrders()
		calculateTotalPrice()
		formatDateAndTime()
		
	},[orders])


	return(
		
		<Container  {...rest}>

			<Details>
				<span>{(String(cart.id)).padStart(6,"0")} <div className={cart.status}></div></span>
				<span>{formatedDateTime}</span>

			</Details>

			<Info>
				{orders.map(order=>(
					<p key={order.id}> {order.quantity} x {order.name} {order.removed_ingredients!="" && 
					<span>sem {(order.removed_ingredients).replaceAll(",",", ")}</span>
					}</p>
				))}
				<span>Total: {formatPrice.format(priceTotal)}</span>
			</Info>
			
	
			{
				cart.status=="Pendente"?(

					<Controls>
						<Button onClick={()=>HandleCancelCart(cart.id)} title="recusar"/>
						<Button onClick={()=>HandleCartAdvance(cart.id)} title="aceitar"/>
					</Controls>
	
				):cart.status=="Entregando"?(
	
					<Controls>
						<Button onClick={()=>HandleCancelCart(cart.id)} title="cancelar"/>
						<Button onClick={()=>HandleCartAdvance(cart.id)} title="finalizar"/>
					</Controls>
	
				):cart.status=="Preparando" &&(
					
					<Controls>
						<Button onClick={()=>HandleCancelCart(cart.id)} title="cancelar"/>
						<Button onClick={()=>HandleCartAdvance(cart.id)} title="avançar"/>
					</Controls>
				)
			}
			
		

		</Container>
		
	)
}