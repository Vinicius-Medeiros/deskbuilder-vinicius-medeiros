import React, { useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./header.css";

import { motion } from "framer-motion";

import logo from "../../assets/images/eco-logo.png";
import userIcon from "../../assets/images/user-icon.png";

import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Container, Row } from "reactstrap";
import useAuth from "../../custom-hooks/useAuth";
import { auth } from "../../firebase.config";

const nav__links = [
	{
		path: "home",
		display: "Home",
	},
	{
		path: "shop",
		display: "Loja",
	},
	{
		path: "cart",
		display: "Carrinho",
	},
];

const Header = () => {
	const headerRef = useRef(null);
	const menuRef = useRef(null);
	const profileActionRef = useRef(null);
	const navigate = useNavigate();
	const { currentUser } = useAuth();

	const totalQuantity = useSelector((state) => state.cart.totalQuantity);

	const logout = () => {
		signOut(auth)
			.then(() => {
				toast.success("Deslogado");
				navigate("/home");
			})
			.catch((err) => {
				toast.error(err.message);
			});
	};

	const stickyHeaderFunc = () => {
		window.addEventListener("scroll", () => {
			if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
				headerRef.current.classList.add("sticky__header");
			} else {
				headerRef.current.classList.remove("sticky__header");
			}
		});
	};

	useEffect(() => {
		stickyHeaderFunc();

		return () => window.removeEventListener("scroll", stickyHeaderFunc);
	});

	const menuToggle = () => menuRef.current.classList.toggle("active__menu");

	const navigateTo = (page) => {
		navigate(`/${page}`);
	};

	const toggleProfileActions = () => profileActionRef.current.classList.toggle("show__profileActions");

	return (
		<header className="header" ref={headerRef}>
			<Container>
				<Row>
					<div className="nav__wrapper">
						<div className="logo" onClick={() => navigateTo("home")}>
							<img src={logo} alt="logo" />
							<div>
								<h1>DeskBuilder</h1>
							</div>
						</div>
						<div className="navigation" ref={menuRef} onClick={menuToggle}>
							<ul className="menu">
								{nav__links.map((item, index) => (
									<li className="nav__item" key={item.path + " " + index}>
										<NavLink
											to={item.path}
											className={(navClass) => (navClass.isActive ? "nav__active" : "")}
										>
											{item.display}
										</NavLink>
									</li>
								))}
							</ul>
						</div>
						<div className="nav__icons">
							<motion.span
								whileTap={{ scale: 1.2 }}
								className="fav__icon"
								onClick={() => navigateTo("favorites")}
							>
								<i class="ri-heart-line"></i>
								{totalQuantity > 0 && <span className="badge">{totalQuantity}</span>}
							</motion.span>
							<motion.span
								whileTap={{ scale: 1.2 }}
								className="community__icon"
								onClick={() => navigateTo("community")}
							>
								<i class="ri-global-line"></i>
								{totalQuantity > 0 && <span className="badge">{totalQuantity}</span>}
							</motion.span>
							<motion.span
								whileTap={{ scale: 1.2 }}
								className="cart__icon"
								onClick={() => navigateTo("cart")}
							>
								<i class="ri-shopping-bag-line"></i>
								{totalQuantity > 0 && <span className="badge">{totalQuantity}</span>}
							</motion.span>

							<div className="profile">
								<motion.img
									whileTap={{ scale: 1.2 }}
									src={currentUser && currentUser.photoURL ? currentUser.photoURL : userIcon}
									alt=""
									onClick={toggleProfileActions}
								/>

								<div className="profile__actions" ref={profileActionRef} onClick={toggleProfileActions}>
									{currentUser ? (
										<div className="d-flex flex-column">
											<span onClick={logout}>Sair</span>
											<span>
												<Link to="/dashboard">Dashboard</Link>
											</span>
										</div>
									) : (
										<div className=" d-flex align-items-center justify-content-center flex-column">
											<Link to="/signup">Cadastrar</Link>
											<Link to="/login">Login</Link>
											<Link to="/dashboard">Dashboard</Link>
										</div>
									)}
								</div>
							</div>

							<div className="mobile__menu">
								<span onClick={menuToggle}>
									<i class="ri-menu-line"></i>
								</span>
							</div>
						</div>
					</div>
				</Row>
			</Container>
		</header>
	);
};

export default Header;
