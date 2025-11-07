import { useEffect, useState } from "react";
import "./App.css";
import { Navigate, useNavigate } from "react-router";
import { useAuth } from "./AuthContext";

export default function Login() {
	const { user } = useAuth();
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [translations, setTranslations] = useState(null);
	const [selectedLanguage, setSelectedLanguage] = useState({
		name: "Svenska",
		flag: "https://storage.123fakturere.no/public/flags/SE.png",
		alt: "Swedish flag",
	});
	const navigate = useNavigate();
	const { login } = useAuth();

	useEffect(() => {
		const fetchTranslations = () => {
			fetch(
				`http://localhost:3000/translations?language=${selectedLanguage.name.toLowerCase()}`,
			)
				.then((response) => response.json())
				.then((data) => {
					setTranslations(data);
				})
				.catch((error) => {
					console.error("Error fetching translations:", error);
				});
		};

		fetchTranslations();
	}, [selectedLanguage]);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (isDropdownOpen && !event.target.closest("#language-dropdown")) {
				setIsDropdownOpen(false);
			}
		};

		document.addEventListener("click", handleClickOutside);
		return () => document.removeEventListener("click", handleClickOutside);
	}, [isDropdownOpen]);

	if (user) {
		return <Navigate to="/pricelist" replace />;
	}

	if (translations === null) {
		return null;
	}

	const handleLanguageSelect = (language) => {
		setSelectedLanguage(language);
		setIsDropdownOpen(false);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const email = e.target.email.value;
		const password = e.target.password.value;

		fetch("http://localhost:3000/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				return response.json();
			})
			.then((data) => {
				// Use auth context to handle login
				login(data.token, data.user);
				// redirect to pricelist page
				navigate("/pricelist");
			})
			.catch(() => {
				alert("Invalid credentials");
			});
	};

	return (
		<div style={{ height: "100vh", width: "100vw" }}>
			<div
				style={{
					position: "fixed",
					height: "100vh",
					width: "100vw",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					zIndex: -1,
				}}
			>
				<img
					alt="Nature Background"
					src="https://storage.123fakturera.se/public/wallpapers/sverige43.jpg"
					style={{
						height: "100%",
						width: "100%",
					}}
				/>
			</div>

			{/* navbar */}
			<nav style={{ paddingTop: "2.5rem" }}>
				<header
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						width: "75%",
						margin: "auto",
					}}
				>
					<img
						src="https://storage.123fakturera.se/public/icons/diamond.png"
						alt="logo"
						style={{ height: "2rem" }}
					/>
					<ul
						style={{
							display: "flex",
							alignItems: "center",
							gap: "60px",
							margin: "0",
						}}
					>
						<li
							style={{
								fontWeight: 500,
								cursor: "pointer",
								listStyle: "none",
							}}
						>
							{translations.navBar.home}
						</li>
						<li
							style={{
								cursor: "pointer",
								fontWeight: 500,
								listStyle: "none",
							}}
						>
							{translations.navBar.order}
						</li>
						<li
							style={{
								cursor: "pointer",
								fontWeight: 500,
								listStyle: "none",
							}}
						>
							{translations.navBar.ourCustomers}
						</li>
						<li
							style={{
								cursor: "pointer",
								fontWeight: 500,
								listStyle: "none",
							}}
						>
							{translations.navBar.aboutUs}
						</li>
						<li
							style={{
								cursor: "pointer",
								fontWeight: 500,
								listStyle: "none",
							}}
						>
							{translations.navBar.contactUs}
						</li>

						{/* Language Dropdown */}
						{/* biome-ignore lint: ignore all rules for this li */}
						<li
							style={{
								cursor: "pointer",
								fontWeight: 500,
								listStyle: "none",
								display: "flex",
								alignItems: "center",
								gap: "16px",
							}}
							onClick={() => setIsDropdownOpen(!isDropdownOpen)}
							id="language-dropdown"
						>
							{selectedLanguage.name}

							<div
								style={{
									cursor: "pointer",
									width: "26px",
									height: "18px",
									position: "relative",
								}}
							>
								<img
									src={selectedLanguage.flag}
									alt={selectedLanguage.alt}
									style={{
										width: "100%",
										height: "100%",
										borderRadius: "20%",
									}}
								/>
								{isDropdownOpen && (
									<div
										style={{
											position: "absolute",
											top: "28px",
											right: "-6px",
											borderRadius: "5px",
											padding: "8px 0px",
											backgroundColor: "white",
											boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
											zIndex: 1000,
										}}
									>
										{/* biome-ignore lint: ignore all rules for this div */}
										<div
											style={{
												display: "flex",
												alignItems: "center",
												justifyContent: "space-between",
												gap: "16px",
												padding: "8px 16px",
												cursor: "pointer",
											}}
											onClick={() =>
												handleLanguageSelect({
													name: "Svenska",
													flag: "https://storage.123fakturere.no/public/flags/SE.png",
													alt: "Swedish flag",
												})
											}
										>
											<span style={{ color: "black" }}>Svenska</span>
											<img
												src="https://storage.123fakturere.no/public/flags/SE.png"
												alt="Swedish flag"
												style={{
													width: "26px",
													height: "18px",
													cursor: "pointer",
													borderRadius: "20%",
												}}
											/>
										</div>
										{/* biome-ignore lint: ignore all rules for this div */}
										<div
											style={{
												display: "flex",
												alignItems: "center",
												justifyContent: "space-between",
												gap: "16px",
												padding: "8px 16px",
												cursor: "pointer",
											}}
											onClick={() =>
												handleLanguageSelect({
													name: "English",
													flag: "https://storage.123fakturere.no/public/flags/GB.png",
													alt: "English flag",
												})
											}
										>
											<span style={{ color: "black" }}>English</span>
											<img
												src="https://storage.123fakturere.no/public/flags/GB.png"
												alt="English flag"
												style={{
													width: "26px",
													height: "18px",
													cursor: "pointer",
													borderRadius: "20%",
												}}
											/>
										</div>
									</div>
								)}
							</div>
						</li>
					</ul>
				</header>
			</nav>

			{/* body */}

			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "fit-content",
					marginTop: "100px",
				}}
			>
				<div
					style={{
						backgroundColor: "white",
						color: "black",
						padding: "24px 12px 40px 12px",
						borderRadius: "40px",
						width: "540px",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<h1
						style={{
							fontWeight: "bold",
							color: "red",
							margin: 0,
							fontSize: "2.5rem",
						}}
					>
						{translations.login.loginText}
					</h1>

					<form
						onSubmit={handleSubmit}
						style={{
							width: "100%",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<div
							style={{
								width: "80%",
								display: "flex",
								flexDirection: "column",
								gap: "0.2rem",
								marginTop: "1rem",
							}}
						>
							<p style={{ margin: "0" }}>{translations.login.emailLabel}</p>
							<input
								name="email"
								type="email"
								required
								placeholder={translations.login.emailPlaceholder}
								style={{
									background: "white",
									color: "black",
									borderRadius: "1.5rem",
									padding: "0 1rem",
									height: "42px",
									fontSize: "16px",
								}}
							/>
						</div>

						<div
							style={{
								width: "80%",
								display: "flex",
								flexDirection: "column",
								gap: "0.2rem",
								marginTop: "1rem",
							}}
						>
							<p style={{ margin: "0" }}>{translations.login.passwordLabel}</p>
							<div style={{ position: "relative", width: "100%" }}>
								<input
									name="password"
									type={isPasswordVisible ? "text" : "password"}
									required
									placeholder={translations.login.passwordPlaceholder}
									style={{
										background: "white",
										color: "black",
										borderRadius: "1.5rem",
										padding: "0 1rem",
										height: "42px",
										width: "100%",
										fontSize: "16px",
									}}
								/>
								{/* biome-ignore lint: ignore all rules for this div */}
								<img
									alt="eye"
									style={{
										position: "absolute",
										width: "18px",
										height: "18px",
										cursor: "pointer",
										top: "50%",
										right: "1rem",
										transform: "translateY(-50%)",
									}}
									src={
										isPasswordVisible
											? "/src/assets/hide_password.png"
											: "/src/assets/show_password.png"
									}
									onClick={() => setIsPasswordVisible(!isPasswordVisible)}
								/>
							</div>
						</div>

						<button
							type="submit"
							style={{
								backgroundColor: "#07a31f",
								color: "white",
								borderRadius: "32px",
								marginTop: "1rem",
								width: "270px",
								height: "53px",
								fontSize: "16px",
							}}
						>
							{translations.login.loginText}
						</button>
					</form>

					<div
						style={{
							marginTop: "1rem",
							display: "flex",
							width: "400px",
							justifyContent: "space-between",
						}}
					>
						<a
							href="https://online.123fakturera.se/register/"
							style={{ color: "black" }}
						>
							{translations.login.registerText}
						</a>
						<a
							href="https://online.123fakturera.se/forgot-password/?email="
							style={{ color: "black" }}
						>
							{translations.login.forgotPasswordText}
						</a>
					</div>
				</div>
			</div>

			{/* footer */}
			<footer
				style={{
					paddingTop: "6rem",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						width: "85%",
						padding: "0px 16px 10px 16px",
						margin: "auto",
						borderBottom: "1px solid white",
					}}
				>
					<p style={{ fontSize: "32px", margin: "0" }}>123 Fakturera</p>
					<ul
						style={{
							display: "flex",
							alignItems: "center",
							gap: "60px",
							margin: "0",
						}}
					>
						<li
							style={{
								fontWeight: 500,
								cursor: "pointer",
								listStyle: "none",
							}}
						>
							{translations.navBar.home}
						</li>
						<li
							style={{
								cursor: "pointer",
								fontWeight: 500,
								listStyle: "none",
							}}
						>
							{translations.navBar.order}
						</li>
						<li
							style={{
								cursor: "pointer",
								fontWeight: 500,
								listStyle: "none",
							}}
						>
							{translations.navBar.contactUs}
						</li>
					</ul>
				</div>
				<p>© Lättfaktura, CRO no. 638537, 2025. All rights reserved.</p>
			</footer>
		</div>
	);
}
