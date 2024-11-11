import React, { ButtonHTMLAttributes } from 'react';
import Link from 'next/link';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    href?: string;
}

export const Botao: React.FC<ButtonProps> = ({ children, href = '', ...props }) => {
    const buttonClasses = "w-1/2 p-3 bg-lime-700 text-white rounded-full cursor-pointer text-base ml-32";

    if (href) {
        return (
            <Link href={href} passHref>
                <button className={buttonClasses} {...props}>
                    {children}
                </button>
            </Link>
        );
    }

    return (
        <button className={buttonClasses} {...props}>
            {children}
        </button>
    );
};
