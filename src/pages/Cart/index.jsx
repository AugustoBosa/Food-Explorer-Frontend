import { Container, Content, OrdersList, PaymentSection,PayMethods, Item } from "./styles"

import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer"
import { Button } from "../../components/Button"

import QRCode from "../../assets/QRCode.svg"
import pixIcon from "../../assets/pix.svg"
import cardIcon from "../../assets/card.svg"
import clockIcon from "../../assets/clock.svg"
import checkIcon from "../../assets/check.svg"
import cutleryIcon from "../../assets/cutlery.svg"

import { useAuth } from "../../hooks/auth"
import { useState } from "react"
import { api } from "../../services/api"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export function Cart(){

	const{ user } = useAuth()
	const navigate = useNavigate()

	const [orders, setOrders]   = useState([])
	const [cart, setCart] = useState("")
	const [priceTotal, setpriceTotal] = useState(0)
	const [cardNumber, setCardNumber] = useState(0)
	const [cardValidDate, setCardValidDate] = useState("")
	const [cardCVC, setCardCVC] = useState(0)
	const [isButtonDisabled, setIsButtonDisabled] = useState(true)

	const formatPrice = new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' })

	function handleGoToPayment(){

		document.getElementById("paymentSection").classList.toggle("active")
		document.getElementById("ordersSection").classList.toggle("active")
		
	}

	async function fetchCart(){

		const {data:cartResponse} = await api.get(`/carts/?user_id=${user.id}`)
		setCart(cartResponse)
		
	}

	async function fetchOrders(){

	
		const {data:ordersResponse} = await api.get(`/orders?cart_id=${cart.id}`)
		if (!ordersResponse) {
			setOrders([])
		}else{
			setOrders(ordersResponse)
		}
	}

	function calculateTotalPrice(){
		let total = 0
		orders.map(order=>total=total+order.price*order.quantity)
		setpriceTotal(total) 
	}

	function handleTogglePayMethod(clickedTabID){
		event.stopPropagation()
		if(cart.status!="Aberto"){
			return
		}

		const isCurrent = document.getElementById(clickedTabID).classList
		if(isCurrent=="active"){
			return
		}else{
			document.getElementById("pixBtn").classList.toggle("active")
			document.getElementById("cardBtn").classList.toggle("active")

			document.getElementById("qrcode").classList.toggle("active")
			document.getElementById("cardInfo").classList.toggle("active")
		}
	}

	async function handleRemoveItem(itemID){

		const confirm = window.confirm("Você está certo disso?")
		if(confirm){
			await api.delete(`/orders/${itemID}`)
			alert("Item removido")
		}
	}

	async function handleAdvanceOrder(){
		if(orders.length==0){
			return
		}

		const currentStatus=cart.status

		if(currentStatus=="Aberto"){
			await api.put(`/carts/${cart.id}`,{status:"Pendente"})
			return
		}
		if(currentStatus=="Pendente"){
			await api.put(`/carts/${cart.id}`,{status:"Preparando"})
			return
		}
		if(currentStatus=="Preparando"){
			await api.put(`/carts/${cart.id}`,{status:"Entregando"})
			return
		}
		if(currentStatus=="Entregando"){
			await api.put(`/carts/${cart.id}`,{active:"false",status:"Finalizado"})
			alert("pedido encerrado, inicie um novo.")
			navigate("/")
			return
		}

	}

	useEffect(() => {
		const cardNumberRegex = /^[0-9]{16}$/;
		const cardValidDateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
		const cardCVCRegex = /^[0-9]{3,4}$/;

	
		const isCardNumberValid = cardNumberRegex.test(cardNumber);
		const isCardValidDateValid = cardValidDateRegex.test(cardValidDate);
		const isCardCVCValid = cardCVCRegex.test(cardCVC);

		console.log(isCardValidDateValid)
		
	
		if (!isCardNumberValid || !isCardValidDateValid || !isCardCVCValid) {
		  setIsButtonDisabled(true);
		} else {
		  setIsButtonDisabled(false);
		}
	  }, [cardNumber, cardValidDate, cardCVC]);
	
	
	useEffect(()=>{

		fetchCart()
		fetchOrders()
		calculateTotalPrice()

	},[cart])


	return(
		
		<Container>
			<Header />

			<Content>

				<OrdersList className="active" id="ordersSection">
					<h1>Meu pedido</h1>

					{orders.map(order=>(
						<Item key={order.id}>
							<img src={`${api.defaults.baseURL}/files/${order.image}`} alt="" />
							<div>
								<p> {order.quantity} x {order.name} <span> {formatPrice.format(order.quantity*order.price)}</span> </p>
								{order.removed_ingredients!="" && 
									<span>{order.removed_ingredients && (order.removed_ingredients).replaceAll(",",", ")}</span>
								}

								{cart.status=="Aberto" &&
									<button onClick={()=>handleRemoveItem(order.id)}> Excluir </button>
								}
								
							</div>
						</Item>
					))}

					<h2>Total: {formatPrice.format(priceTotal)}</h2>

					<Button 
						title="Avançar"
						className="mobile"
						onClick={handleGoToPayment}/>

				</OrdersList>

				<PaymentSection id="paymentSection">
					<h1>Pagamento</h1>

					<PayMethods>
						<nav>
							<button 
								onClick={(event)=>handleTogglePayMethod(event.target.id)}
								id="pixBtn" 
								className="active"
								>
								<img 
									onClick={()=>handleTogglePayMethod("pixBtn")}
									src={pixIcon} 
								 /> 
								PIX
							</button>

							<button 
								id="cardBtn"
								className=""
								onClick={(event)=>handleTogglePayMethod(event.target.id)}
								>
								<img 
									onClick={()=>handleTogglePayMethod("cardBtn")}
									src={cardIcon} 
								/>
								Crédito
							</button>
						</nav>

						{cart.status=="Aberto" && 
							<div>
							<img
								id="qrcode"
								src={QRCode} 
								alt="QRCode"
								className="active"
								onClick={handleAdvanceOrder}
								/>

							<form 
								id="cardInfo"
								className=""

							>
								<div>
									<label htmlFor="cardNumber">Número do Cartão</label>
									<input 	id="cardNumber"
											type="number"
											onChange={event=>setCardNumber(event.target.value)} 
											placeholder="1234567891234567"
									/>
								</div>

								<div>
									<div>
										<label htmlFor="cardValidDate">Validade</label>
										<input 	id="cardValidDate"
												type="text"
												onChange={event=>setCardValidDate(event.target.value)} 
												placeholder="mm/aa"
											/>
									</div>
										
									<div>
										<label htmlFor="cardCVC">CVC</label>
										<input	 id="cardCVC"
												type="number"	
												onChange={event=>setCardCVC(event.target.value)} 
												placeholder="1234"
										/>
									</div>

								</div>


								<Button
									title="Finalizar pagamento"
									onClick={handleAdvanceOrder}
									disabled={isButtonDisabled}
								/>

							</form>
							</div>
						}

						{cart.status=="Pendente" && 
							<div className="paymentProcess">
								<img
								src={clockIcon} 
								alt="Relógio"
								className="active"
								onClick={handleAdvanceOrder}

								/>

								<span>Aguardando a confirmação do pedido.</span>
							</div>
						}

						
						{cart.status=="Preparando" && 
							<div className="paymentProcess">
								<img
								src={checkIcon} 
								alt="Ok"
								className="active"
								onClick={handleAdvanceOrder}
								/>

								<span>Pedido confirmado! Estamos preparando...</span>
							</div>
						}

						{cart.status=="Entregando" && 
							<div className="paymentProcess">
								<img
								src={cutleryIcon} 
								alt="Garfo e Faca"
								className="active"
								onClick={handleAdvanceOrder}
								/>

								<span>Seu pedido está pronto e a caminho!</span>
							</div>
						}	

					</PayMethods>
				</PaymentSection>
			</Content>

			<Footer />

		</Container>
		
	)
}