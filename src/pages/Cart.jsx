import React from "react";
import { Col, Container, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import "../styles/cart.css";

import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../redux/slices/cartSlice";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../custom-hooks/useAuth";

const Cart = () => {
	const cartItems = useSelector((state) => state.cart.cartItems);
	const totalAmount = useSelector((state) => state.cart.totalAmount);

	const { currentUser } = useAuth();

	const navigateToLoginOrCheckout = () => {
		if (currentUser) {
			return "/checkout";
		} else {
			return "/login";
		}
	};

	const handleClickViewARObject = () => {
		if (window.AndroidInterface) {
			window.AndroidInterface.onButtonClick("Visualização AR iniciada!");
		}
	};

	return (
		<Helmet title="Carrinho">
			<CommonSection title="Carrinho de Compras" />
			<section>
				<Container>
					<Row>
						<Col lg="9">
							{cartItems.length === 0 ? (
								<h2 className="fs-4 text-center">Nenhum item adicionado ao carrinho ainda...</h2>
							) : (
								<table className="table bordered">
									<thead>
										<tr>
											<th>Imagem</th>
											<th>Título</th>
											<th>Preço</th>
											<th>Quantidade</th>
											<th>Excluir</th>
										</tr>
									</thead>

									<tbody>
										{cartItems.map((item, index) => (
											<Tr item={item} key={index} />
										))}
									</tbody>
								</table>
							)}
						</Col>

						<Col lg="3">
							<div>
								<h6 className="d-flex align-items-center justify-content-between ">
									Subtotal
									<span className="fs-4 fw-bold">R${totalAmount}</span>
								</h6>
							</div>
							<p className="fs-6 mt-2">Taxas e envio serão calculados no momento de pagamento.</p>
							<div>
								<button className="buy__btn w-100 ">
									<Link to={navigateToLoginOrCheckout()}>Pagar</Link>
								</button>
								<button className="buy__btn w-100 mt-3">
									<Link to="/shop">Continuar Comprando</Link>
								</button>
								<button
									className="buy__btn w-100 d-flex justify-content-center gap-2"
									onClick={handleClickViewARObject}
								>
									Visualizar Items
									<i class="ri-eye-line"></i>
								</button>
							</div>
						</Col>
					</Row>
				</Container>
			</section>
		</Helmet>
	);
};

const Tr = ({ item }) => {
	const dispatch = useDispatch();

	const deleteProduct = () => {
		dispatch(cartActions.deleteItem(item.id));
		toast.success("Item removido do seu carrinho.");
	};

	return (
		<tr>
			<td>
				<img src={item.imgUrl} alt="" />
			</td>
			<td>{item.productName}</td>
			<td>${item.price}</td>
			<td>{item.quantity}x</td>
			<td>
				<motion.i whileTap={{ scale: 1.2 }} onClick={deleteProduct} class="ri-delete-bin-line"></motion.i>
			</td>
		</tr>
	);
};

export default Cart;
