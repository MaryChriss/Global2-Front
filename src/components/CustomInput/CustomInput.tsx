import React from 'react';

export default function CustomInput({
    label,
    type = "text",
    name,
    value,
    onChange,
    min = "0",
    placeholder = "",
    className = ""
}) {
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
                className={`w-80 py-2 px-4 bg-[#c3d4a4] rounded-full focus:outline-none ${className}`}
            />
        </div>
    );
}
