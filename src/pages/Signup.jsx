import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";

import { auth, db, storage } from "../firebase.config.js";

import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import "../styles/login.css";

const Signup = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [file, setFile] = useState(null);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const signup = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);

			const user = await userCredential.user;

			const storageRef = ref(storage, `images/${Date.now() + username}`);
			const uploadTask = uploadBytesResumable(storageRef, file);

			uploadTask.on(
				(error) => {
					// Handle unsuccessful uploads
					console.log(error.message);
					toast.error(error.message);
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
						await updateProfile(user, {
							displayName: username,
							photoURL: downloadURL,
						});

						await setDoc(doc(db, "users", user.uid), {
							uid: user.uid,
							displayName: username,
							email,
							photoURL: downloadURL,
						});
					});
				}
			);

			setLoading(false);
			toast.success("Conta criada");
			navigate("/login");
		} catch (error) {
			setLoading(false);
			toast.error("Algo deu errado!");
		}
	};

	return (
		<Helmet title="Cadastrar">
			<section>
				<Container>
					<Row>
						{loading ? (
							<Col lg="12" className="text-center">
								<h5 className="fw-bold">Carregando.....</h5>
							</Col>
						) : (
							<Col lg="6" className="m-auto text-center">
								<h3 className="fw-bold mb-4">Cadastrar</h3>

								<Form className="auth__form" onSubmit={signup}>
									<FormGroup className="form__group">
										<input
											type="text"
											placeholder="Nome de usuário"
											value={username}
											onChange={(e) => setUsername(e.target.value)}
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
											type="password"
											placeholder="Senha"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
										/>
									</FormGroup>

									<FormGroup className="form__group">
										<input type="file" onChange={(e) => setFile(e.target.files[0])} />
									</FormGroup>

									<button type="submit" className="buy__btn auth__btn">
										Criar Conta
									</button>
									<p>
										Já tem uma conta? <Link to="/login">Login</Link>
									</p>
								</Form>
							</Col>
						)}
					</Row>
				</Container>
			</section>
		</Helmet>
	);
};

export default Signup;
