"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import FormLogin from "../FormLogin/FormLogin";
import FormCadastro from "../FormCadastro/FormCadastro";

export const SwitchPanel: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [userData, setUserData] = useState<{ email: string; password: string } | null>(null);
    const router = useRouter();

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    const handleLogin = (email: string, password: string) => {
        if (userData && userData.email === email && userData.password === password) {
            router.push("/perfil");
        } else {
            alert("Email ou senha incorretos.");
        }
    };

    return (
        <div>
            <div>
                {isLogin ? (
                    <FormLogin toggleForm={toggleForm} />
                ) : (
                    <FormCadastro toggleForm={toggleForm} />
                )}
            </div>
        </div>
    );
};
