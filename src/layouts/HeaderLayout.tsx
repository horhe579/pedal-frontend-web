import React from "react";

interface LayoutProps {
    children: React.ReactNode;
}

const HeaderLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="w-full">
            <h1 className="text-4xl pt-16 px-8 pb-4 absolute z-50 text-white font-racing">
                pedal
            </h1>
            <div className="z-40">
                {children}
            </div>
        </div>
    );
}

export default HeaderLayout;
