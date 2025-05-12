import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [credit, setCredit] = useState(0);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const navigate = useNavigate(); // ✅ Correct usage of useNavigate

    const loadCreditData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/credits`, {
                headers: { token }
            });

            if (data.success) {
                setCredit(data.credits);
                if (data.user) {
                    setUser(data.user);
                    console.log(data.user);
                }
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const generateImage = async (prompt) => {
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/image/generate-image`,
                { prompt },
                { headers: { token } } // ✅ Corrected headers
            );

            if (data.success) {
                loadCreditData();
                return data.resultImage;
            } else {
                toast.error(data.message);
                loadCreditData();
                if (data.creditBalance === 0) {
                    navigate('/buy');
                }
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);  
        setUser(null);   
    };

    useEffect(() => {
        if (token) {
            loadCreditData();
        } else {
            setUser(null);
        }
    }, [token]); 

    const value = {
        user, setUser,
        showLogin, setShowLogin,
        backendUrl, token, setToken,
        credit, setCredit, loadCreditData,
        logout, generateImage
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
