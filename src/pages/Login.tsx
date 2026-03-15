import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { onLogin } = useAuth();
    const navigate = useNavigate();

    const handleEmailChange = (text: string) => {
        setEmail(text);
    };

    const handlePasswordChange = (text: string) => {
        setPassword(text);
    };

    const login = async () => {
        setError("");
        const result = await onLogin!(email, password);
        if (result && result.error) {
            setError(result.msg || "Login failed");
        } else {
            navigate("/profile");
        }
    };

    return (
        <AuthLayout screenType="Login">
            <div className="max-w-md mx-auto px-8 pt-4">
                <h2 className="text-3xl text-black mb-8 font-racing">Log in</h2>

                <div className="space-y-4">
                    <TextInput
                        label="email"
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <TextInput
                        label="password"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />

                    {error && (
                        <p className="text-red-600 text-sm font-quicksand">{error}</p>
                    )}

                    <Button
                        className="mt-2"
                        text="Log in"
                        onClick={login}
                    />
                </div>

                <div className="mt-16 text-center">
                    <h3 className="text-xl text-black mb-4 font-racing">
                        Log in with:
                    </h3>
                    <div className="flex justify-center gap-4">
                        <img className="w-12 h-12 cursor-pointer hover:opacity-80 transition-opacity" src="/images/google-icon-logo.png" alt="Google" />
                        <img className="w-12 h-12 cursor-pointer hover:opacity-80 transition-opacity" src="/images/github-icon-logo.png" alt="GitHub" />
                        <img className="w-12 h-12 cursor-pointer hover:opacity-80 transition-opacity" src="/images/instagram-icon-logo.png" alt="Instagram" />
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-base text-black font-quicksand mb-2">
                        Don't have an account yet?
                    </p>
                    <button
                        onClick={() => navigate("/signup")}
                        className="text-base text-black underline font-quicksand hover:text-pedal-pink transition-colors"
                    >
                        Sign up
                    </button>
                </div>
            </div>
        </AuthLayout>
    );
};

export default Login;
