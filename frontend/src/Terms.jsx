import { useEffect, useState } from "react";
import "./App.css";
import { Menu } from "lucide-react";
import { Navigate, useNavigate } from "react-router";
import { useAuth } from "./AuthContext";

export default function Terms() {
	const { user } = useAuth();
	const [isLanguageSwitcherDropdownOpen, setIsLanguageSwitcherDropdownOpen] =
		useState(false);
	const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);
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
		<div className="container">
			<div className="image-container">
				<img
					alt="Nature Background"
					src="https://storage.123fakturera.se/public/wallpapers/sverige43.jpg"
					className="image"
				/>
			</div>

			{/* navbar */}
			<nav>
				<header>
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
							<a href="https://www.123fakturera.se/bestall.html">
								{translations.navBar.order}
							</a>
						</li>
						<li className="nav-list-item-big-screen">
							<a href="https://www.123fakturera.se/kunder.html">
								{translations.navBar.ourCustomers}
							</a>
						</li>
						<li className="nav-list-item-big-screen">
							<a href="https://www.123fakturera.se/omoss.html">
								{translations.navBar.aboutUs}
							</a>
						</li>
						<li className="nav-list-item-big-screen">
							<a href="https://www.123fakturera.se/kontaktaoss.html">
								{translations.navBar.contactUs}
							</a>
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

							<div className="flag-container">
								<img
									src={selectedLanguage.flag}
									alt={selectedLanguage.alt}
									className="flag-image"
								/>
								{isLanguageSwitcherDropdownOpen && (
									<div className="language-dropdown-content">
										{/* biome-ignore lint: ignore all rules for this div */}
										<div
											className="language-item"
											onClick={() =>
												handleLanguageSelect({
													name: "Svenska",
													flag: "https://storage.123fakturere.no/public/flags/SE.png",
													alt: "Swedish flag",
												})
											}
										>
											<span className="language-item-text">Svenska</span>
											<img
												src="https://storage.123fakturere.no/public/flags/SE.png"
												alt="Swedish flag"
												className="flag-image-dropdown"
											/>
										</div>
										{/* biome-ignore lint: ignore all rules for this div */}
										<div
											className="language-item"
											onClick={() =>
												handleLanguageSelect({
													name: "English",
													flag: "https://storage.123fakturere.no/public/flags/GB.png",
													alt: "English flag",
												})
											}
										>
											<span className="language-item-text">English</span>
											<img
												src="https://storage.123fakturere.no/public/flags/GB.png"
												alt="English flag"
												className="flag-image-dropdown"
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

						<div className="flag-container">
							<img
								src={selectedLanguage.flag}
								alt={selectedLanguage.alt}
								className="flag-image"
							/>
							{isLanguageSwitcherDropdownOpen && (
								<div className="language-dropdown-content">
									{/* biome-ignore lint: ignore all rules for this div */}
									<div
										className="language-item"
										onClick={() =>
											handleLanguageSelect({
												name: "Svenska",
												flag: "https://storage.123fakturere.no/public/flags/SE.png",
												alt: "Swedish flag",
											})
										}
									>
										<span className="language-item-text">Svenska</span>
										<img
											src="https://storage.123fakturere.no/public/flags/SE.png"
											alt="Swedish flag"
											className="flag-image-dropdown"
										/>
									</div>
									{/* biome-ignore lint: ignore all rules for this div */}
									<div
										className="language-item"
										onClick={() =>
											handleLanguageSelect({
												name: "English",
												flag: "https://storage.123fakturere.no/public/flags/GB.png",
												alt: "English flag",
											})
										}
									>
										<span className="language-item-text">English</span>
										<img
											src="https://storage.123fakturere.no/public/flags/GB.png"
											alt="English flag"
											className="flag-image-dropdown"
										/>
									</div>
								</div>
							)}
						</div>
					</div>
				</header>
			</nav>

			{/* body */}

			<div className="terms-container">
				<h2 className="terms-title-text">{translations.terms.termsText}</h2>

				<button type="submit" className="submit-button">
					{translations.terms.buttonText}
				</button>

				{/* <div className="terms-card-container"> */}
				<div className="terms-card">{translations.terms.content}</div>

				<button type="submit" className="submit-button terms-footer-button">
					{translations.terms.buttonText}
				</button>

				{/* </div> */}
			</div>
		</div>
	);
}
