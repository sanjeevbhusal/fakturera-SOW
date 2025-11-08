import "./App.css";
import { Navigate } from "react-router";
import { useAuthAndTranslations } from "./AuthAndTranslationsContext";

export default function App() {
	const { user } = useAuthAndTranslations();

	if (user) {
		return <Navigate to="/pricelist" replace />;
	} else {
		return <Navigate to="/login" replace />;
	}
}
