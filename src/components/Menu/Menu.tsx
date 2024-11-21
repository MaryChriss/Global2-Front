"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { BiLogOut } from 'react-icons/bi';
import { BsGraphUpArrow } from 'react-icons/bs';
import { FaHome, FaUser, FaUserEdit } from 'react-icons/fa';
import { IoMenu } from 'react-icons/io5';
import { RiTeamFill } from 'react-icons/ri';

export const SideMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const loginData = localStorage.getItem("loginData");
            setIsLoggedIn(!!loginData);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("loginData");
        setIsLoggedIn(false);
        router.push("/");
    };

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <div className="flex justify-end items-center h-screen">
            <button
                onClick={toggleMenu}
                className="text-2xl p-2 m-4 text-black z-50">
                <IoMenu />
            </button>

            <div
                className={`fixed top-0 right-0 h-full bg-white text-white border-slate-300 border transition-all duration-300 ease-in-out
                ${isOpen ? 'w-64' : 'w-0 overflow-hidden'}`}
            >
                <div className="p-4 flex flex-col h-full">
                    <h2 className="text-2xl text-black font-semibold mb-6 font-raleway">Menu</h2>
                    <ul className="space-y-4 flex-grow">
                        <li>
                            <Link href="/" className="block px-2 py-1 rounded font-itim text-black hover:bg-lime-100">
                                <FaHome size={21} className="inline-block mr-2 text-lime-600" /> Página Inicial
                            </Link>
                        </li>

                        <li>
                            <Link href="/dashbord" className="block px-2 py-1 rounded font-itim text-black hover:bg-lime-100">
                                <BsGraphUpArrow size={21} className="inline-block mr-2 text-lime-600" /> Dashboard
                            </Link>
                        </li>

                        <li>
                            <Link href="/perfil" className="block px-2 py-1 rounded font-itim text-black hover:bg-lime-100">
                                <FaUser size={21} className="inline-block mr-2 text-lime-600" /> Perfil
                            </Link>
                        </li>

                        <li>
                            <Link href="/equipe" className="block px-2 py-1 rounded font-itim text-black hover:bg-lime-100">
                                <RiTeamFill size={24} className="inline-block mr-2 text-lime-600" /> Equipe
                            </Link>
                        </li>
                    </ul>

                    <div className="mt-auto">
                        {isLoggedIn ? (
                            <>
                                <BiLogOut size="1.5rem" color="#047a00" onClick={handleLogout} style={{ cursor: "pointer" }} />
                                <span onClick={handleLogout} style={{ cursor: "pointer", color: "#047a00" }}>Logout</span>
                            </>
                        ) : (
                            <>
                                <FaUserEdit size={22} className="inline-block mr-2 text-lime-600" />
                                <Link className='text-black font-itim' href="/login">Login</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
