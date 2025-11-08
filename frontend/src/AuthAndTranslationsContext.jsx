import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuthAndTranslations = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error(
			"useAuthAndTranslations must be used within an AuthAndTranslationsProvider",
		);
	}
	return context;
};

const languageCache = {};

export const AuthAndTranslationsProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isFetchingUserInfo, setIsFetchingUserInfo] = useState(true);
	const [selectedLanguage, setSelectedLanguage] = useState({
		name: "Svenska",
		flag: "https://storage.123fakturere.no/public/flags/SE.png",
		alt: "Swedish flag",
	});
	const [translations, setTranslations] = useState(null);
	const [isFetchingTranslations, setIsFetchingTranslations] = useState(true);

	useEffect(() => {
		const token = localStorage.getItem("authToken");
		if (!token) {
			setIsFetchingUserInfo(false);
			return;
		}

		const fetchUser = async () => {
			try {
				const response = await fetch("http://localhost:3000/validate-token", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ token }),
				});

				if (!response.ok) {
					throw new Error("Invalid token");
				}

				// set user data
				const userData = await response.json();
				setUser(userData);
			} catch (error) {
				console.error("Error fetching user data:", error);
				localStorage.removeItem("authToken");
			} finally {
				setIsFetchingUserInfo(false);
			}
		};

		fetchUser();
	}, []);

	useEffect(() => {
		const fetchTranslations = async () => {
			try {
				const response = await fetch(
					`http://localhost:3000/translations?language=${selectedLanguage.name.toLowerCase()}`,
				);
				if (!response.ok) {
					throw new Error("Failed to fetch translations");
				}
				const translations = await response.json();
				setTranslations(translations);
				languageCache[selectedLanguage.name] = translations;
			} catch (error) {
				console.error("Error fetching translations:", error);
			} finally {
				setIsFetchingTranslations(false);
			}
		};

		if (languageCache[selectedLanguage.name]) {
			setTranslations(languageCache[selectedLanguage.name]);
			setIsFetchingTranslations(false);
			return;
		} else {
			fetchTranslations();
		}
	}, [selectedLanguage]);

	const login = (token, userData) => {
		localStorage.setItem("authToken", token);
		setUser(userData);
	};

	const logout = () => {
		localStorage.removeItem("authToken");
		setUser(null);
	};

	if (isFetchingUserInfo || isFetchingTranslations) {
		return null;
	}

	const value = {
		user,
		selectedLanguage,
		setSelectedLanguage,
		translations,
		login,
		logout,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
