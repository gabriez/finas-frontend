import { createContext, useContext, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Layout from "../layouts/Layout";

const AuthContext = createContext();

export const useAuth = () => {
	return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        rol: '',
        endTime: 0,
        id: 0
    })

	return <AuthContext.Provider value={{setUserData, userData}}><Layout/></AuthContext.Provider>;
};

export default AuthProvider;
