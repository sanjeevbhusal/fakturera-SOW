import { useEffect, useState } from "react";
import "./App.css";
import { Menu } from "lucide-react";
import { Navigate, useNavigate } from "react-router";
import { useAuth } from "./AuthContext";

export default function Login() {
	const { user } = useAuth();
	const [isLanguageSwitcherDropdownOpen, setIsLanguageSwitcherDropdownOpen] =
		useState(false);
	const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);
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
			if (
				isLanguageSwitcherDropdownOpen &&
				!event.target.closest("#language-dropdown")
			) {
				setIsLanguageSwitcherDropdownOpen(false);
			}
		};

		document.addEventListener("click", handleClickOutside);
		return () => document.removeEventListener("click", handleClickOutside);
	}, [isLanguageSwitcherDropdownOpen]);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (isHamburgerMenuOpen && !event.target.closest("#hamburger-menu")) {
				setIsHamburgerMenuOpen(false);
			}
		};

		document.addEventListener("click", handleClickOutside);
		return () => document.removeEventListener("click", handleClickOutside);
	}, [isHamburgerMenuOpen]);

	if (user) {
		return <Navigate to="/pricelist" replace />;
	}

	if (translations === null) {
		return null;
	}

	const handleLanguageSelect = (language) => {
		setSelectedLanguage(language);
		setIsLanguageSwitcherDropdownOpen(false);
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
						className="logo"
					/>

					<div className="hamburger-icon-container" id="hamburger-menu">
						<Menu
							className="hamburger-icon"
							onClick={() => setIsHamburgerMenuOpen(!isHamburgerMenuOpen)}
						/>
						{isHamburgerMenuOpen && (
							<div className="hamburger-menu-content">
								<ul className="nav-list">
									<li className="nav-list-item">
										<a href="https://www.123fakturera.se/index.html">
											{translations.navBar.home}
										</a>
									</li>
									<li className="nav-list-item">
										<a href="https://www.123fakturera.se/bestall.html">
											{translations.navBar.order}
										</a>
									</li>
									<li className="nav-list-item">
										<a href="https://www.123fakturera.se/kunder.html">
											{translations.navBar.ourCustomers}
										</a>
									</li>
									<li className="nav-list-item">
										<a href="https://www.123fakturera.se/omoss.html">
											{translations.navBar.aboutUs}
										</a>
									</li>
									<li className="nav-list-item">
										<a href="https://www.123fakturera.se/kontaktaoss.html">
											{translations.navBar.contactUs}
										</a>
									</li>
								</ul>
							</div>
						)}
					</div>

					<ul className="nav-list-big-screen">
						<li className="nav-list-item-big-screen">
							<a href="https://www.123fakturera.se/index.html">
								{translations.navBar.home}
							</a>
						</li>
						<li className="nav-list-item-big-screen">
							{translations.navBar.order}
						</li>
						<li className="nav-list-item-big-screen">
							{translations.navBar.ourCustomers}
						</li>
						<li className="nav-list-item-big-screen">
							{translations.navBar.aboutUs}
						</li>
						<li className="nav-list-item-big-screen">
							{translations.navBar.contactUs}
						</li>

						{/* Language Dropdown */}
						{/* biome-ignore lint: ignore all rules for this li */}
						<li
							className="nav-list-item-big-screen language-dropdown-big-screen"
							onClick={() =>
								setIsLanguageSwitcherDropdownOpen(
									!isLanguageSwitcherDropdownOpen,
								)
							}
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
								{isLanguageSwitcherDropdownOpen && (
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

					{/* Language Dropdown */}
					{/* biome-ignore lint: ignore all rules for this li */}
					<div
						className="language-dropdown"
						onClick={() =>
							setIsLanguageSwitcherDropdownOpen(!isLanguageSwitcherDropdownOpen)
						}
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
							{isLanguageSwitcherDropdownOpen && (
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
					</div>
				</header>
			</nav>

			{/* body */}

			<div className="login-card-container">
				<div className="login-card">
					<h1 className="login-text">{translations.login.loginText}</h1>

					<form onSubmit={handleSubmit} className="login-form">
						<div className="login-item">
							<p className="login-item-label">
								{translations.login.emailLabel}
							</p>
							<input
								name="email"
								type="email"
								required
								placeholder={translations.login.emailPlaceholder}
								className="login-item-input"
							/>
						</div>

						<div className="login-item">
							<p className="login-item-label">
								{translations.login.passwordLabel}
							</p>
							<div className="password-input">
								<input
									name="password"
									type={isPasswordVisible ? "text" : "password"}
									required
									placeholder={translations.login.passwordPlaceholder}
									className="login-item-input"
								/>
								{/* biome-ignore lint: ignore all rules for this div */}
								<img
									alt="eye"
									className="password-visible-toggle"
									src={
										isPasswordVisible
											? "/src/assets/hide_password.png"
											: "/src/assets/show_password.png"
									}
									onClick={() => setIsPasswordVisible(!isPasswordVisible)}
								/>
							</div>
						</div>

						<button type="submit" className="submit-button">
							{translations.login.loginText}
						</button>
					</form>

					<div className="register-container">
						<a
							href="https://online.123fakturera.se/register/"
							className="register-link"
						>
							{translations.login.registerText}
						</a>
						<a
							href="https://online.123fakturera.se/forgot-password/?email="
							className="forgot-password-link"
						>
							{translations.login.forgotPasswordText}
						</a>
					</div>
				</div>
			</div>

			{/* footer */}
			<div className="footer-wrapper">
				<footer className="footer">
					<p className="footer-text">123 Fakturera</p>
					<ul className="footer-list">
						<li className="footer-list-item">
							<a href="https://www.123fakturera.se/index.html">
								{translations.navBar.home}
							</a>
						</li>
						<li className="footer-list-item">
							<a href="https://www.123fakturera.se/bestall.html">
								{translations.navBar.order}
							</a>
						</li>
						<li className="footer-list-item">
							<a href="https://www.123fakturera.se/kontaktaoss.html">
								{translations.navBar.contactUs}
							</a>
						</li>
					</ul>
				</footer>
				<p>© Lättfaktura, CRO no. 638537, 2025. All rights reserved.</p>
			</div>
		</div>
	);
}
