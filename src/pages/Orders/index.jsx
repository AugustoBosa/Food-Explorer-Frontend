import { Container, Content } from "./styles"

import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer"
import { OrderItem } from "../../components/OrderItem"
import { useState } from "react"
import { api } from "../../services/api"
import { useEffect } from "react"

export function Orders(){

	const[carts,setCarts]=useState([])
	const[pendingCarts,setPendingCarts]=useState([])
	const[preparingCarts,setPreparingCarts]=useState([])
	const[deliveringCarts,setDeliveringCarts]=useState([])
	const[finishedCarts,setFinishedCarts]=useState([])


	async function fetchCarts(){
		const {data:cartsResponse} = await api.get(`/carts`)
		setCarts(cartsResponse)
		sortCarts()
	}

	function sortCarts(){
		setPendingCarts(carts.filter(cart=>cart.status=="Pendente"))
		setPreparingCarts(carts.filter(cart=>cart.status=="Preparando"))
		setDeliveringCarts(carts.filter(cart=>cart.status=="Entregando"))
		setFinishedCarts(carts.filter(cart=>cart.status=="Finalizado").slice(0,10))
	}


	useEffect(()=>{
		fetchCarts()
	},[carts])

	return(
		
		<Container>
			<Header />

			<Content>
				
				<h2>Aguardando Confirmação</h2>

				<section>
					{
						pendingCarts && pendingCarts.map(cart=>(
							<OrderItem
								key={cart.id}
								cart={cart}
								
							/>
						))
					}
				</section>

				<h2>Em Produção</h2>
				<section>
					{
						preparingCarts && preparingCarts.map(cart=>(
							<OrderItem
								key={cart.id}
								cart={cart}
							/>
						))
					}
				</section>

				<h2>Em Entrega</h2>
				<section>
					{
						deliveringCarts && deliveringCarts.map(cart=>(
							<OrderItem
								key={cart.id}
								cart={cart}
							/>
						))
					}
				</section>

				<h2>Pedidos Finalizados</h2>
				<section>
					{
						finishedCarts && finishedCarts.map(cart=>(
							<OrderItem
								key={cart.id}
								cart={cart}
							/>
						))
					}
				</section>

			</Content>

			<Footer/>
		</Container>
		
	)
}