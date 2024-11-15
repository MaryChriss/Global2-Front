"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Layout } from "../../components/Layout/Layout";

interface User {
    name: string;
    email: string;
}

export default function Perfil() {
    const [user, setUser] = useState<User | null>(null);
    const [objetivos, setObjetivos] = useState({
        luz: 0,
        agua: 0,
        gas: 0,
    });
    const [isEditing, setIsEditing] = useState({
        luz: false,
        agua: false,
        gas: false,
    });

    useEffect(() => {
        const savedUser = localStorage.getItem("loginData");
        if (savedUser) {
            const parsedUser = JSON.parse(savedUser);
            setUser({ name: parsedUser.cliente?.nome_cliente, email: parsedUser.email_login });
        }
    }, []);

    const handleEditClick = (field: keyof typeof objetivos) => {
        setIsEditing((prev) => ({ ...prev, [field]: true }));
    };

    const handleSaveClick = (field: keyof typeof objetivos) => {
        setIsEditing((prev) => ({ ...prev, [field]: false }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof typeof objetivos) => {
        const value = parseFloat(e.target.value) || 0;
        setObjetivos((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <Layout>
            <div className="bg-lime-50 bg-center h-screen">
                <section>
                    <div className="flex justify-center text-center gap-40 pt-20">
                        <div className="mt-20">
                            <h2 className="font-raleway font-semibold text-4xl">Bem vindo(a),</h2>
                            <h2 className=" font-crimson text-3xl font-bold text-gray-800">
                                {user?.name || "Nome do Usuário"}
                            </h2>
                        </div>

                        <div className="relative">
                            <Image src="/deco.png" className="absolute ml-24 -mt-5" alt="" width={50} height={50}/>
                            <Image src="/foto-user.png" alt="Usuário" width={250} height={250} />
                        </div>
                    </div>
                    
                    
                    <div className=" p-20 bg-slate-100 rounded-lg mr-60 ml-60 mb-7 shadow-md mt-11">
                        <div className="flex flex-col gap-2 mb-9">
                            <h3 className="text-lg font-bold text-gray-600">Objetivos</h3>
                            <p className="text-sm font-semibold text-gray-600">Diminuir a conta de:</p>
                        </div>

                        {/* Objetivos List */}
                        <div className=" mr-20 font-bold">
                            {["luz", "agua", "gas"].map((item) => (
                                <div key={item} className="flex items-center justify-between">
                                    <p className="mb-5">{item.charAt(0).toUpperCase() + item.slice(1)}:</p>
                                    {isEditing[item as keyof typeof objetivos] ? (
                                        <input
                                            type="number"
                                            value={objetivos[item as keyof typeof objetivos]}
                                            onChange={(e) => handleChange(e, item as keyof typeof objetivos)}
                                            className="w-16 p-1 text-right bg-white border rounded-md"
                                        />
                                    ) : (
                                        <p>R$ {objetivos[item as keyof typeof objetivos].toFixed(2)}</p>
                                    )}
                                    <button
                                        onClick={() =>
                                            isEditing[item as keyof typeof objetivos]
                                                ? handleSaveClick(item as keyof typeof objetivos)
                                                : handleEditClick(item as keyof typeof objetivos)
                                        }
                                        className="text-sm text-gray-500 hover:text-gray-700"
                                    >
                                        {isEditing[item as keyof typeof objetivos] ? "💾" : "✏️"}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
