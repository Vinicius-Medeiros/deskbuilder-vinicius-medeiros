import React, { useEffect, useState } from "react";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../custom-hooks/useAuth";
import { cartActions } from "../redux/slices/cartSlice";
import "../styles/checkout.css";

const Checkout = () => {
	const { currentUser } = useAuth();

	const [nome, setNome] = useState();
	const [email, setEmail] = useState();
	const [telefone, setTelefone] = useState();
	const [logradouro, setLogradouro] = useState();
	const [bairro, setBairro] = useState();
	const [cidade, setCidade] = useState();
	const [cep, setCep] = useState();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const totalQty = useSelector((state) => state.cart.totalQuantity);
	const totalAmount = useSelector((state) => state.cart.totalAmount);

	const handlePlaceOrder = () => {
		if (!nome || !email || !telefone || !logradouro || !bairro || !cidade || !cep) {
			toast.error("Por favor, preencha todos os campos antes de fazer o pedido.");
			return;
		}

		toast.success("Pedido feito com sucesso");
		dispatch(cartActions.deleteAllItems());
		navigate("/home");
	};

	useEffect(() => {
		if (currentUser) {
			setEmail(currentUser.email);
		}
	}, [currentUser]);

	return (
		<Helmet title="Pagamento">
			<CommonSection title="Pagamento" />
			<section>
				<Container>
					<Row>
						<Col lg="8">
							<h6 className="mb-4 fw-bold">Informação de Entrega</h6>
							<Form className="billing__form">
								<FormGroup className="form__group">
									<input
										type="text"
										placeholder="Nome Completo"
										value={nome}
										onChange={(e) => setNome(e.target.value)}
									/>
								</FormGroup>

								<FormGroup className="form__group">
									<input
										type="email"
										placeholder="E-mail"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</FormGroup>

								<FormGroup className="form__group">
									<input
										type="number"
										placeholder="Telefone celular"
										value={telefone}
										onChange={(e) => setTelefone(e.target.value)}
									/>
								</FormGroup>

								<FormGroup className="form__group">
									<input
										type="text"
										placeholder="Logradouro"
										value={logradouro}
										onChange={(e) => setLogradouro(e.target.value)}
									/>
								</FormGroup>

								<FormGroup className="form__group">
									<input
										type="text"
										placeholder="Bairro"
										value={bairro}
										onChange={(e) => setBairro(e.target.value)}
									/>
								</FormGroup>

								<FormGroup className="form__group">
									<input
										type="text"
										placeholder="Cidade"
										value={cidade}
										onChange={(e) => setCidade(e.target.value)}
									/>
								</FormGroup>

								<FormGroup className="form__group">
									<input
										type="text"
										placeholder="CEP"
										value={cep}
										onChange={(e) => setCep(e.target.value)}
									/>
								</FormGroup>
							</Form>
						</Col>

						<Col lg="4">
							<div className="checkout__cart">
								<h6>
									Quantidade total: <span>{totalQty} items</span>
								</h6>
								<h6>
									Subtotal: <span>${totalAmount}</span>
								</h6>
								<h6>
									<span>
										Frete: <br />
										Frete Grátis
									</span>
									<span>$0</span>
								</h6>

								<h4>
									Preço total: <span>${totalAmount}</span>
								</h4>
								<button className="buy__btn auth__btn w-100" onClick={handlePlaceOrder}>
									Faça seu pedido
								</button>
							</div>
						</Col>
					</Row>
				</Container>
			</section>
		</Helmet>
	);
};

export default Checkout;
