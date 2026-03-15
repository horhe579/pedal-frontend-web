import React from "react";
import HeaderLayout from "./HeaderLayout";

interface LayoutProps {
    children: React.ReactNode;
    screenType: "Login" | "SignUp";
}

const AuthLayout: React.FC<LayoutProps> = ({ children, screenType }) => {
    const imageSource = screenType === "Login"
        ? '/images/2redcars_signup.jpg'
        : '/images/2redcars_login.jpg';

    const imageStyles = screenType === "Login"
        ? 'right-0'
        : 'left-0';

    return (
        <HeaderLayout>
            <div className="relative min-h-screen overflow-hidden bg-white">
                {/* Background car image */}
                <img
                    className={`absolute top-0 ${imageStyles} object-cover w-auto h-64 md:h-96 opacity-90 z-0`}
                    src={imageSource}
                    alt="Background"
                />
                {/* Vector overlay */}
                <img
                    className="absolute top-40 md:top-60 w-full z-10 pointer-events-none"
                    src="/vectors/Rectangle4.png"
                    alt="Overlay"
                />
                {/* Content */}
                <div className="relative z-20 pt-64 md:pt-80 pb-12">
                    {children}
                </div>
            </div>
        </HeaderLayout>
    );
};

export default AuthLayout;
