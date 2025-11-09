import "./App.css";
import {
	BanknoteArrowDown,
	Ellipsis,
	Factory,
	File,
	FilePenLine,
	Files,
	Import,
	LogOut,
	Menu,
	MoveDown,
	Plus,
	Printer,
	Search,
	Settings,
	Tag,
	TicketPercent,
	ToggleRight,
	UserRound,
	X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { useAuthAndTranslations } from "./AuthAndTranslationsContext";
import { API_BASE_URL } from "./config.js";

export default function Pricelist() {
	const { user, selectedLanguage, setSelectedLanguage, translations, logout } =
		useAuthAndTranslations();
	const [products, setProducts] = useState([]);

	const [isLanguageSwitcherDropdownOpen, setIsLanguageSwitcherDropdownOpen] =
		useState(false);

	useEffect(() => {
		const token = localStorage.getItem("authToken");

		fetch(`${API_BASE_URL}/products`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error("Failed to fetch products");
				}
				return res.json();
			})
			.then((data) => setProducts(data))
			.catch((error) => {
				console.error("Error fetching products:", error);
			});
	}, []);

	const handleLanguageSelect = (language) => {
		setSelectedLanguage(language);
		setIsLanguageSwitcherDropdownOpen(false);
	};

	if (!user) {
		return <Navigate to="/login" replace />;
	}

	if (!translations) {
		return null;
	}

	const updateValue = async (product, column, value) => {
		const token = localStorage.getItem("authToken");
		const response = await fetch(
			`${API_BASE_URL}/products/${product.id}`,
			{
				method: "PUT",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ [column]: value }),
			},
		);
		if (!response.ok) {
			throw new Error("Failed to update product");
		}
	};

	return (
		<div className="price-list-container">
			<header className="price-list-header">
				<Menu className="hamburger-icon price-list-hamburger-icon" />

				<div className="user-profile">
					<img
						src="https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
						alt="user profile"
						className="user-profile-image"
					/>
					<div className="user-info">
						<span>John Andre</span>
						<span className="user-info-second">Standford A5</span>
					</div>
				</div>

				{/* Language Dropdown */}
				{/* biome-ignore lint: ignore all rules for this li */}
				<div
					className="price-list-language-dropdown"
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

			<div className="price-list-body-container">
				<div className="price-list-sidebar">
					<p className="sidebar-menu-text">{translations.sidebar.menu}</p>

					<div className="sidebar-items">
						<div className="sidebar-item">
							<File />
							<span>{translations.sidebar.invoices}</span>
						</div>
						<div className="sidebar-item">
							<UserRound />
							<span>{translations.sidebar.customers}</span>
						</div>
						<div className="sidebar-item">
							<Settings />
							<span>{translations.sidebar.myBusiness}</span>
						</div>
						<div className="sidebar-item">
							<FilePenLine />
							<span>{translations.sidebar.invoiceJournal}</span>
						</div>
						<div className="sidebar-item active-item">
							<Tag />
							<span>{translations.sidebar.priceList}</span>
						</div>
						<div className="sidebar-item">
							<Files />
							<span>{translations.sidebar.multipleInvoicing}</span>
						</div>
						<div className="sidebar-item">
							<X />
							<span>{translations.sidebar.unpaidInvoices}</span>
						</div>
						<div className="sidebar-item">
							<TicketPercent />
							<span>{translations.sidebar.offer}</span>
						</div>
						<div className="sidebar-item">
							<Factory />
							<span>{translations.sidebar.inventoryControl}</span>
						</div>
						<div className="sidebar-item">
							<BanknoteArrowDown />
							<span>{translations.sidebar.memberInvoicing}</span>
						</div>
						<div className="sidebar-item">
							<Import />
							<span>{translations.sidebar.importExport}</span>
						</div>
						{/** biome-ignore lint: ignore all rules for this div */}
						<div className="sidebar-item" onClick={logout}>
							<LogOut />
							<span>{translations.sidebar.logOut}</span>
						</div>
					</div>
				</div>
				<div className="price-list-body">
					<div className="filter-and-button-container">
						<div className="filter-container">
							<div className="filter-input-container">
								<input
									name="articleNumber"
									type="text"
									placeholder={translations.pricelist.searchArticlePlaceholder}
									className="article-number-input"
								/>
								<Search className="search-icon" />
							</div>

							<div className="filter-input-container">
								<input
									name="product"
									type="text"
									placeholder={translations.pricelist.searchProductPlaceholder}
									className="product-input"
								/>
								<Search className="search-icon" />
							</div>
						</div>

						<div className="button-container">
							<button type="button" className="add-product">
								<span>{translations.pricelist.newProduct}</span>
								<Plus />
							</button>
							<button type="button" className="print">
								<span>{translations.pricelist.printList}</span>
								<Printer />
							</button>
							<button type="button" className="toggle">
								<span>{translations.pricelist.advancedMode}</span>
								<ToggleRight />
							</button>
						</div>
					</div>

					<table className="price-list-table">
						<thead>
							<tr>
								<th className="article-no-heading">
									<div>
										{translations.pricelist.articleNo}
										<MoveDown />
									</div>
								</th>
								<th className="product-or-service-heading">
									<div>
										{translations.pricelist.productOrService}
										<MoveDown />
									</div>
								</th>
								<th className="in-price-heading">
									{translations.pricelist.inPrice}
								</th>
								<th className="price-heading">
									{translations.pricelist.price}
								</th>
								<th className="unit-heading">{translations.pricelist.unit}</th>
								<th className="in-stock-heading">
									{translations.pricelist.inStock}
								</th>
								<th className="description-heading">
									{translations.pricelist.description}
								</th>
								<th className="actions-heading"></th>
							</tr>
						</thead>
						<tbody>
							{products.map((product) => (
								<tr key={product.id}>
									<td className="article-no-input">
										<input
											name="articleNo"
											type="text"
											defaultValue={product.articleNo}
											onBlur={(e) => {
												updateValue(product, "articleNo", e.target.value);
											}}
										/>
									</td>
									<td className="product-or-service-input">
										<input
											name="productName"
											type="text"
											defaultValue={product.name}
											onBlur={(e) => {
												updateValue(product, "name", e.target.value);
											}}
										/>
									</td>
									<td className="in-price-input">
										<input
											name="inPrice"
											type="number"
											defaultValue={product.inPrice}
											onBlur={(e) => {
												updateValue(product, "inPrice", e.target.value);
											}}
										/>
									</td>
									<td className="price-input">
										<input
											name="price"
											type="number"
											defaultValue={product.price}
											onBlur={(e) => {
												updateValue(product, "price", e.target.value);
											}}
										/>
									</td>
									<td className="unit-input">
										<input
											name="unit"
											type="text"
											defaultValue={product.unit}
											onBlur={(e) => {
												updateValue(product, "unit", e.target.value);
											}}
										/>
									</td>
									<td className="in-stock-input">
										<input
											name="inStock"
											type="number"
											defaultValue={product.inStock}
											onBlur={(e) => {
												updateValue(product, "inStock", e.target.value);
											}}
										/>
									</td>
									<td className="description-input">
										<input
											name="description"
											type="text"
											defaultValue={product.description}
											onBlur={(e) => {
												updateValue(product, "description", e.target.value);
											}}
										/>
									</td>
									<td className="actions-input">
										<Ellipsis />
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
