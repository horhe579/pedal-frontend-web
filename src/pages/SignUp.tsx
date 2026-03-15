import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";

const SignUp = () => {
    const [formInput, setFormInput] = useState({
        email: "",
        password: "",
        repeatPassword: "",
    });

    const [formError, setFormError] = useState({
        email: "",
        password: "",
        repeatPassword: "",
    });

    const { onRegister, onLogin } = useAuth();
    const navigate = useNavigate();

    const handleUserInput = (name: string, value: string) => {
        setFormInput({
            ...formInput,
            [name]: value,
        });
    };

    const validateFormInput = () => {
        const inputError = {
            email: "",
            password: "",
            repeatPassword: "",
        };

        if (!formInput.email.includes("@")) {
            inputError.email = "Invalid email";
        }

        if (formInput.password.length < 6) {
            inputError.password = "Password must be at least 6 characters long";
        }

        if (formInput.password !== formInput.repeatPassword) {
            inputError.repeatPassword = "Passwords do not match";
        }

        setFormError(inputError);

        return inputError.email === "" && inputError.password === "" && inputError.repeatPassword === "";
    };

    const handleSignUp = async () => {
        if (!validateFormInput()) {
            return;
        }

        const result = await onRegister!(formInput.email, formInput.password);
        if (result && result.error) {
            setFormError({
                ...formError,
                email: result.msg || "Registration failed"
            });
        } else {
            // After successful registration, log in and navigate to Characteristics
            const loginResult = await onLogin!(formInput.email, formInput.password);
            if (loginResult && !loginResult.error) {
                navigate("/characteristics", { state: { email: formInput.email, password: formInput.password } });
            }
        }
    };

    return (
        <AuthLayout screenType="SignUp">
            <div className="max-w-md mx-auto px-8 pt-4">
                <h2 className="text-3xl text-black mb-8 font-racing">Create an account</h2>

                <div className="space-y-4">
                    <div>
                        <TextInput
                            label="email"
                            type="email"
                            value={formInput.email}
                            onChange={(text) => handleUserInput("email", text)}
                        />
                        {formError.email !== "" && (
                            <p className="text-red-600 text-sm mt-1 font-quicksand">{formError.email}</p>
                        )}
                    </div>

                    <div>
                        <TextInput
                            label="password"
                            type="password"
                            value={formInput.password}
                            onChange={(text) => handleUserInput("password", text)}
                        />
                        {formError.password !== "" && (
                            <p className="text-red-600 text-sm mt-1 font-quicksand">{formError.password}</p>
                        )}
                    </div>

                    <div>
                        <TextInput
                            label="repeat password"
                            type="password"
                            value={formInput.repeatPassword}
                            onChange={(text) => handleUserInput("repeatPassword", text)}
                        />
                        {formError.repeatPassword !== "" && (
                            <p className="text-red-600 text-sm mt-1 font-quicksand">{formError.repeatPassword}</p>
                        )}
                    </div>

                    <Button
                        className="mt-2"
                        text="Sign up"
                        onClick={handleSignUp}
                    />
                </div>

                <div className="mt-12 text-center">
                    <h3 className="text-xl text-black mb-4 font-racing">
                        Or sign up with:
                    </h3>
                    <div className="flex justify-center gap-4">
                        <img className="w-12 h-12 cursor-pointer hover:opacity-80 transition-opacity" src="/images/google-icon-logo.png" alt="Google" />
                        <img className="w-12 h-12 cursor-pointer hover:opacity-80 transition-opacity" src="/images/github-icon-logo.png" alt="GitHub" />
                        <img className="w-12 h-12 cursor-pointer hover:opacity-80 transition-opacity" src="/images/instagram-icon-logo.png" alt="Instagram" />
                    </div>
                </div>

                <div className="mt-8 mb-8 text-center">
                    <p className="text-base text-black font-quicksand mb-2">
                        Already have an account?
                    </p>
                    <button
                        onClick={() => navigate("/login")}
                        className="text-base text-black underline font-quicksand hover:text-pedal-pink transition-colors"
                    >
                        Sign in
                    </button>
                </div>
            </div>
        </AuthLayout>
    );
};

export default SignUp;
