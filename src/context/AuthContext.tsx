import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import type { CarDetails } from "../utils/CarDetails";
import storage from "../utils/storage";

// Used `ngrok http https://localhost:7267 --host-header="localhost:7267"` to create a tunnel to localhost in ngrok

interface JwtPayload {
    exp?: number;
    [key: string]: any;
}

interface AuthProps {
    authState?: { token: string | null; authenticated: boolean | null };
    userInfo?: { carDetails: CarDetails | null; isLoaded: boolean | null };
    onRegister?: (email: string, password: string) => Promise<any>;
    onLogin?: (email: string, password: string) => Promise<any>;
    onLogout?: () => Promise<any>;
}

const TOKEN_KEY = 'my-jwt';
const USER_INFO_KEY = 'user-info';
export const API_URL = 'https://2608-62-176-70-230.ngrok-free.app/api';
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }: any) => {
    const [authState, setAuthState] = useState<{
        token: string | null;
        authenticated: boolean | null;
    }>({
        token: null,
        authenticated: null
    });

    const [userInfo, setUserInfo] = useState<{
        carDetails: CarDetails | null;
        isLoaded: boolean | null;
    }>({
        carDetails: null,
        isLoaded: null
    });

    useEffect(() => {
        const loadToken = () => {
            const token = storage.getItem(TOKEN_KEY);
            console.log(" ~ file: AuthContext.tsx:32 ~ loadToken ~ token:", token);

            if (token) {
                const decodedToken: JwtPayload = jwtDecode(token);
                const currentTime = Date.now() / 1000;

                if (decodedToken.exp! < currentTime) {
                    console.error("Session expired, please log in again.");
                    logout();
                }
                else {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                    setAuthState({
                        token,
                        authenticated: true
                    });
                }
            }
        };
        loadToken();

        const intervalId = setInterval(() => loadToken(), 60000);
        console.log("Disconnected");
        // Clean up interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const loadUser = () => {
            const user = storage.getItem(USER_INFO_KEY);

            if (user) {
                setUserInfo({
                    carDetails: JSON.parse(user) as CarDetails,
                    isLoaded: true
                });
            }
        };
        loadUser();
    }, []);

    const register = async (email: string, password: string) => {
        try {
            return await axios.post(`${API_URL}/signup`, { email, password });
        } catch (error) {
            return { error: true, msg: (error as any).response.data };
        }
    };

    const login = async (email: string, password: string) => {
        try {
            const result = await axios.post(`${API_URL}/login`, { email, password });

            setAuthState({
                token: result.data.token,
                authenticated: true
            });
            setUserInfo({
                carDetails: result.data.car,
                isLoaded: true
            });

            axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;

            storage.setItem(TOKEN_KEY, result.data.token);
            storage.setItem(USER_INFO_KEY, JSON.stringify(result.data.car));

            return result;
        } catch (error: any) {
            return { error: true, msg: (error as any).response.data };
        }
    };

    const logout = async () => {
        storage.removeItem(TOKEN_KEY);
        storage.removeItem(USER_INFO_KEY);

        axios.defaults.headers.common['Authorization'] = '';

        setAuthState({
            token: null,
            authenticated: false
        });

        setUserInfo({
            carDetails: null,
            isLoaded: false
        });
    };

    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        authState,
        userInfo
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
