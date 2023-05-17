import { Container, Content } from "./styles"

import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer"
import { HistoryTableRow } from "../../components/HistoryTableRow"
import { HistoryItem } from "../../components/HistoryItem"

import { useAuth } from "../../hooks/auth"
import { useState, useEffect } from "react"
import { api } from "../../services/api"
import jwt_decode from "jwt-decode"

export function History(){

	const { user,token } = useAuth()

	const [carts, setCarts] = useState([])
	const [isAdmin, setIsAdmin] = useState(false)


	async function fetchCarts(){
		await handleCheckAdmin()
		if (isAdmin){
			const {data:cartsResponse} = await api.get(`/carts/?user_history=full`)
			setCarts(cartsResponse)

		}else{
			const {data:cartsResponse} = await api.get(`/carts/?user_history=${user.id}`)
			setCarts(cartsResponse)
		}
	}

	async function handleCheckAdmin(){

		const decodedToken = jwt_decode(token)
        const isAdmin = decodedToken.role === "admin"
		setIsAdmin(isAdmin)

	}

	useEffect(()=>{

		handleCheckAdmin()
		fetchCarts()

	},[carts])


	return(
		
		<Container>
			<Header/>
			
			<Content>
				<h1>Histórico de pedidos</h1>

				<div className="mobile">
					{carts && carts.map(cart=>(
							<HistoryItem key={cart.id}
							cart={cart}
					/>
						))}
				</div>

				<table className="desktop">
					<thead>
						<tr>
							<th>Status</th>
							<th>Código</th>
							{isAdmin && <th>Usuário</th>}
							<th>Detalhes do pedido</th>
							<th>Valor total</th>
							<th>Data e hora</th>
						</tr>
					</thead> 

					<tbody>
						{carts && carts.map(cart=>(
							<HistoryTableRow key={cart.id}
							cart={cart}/>
						))}
					

					</tbody>
				
				</table>



			</Content>
			

			<Footer />
		</Container>
		
	)
}