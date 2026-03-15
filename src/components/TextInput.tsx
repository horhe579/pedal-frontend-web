import React, { useState } from 'react';

interface TextInputProps {
    label: string;
    type?: 'text' | 'password' | 'email';
    onChange?: (value: string) => void;
    value?: string;
    className?: string;
}

const TextInput: React.FC<TextInputProps> = ({
    label,
    type = 'text',
    onChange,
    value,
    className = ''
}) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(e.target.value);
        }
    };

    return (
        <div className={className}>
            <label className="block text-left pl-1.5 pb-0.5 text-pedal-maroon font-quicksand">
                {label}
            </label>
            <input
                type={type}
                value={value}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={`
                    w-full
                    rounded-lg
                    bg-pedal-light
                    py-5
                    px-2.5
                    text-lg
                    font-quicksand
                    text-pedal-maroon
                    shadow-md
                    outline-none
                    transition-all
                    ${isFocused ? 'border border-pedal-pink' : 'border border-transparent'}
                `}
            />
        </div>
    );
};

export default TextInput;
