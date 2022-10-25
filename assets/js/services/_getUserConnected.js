import { useEffect, useRef, useState, useContext } from "react";

import jwtDecode from "jwt-decode";
import GetUserAPI from "../services/getUserAPI";
import AuthContext from "../contexts/AuthContext";



function userConnected() {
	const abortController = useRef(new AbortController());

	const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

	const [userConnected, setUserConnected] = useState({});

	const token = window.localStorage.getItem("authToken");

	useEffect(() => {
		let isSubscribed = true;
		const fetchUserConnected = async () => {
			if (token) {
				const { id: id, username: username } = jwtDecode(token);
				try {
					const data = await GetUserAPI.find(id);
					// console.log("GetUserConnected : ", data);
					if (isSubscribed) {
						setUserConnected(data);
					}
				} catch (error) {
					console.log(
						"Erreurs : ",
						error.response
					);
					setIsAuthenticated(false);
				}
			}
		};

		fetchUserConnected();

		return () => (isSubscribed = false);
	}, []);

	return userConnected;
}

export default {
	userConnected: userConnected,
};
