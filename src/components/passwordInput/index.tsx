import React, { useState } from 'react';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';

interface PasswordInputProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className: string;
    title: string;
    name: string;
    placeholder?: string;
}

function PasswordInput ({ onChange, name, title, placeholder = 'Password', className="" }: PasswordInputProps): JSX.Element {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={`password-input relative ${className}`}>
            <input
                type={showPassword ? 'text' : 'password'}
                className={"border border-gray-300 rounded-md mb-3 p-2 w-full"}
                title={title}
                name={name}
                placeholder={placeholder}
                onChange={onChange}
                required
            />
            <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 px-2 py-1 flex items-center text-gray-500 focus:outline-none h-[80%]"
            >
                {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
            </button>
        </div>
    );
}

export default PasswordInput;
