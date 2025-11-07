import "./App.css";
import { Navigate } from "react-router";
import { useAuth } from "./AuthContext";

export default function Pricelist() {
	const { user } = useAuth();

	if (!user) {
		return <Navigate to="/login" replace />;
	}

	return (
		<div>
			<h1>Pricelist</h1>
		</div>
	);
}
