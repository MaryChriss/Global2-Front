// Header.tsx
"use client";

import { Logo } from '../Logo/Logo';
import { SideMenu } from '../Menu/Menu';


export const Header = () => {
    return (
        <header className="flex items-center justify-between p-4 bg-gray-800 text-white h-16">
            <Logo />
            <SideMenu />
        </header>
    );
};
