import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const token = localStorage.getItem("authToken");
		if (!token) {
			setIsLoading(false);
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
				setIsLoading(false);
			}
		};

		fetchUser();
	}, []);

	const login = (token, userData) => {
		localStorage.setItem("authToken", token);
		setUser(userData);
	};

	const logout = () => {
		localStorage.removeItem("authToken");
		setUser(null);
	};

	if (isLoading) {
		return null;
	}

	const value = {
		user,
		login,
		logout,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
