import React from 'react';

interface CustomInputProps {
    label?: string;
    type?: "text" | "number" | "password" | "email"; // Definindo tipos para 'type'
    name: string;
    value: string | number;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    min?: string;
    placeholder?: string;
    className?: string;
}

export default function CustomInput({
    label,
    type = "text",
    name,
    value,
    onChange,
    min = "0",
    placeholder = "",
    className = ""
}: CustomInputProps) {
    return (
        <div className="mb-4">
            {label && <label className="block mb-1 font-medium ">{label}</label>}
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                min={type === "number" ? min : undefined}
                placeholder={placeholder}
                className={`w-80 py-2 px-4 bg-[#c3d4a4] rounded-full focus:outline-none ${className} md:w-25 min-[320px]:w-56`}
            />
        </div>
    );
}
