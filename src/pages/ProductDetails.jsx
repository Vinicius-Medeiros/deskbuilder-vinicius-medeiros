import React, { useEffect, useRef, useState } from "react";

import { cartActions } from "../redux/slices/cartSlice";

import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Col, Container, Row } from "reactstrap";
import products from "../assets/data/products";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import ProductsList from "../components/UI/ProductsList";
import "../styles/product-details.css";

const ProductDetails = () => {
	const reviewUser = useRef("");
	const reviewMsg = useRef("");
	const dispatch = useDispatch();

	const [tab, setTab] = useState("desc");
	const [rating, setRating] = useState(null);
	const { id } = useParams();
	const product = products.find((p) => p.id === id);

	const { imgUrl, productName, price, avgRating, reviews, description, shortDesc, category } = product;

	const relatedProducts = products.filter((item) => item.category === category);

	const submitHandler = (e) => {
		e.preventDefault();

		const reviewUserName = reviewUser.current.value;
		const reviewUserMsg = reviewMsg.current.value;

		const reviewObj = {
			userName: reviewUserName,
			text: reviewUserMsg,
			rating,
		};

		console.log(reviewObj);
		toast.success("Avaliação submetida!");
	};

	const addToCart = () => {
		dispatch(
			cartActions.addItem({
				id,
				image: imgUrl,
				productName,
				price,
			})
		);

		toast.success("Produto adicionado com sucesso!");
	};

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [product]);

	return (
		<Helmet title={productName}>
			<CommonSection title={productName} />

			<section className="pt-0">
				<Container>
					<Row>
						<Col lg="6">
							<img src={imgUrl} alt="" />
						</Col>
						<Col lg="6">
							<div className="product__details">
								<h2>{productName}</h2>
								<div className="product__rating d-flex align-items-center gap-5 mb-3">
									<div>
										<span>
											<i class="ri-star-s-fill"></i>
										</span>
										<span>
											<i class="ri-star-s-fill"></i>
										</span>
										<span>
											<i class="ri-star-s-fill"></i>
										</span>
										<span>
											<i class="ri-star-s-fill"></i>
										</span>
										<span>
											<i class="ri-star-half-s-line"></i>
										</span>
									</div>

									<p>
										(<span>{avgRating}</span> Avaliação)
									</p>
								</div>

								<div className="d-flex align-items-center gap-5">
									<span className="product__price">R${price}</span>
									<span>Categoria: {category}</span>
								</div>
								<p className="mt-3">{shortDesc}</p>

								<motion.button whileTap={{ scale: 1.2 }} className="buy__btn" onClick={addToCart}>
									Adicionar ao Carrinho
								</motion.button>
							</div>
						</Col>
					</Row>
				</Container>
			</section>

			<section>
				<Container>
					<Row>
						<Col lg="12">
							<div className="tab__wrapper d-flex align-items-center gap-5">
								<h6 className={`${tab === "desc" ? "active__tab" : ""}`} onClick={() => setTab("desc")}>
									Descrição
								</h6>
								<h6 className={`${tab === "rev" ? "active__tab" : ""}`} onClick={() => setTab("rev")}>
									Avaliações ({reviews.length})
								</h6>
							</div>
							{tab === "desc" ? (
								<div className="tab__content mt-5">
									<p>{description}</p>
								</div>
							) : (
								<div className="product__review mt-5">
									<div className="review__wrapper">
										<ul>
											{reviews?.map((review, index) => (
												<li key={index} className="mb-4">
													<h6>Vinicius Medeiros</h6>
													<span>{review.rating} (Avaliação)</span>
													<p>{review.text}</p>
												</li>
											))}
										</ul>

										<div className="review__form">
											<h4>Compartilhe sua experiência</h4>
											<form action="" onSubmit={submitHandler}>
												<div className="form__group">
													<input
														type="text"
														placeholder="Digite o nome"
														ref={reviewUser}
														required
													/>
												</div>

												<div className="form__group d-flex align-items-center gap-5 rating__group">
													<motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(1)}>
														1<i class="ri-star-s-fill"></i>
													</motion.span>
													<motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(2)}>
														2<i class="ri-star-s-fill"></i>
													</motion.span>
													<motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(3)}>
														3<i class="ri-star-s-fill"></i>
													</motion.span>
													<motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(4)}>
														4<i class="ri-star-s-fill"></i>
													</motion.span>
													<motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(5)}>
														5<i class="ri-star-s-fill"></i>
													</motion.span>
												</div>

												<div className="form__group">
													<textarea
														ref={reviewMsg}
														rows={4}
														type="text"
														placeholder="Review Message..."
														required
													/>
												</div>

												<motion.button
													whileTap={{ scale: 1.2 }}
													type="submit"
													className="buy__btn"
												>
													Submeter
												</motion.button>
											</form>
										</div>
									</div>
								</div>
							)}
						</Col>

						<Col lg="12" className="mt-5">
							<h2 className="related__title">Você também pode gostar!</h2>
						</Col>

						<ProductsList data={relatedProducts} />
					</Row>
				</Container>
			</section>
		</Helmet>
	);
};

export default ProductDetails;
