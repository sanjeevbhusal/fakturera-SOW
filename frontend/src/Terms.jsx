import { useEffect, useState } from "react";
import "./App.css";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router";
import { useAuthAndTranslations } from "./AuthAndTranslationsContext";

export default function Terms() {
	const [isLanguageSwitcherDropdownOpen, setIsLanguageSwitcherDropdownOpen] =
		useState(false);
	const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);
	const { selectedLanguage, setSelectedLanguage, translations } =
		useAuthAndTranslations();
	const navigate = useNavigate();

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

	if (translations === null) {
		return null;
	}

	const handleLanguageSelect = (language) => {
		setSelectedLanguage(language);
		setIsLanguageSwitcherDropdownOpen(false);
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
													flag: "./sweden_flag.png",
													alt: "Swedish flag",
												})
											}
										>
											<span className="language-item-text">Svenska</span>
											<img
												src="./sweden_flag.png"
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
													flag: "./britain_flag.png",
													alt: "English flag",
												})
											}
										>
											<span className="language-item-text">English</span>
											<img
												src="./britain_flag.png"
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
												flag: "./sweden_flag.png",
												alt: "Swedish flag",
											})
										}
									>
										<span className="language-item-text">Svenska</span>
										<img
											src="./sweden_flag.png"
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
												flag: "./britain_flag.png",
												alt: "English flag",
											})
										}
									>
										<span className="language-item-text">English</span>
										<img
											src="./britain_flag.png"
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

				<button
					type="submit"
					className="submit-button"
					onClick={() => navigate("/login")}
				>
					{translations.terms.buttonText}
				</button>

				{/* <div className="terms-card-container"> */}
				<div className="terms-card">{translations.terms.content}</div>

				<button
					type="submit"
					className="submit-button terms-footer-button"
					onClick={() => navigate("/login")}
				>
					{translations.terms.buttonText}
				</button>

				{/* </div> */}
			</div>
		</div>
	);
}
