import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import AuthAPI from "./services/authAPI";
import AuthContext from "./contexts/AuthContext";
import jwtDecode from "jwt-decode";

// Import des components
import Navigation from "./components/Navigation";

// Import des pages
import HomePage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

// Framer Motion
import { AnimatePresence } from "framer-motion";

// Notifications
import { ToastContainer, toast } from "react-toastify";

// Fontawesome library
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fal } from "@fortawesome/pro-light-svg-icons";
import { fad } from "@fortawesome/pro-duotone-svg-icons";
import { far } from "@fortawesome/pro-regular-svg-icons";
import { UserContext } from "./contexts/UserContext";

console.log("Lancement de app.js");
library.add(fab, fas, fal, fad, far);

AuthAPI.setUp();

const App = () => {

    const token = window.localStorage.getItem("authToken");

	const [isAuthenticated, setIsAuthenticated] = useState(
		AuthAPI.isAuthenticated()
	);


	const location = useLocation();

    const [appUser, setAppUser] = useState({
        firstname: "",
        lastname: "",
		email: "",
		telephone: "",
        roles: [],
	});

    const [isAdmin, setIsAdmin] = useState(false);

	useEffect(() => {
        const fetchUser = async () => {
            if (token) {
                setAppUser(jwtDecode(token));
            }
        };
		fetchUser();
	}, [token]);

    useEffect(() => {
        if (appUser.roles) {
            if (appUser.roles.includes("ROLE_ADMIN")) {
                setIsAdmin(true);
            }
            else {
                setIsAdmin(false);
            }
        }
    }, []);

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated: isAuthenticated,
				setIsAuthenticated: setIsAuthenticated
			}}
		>
            <UserContext.Provider
                value={{
                    appUser: appUser,
                    setAppUser: setAppUser,
                }}
            >
                <Navigation />
                <AnimatePresence>
                    <Routes location={location} key={location.pathname}>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/" element={<HomePage />} />
                    </Routes>
                </AnimatePresence>
                <ToastContainer
                    position="bottom-center"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </UserContext.Provider>
		</AuthContext.Provider>
	);
};

export default App;