import React from 'react';

interface ButtonProps {
    text: string;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    text,
    onClick,
    className = '',
    disabled = false
}) => {
    return (
        <div className={`pb-6 flex items-center ${className}`}>
            <button
                onClick={onClick}
                disabled={disabled}
                className={`
                    bg-pedal-pink
                    text-pedal-purple
                    rounded-2xl
                    py-3.5
                    px-14
                    text-2xl
                    font-quicksand
                    transition-all
                    hover:opacity-90
                    active:opacity-80
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                `}
            >
                {text}
            </button>
        </div>
    );
};

export default Button;
