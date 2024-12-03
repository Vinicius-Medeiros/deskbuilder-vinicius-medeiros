import React from "react";
import "./footer.css";

import { Link } from "react-router-dom";
import { Col, Container, ListGroup, ListGroupItem, Row } from "reactstrap";

const Footer = () => {
	const year = new Date().getFullYear();
	return (
		<footer className="footer">
			<Container>
				<Row>
					<Col lg="4" md="6" className="mb-4">
						<div className="logo">
							<div>
								<h1 className="text-white">DeskBuilder</h1>
							</div>
						</div>
						<p className="footer__text mt-4">
							Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima culpa reiciendis similique
							ea nemo tempore accusantium quis doloribus libero inventore!
						</p>
					</Col>
					<Col lg="3" md="3" className="mb-4">
						<div className="footer__quick-links">
							<h4 className="quick__links-title">Principais categorias</h4>
							<ListGroup className="mb-3">
								<ListGroupItem className="ps-0 border-0">
									<Link to="#">Celulares</Link>
								</ListGroupItem>
								<ListGroupItem className="ps-0 border-0">
									<Link to="#">Sofás Modernos</Link>
								</ListGroupItem>
								<ListGroupItem className="ps-0 border-0">
									<Link to="#">Cadeiras de Braço</Link>
								</ListGroupItem>
								<ListGroupItem className="ps-0 border-0">
									<Link to="#">Relógios</Link>
								</ListGroupItem>
							</ListGroup>
						</div>
					</Col>
					<Col lg="2" md="3" className="mb-4">
						<div className="footer__quick-links">
							<h4 className="quick__links-title">Links Úteis</h4>
							<ListGroup className="mb-3">
								<ListGroupItem className="ps-0 border-0">
									<Link to="/shop">Loja</Link>
								</ListGroupItem>
								<ListGroupItem className="ps-0 border-0">
									<Link to="/cart">Carrinho</Link>
								</ListGroupItem>
								<ListGroupItem className="ps-0 border-0">
									<Link to="/login">Login</Link>
								</ListGroupItem>
								<ListGroupItem className="ps-0 border-0">
									<Link to="#">Política de Privacidade</Link>
								</ListGroupItem>
							</ListGroup>
						</div>
					</Col>
					<Col lg="3" md="4">
						<div className="footer__quick-links">
							<h4 className="quick__links-title">Contato</h4>
							<ListGroup className="footer__contact">
								<ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
									<span>
										<i class="ri-map-pin-line"></i>
									</span>
									<p>123 Rua do Joaozinho, Fortaleza, Brasil</p>
								</ListGroupItem>
								<ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
									<span>
										<i class="ri-phone-line"></i>
									</span>
									<p>+55 (085) 91234-5678</p>
								</ListGroupItem>
								<ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
									<span>
										<i class="ri-mail-line"></i>
									</span>
									<p>examplo123@gmail.com</p>
								</ListGroupItem>
							</ListGroup>
						</div>
					</Col>
					<Col lg="12">
						<p className="footer__copyright">
							Direitos Autorais {year} desenvolvido por Vinicius Alves Medeiros. Todos direitos
							reservados.
						</p>
					</Col>
				</Row>
			</Container>
		</footer>
	);
};

export default Footer;
