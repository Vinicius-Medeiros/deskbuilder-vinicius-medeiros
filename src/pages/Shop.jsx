import React, { useState } from "react";

import { Col, Container, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";

import "../styles/shop.css";

import products from "../assets/data/products";
import ProductsList from "../components/UI/ProductsList";
//import useGetData from "../custom-hooks/useGetData";

const Shop = () => {
	const [productsData, setProductsData] = useState(products);
	//const { data: products } = useGetData("products");
	const [notFoundTerm, setNotFoundTerm] = useState();

	const handleFilter = (e) => {
		const filterValue = e.target.value;
		const filteredProducts = products.filter((product) => product.category === filterValue);
		setProductsData(filteredProducts);
	};

	const handleSearch = (e) => {
		const searchTerm = e.target.value;

		const searchedProducts = products.filter((product) =>
			product.productName.toLowerCase().includes(searchTerm.toLowerCase())
		);

		if (searchedProducts.length === 0) {
			setNotFoundTerm(searchTerm);
		}
		setProductsData(searchedProducts);
	};

	return (
		<Helmet title="Loja">
			<CommonSection title="Produtos" />
			<section>
				<Container>
					<Row>
						<Col lg="3" md="6">
							<div className="filter__widget">
								<select onChange={handleFilter}>
									<option>Filtrar por Categoria</option>
									<option value="sofa">Sofá</option>
									<option value="mobile">Celular</option>
									<option value="chair">Cadeira</option>
									<option value="watch">Relógio</option>
									<option value="wireless">Sem Fio</option>
								</select>
							</div>
						</Col>
						<Col lg="3" md="6" className="text-end">
							<div className="filter__widget">
								<select>
									<option>Ordenar por</option>
									<option value="ascending">Crescente</option>
									<option value="descending">Decrescente</option>
								</select>
							</div>
						</Col>
						<Col lg="6" md="12">
							<div className="search__box">
								<input type="text" placeholder="Pesquisar......" onChange={handleSearch} />
								<span>
									<i class="ri-search-line"></i>
								</span>
							</div>
						</Col>
					</Row>
				</Container>
			</section>

			<section className="pt-0">
				<Container>
					<Row>
						{productsData.length === 0 ? (
							<h1 className="text-center fs-4">
								Nenhum produto foi encontrado! Baseado na pesquisa: "{notFoundTerm}"
							</h1>
						) : (
							<ProductsList data={productsData} />
						)}
					</Row>
				</Container>
			</section>
		</Helmet>
	);
};

export default Shop;
