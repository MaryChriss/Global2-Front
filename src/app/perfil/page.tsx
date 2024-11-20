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

        const [relatorios, setRelatorios] = useState([]);
        useEffect(() => {
            const savedRelatorios = JSON.parse(localStorage.getItem('relatorios')) || [];
            setRelatorios(savedRelatorios);
        }, []);


        // sm: md: lg: xl: 2xl:
    return (
        <Layout>
            <div className="bg-lime-50 p-4
            ">
                <section>
                    <div className="flex justify-center text-center pt-20
                        sm:flex-col
                        md:flex-col
                        lg:flex-row
                        xl:flex-row
                        2xl:flex-row
                        min-[320px]:flex-col
                    ">
                        <div className="mt-20">
                            <h2 className="font-raleway font-semibold text-4xl
                            sm:text-3xl
                            md:text-3xl
                            lg:text-4xl
                            xl:text-4xl
                            2xl:text-4xl
                            min-[320px]:text-2xl min-[320px]:justify-center
                            ">Bem vindo(a),</h2>
                            <p className=" font-crimson text-3xl font-bold text-gray-800
                            sm:text-2xl
                            md:text-2xl md:mb-20
                            lg:text-3xl
                            xl:text-3xl
                            2xl:text-3xl
                            min-[320px]:text-xl
                            ">
                                {user?.name || "Nome do Usuário"}
                            </p>
                        </div>

                        <div className="relative 
                        sm:ml-11 
                        md:ml-60
                        lg:relative 
                        xl:relative 
                        2xl:relative 
                        min-[320px]:ml-11 min-[320px]:-40">
                            <Image src="/deco.png" className="absolute ml-24 -mt-5" alt="" width={50} height={50}/>
                            <Image src="/foto-user.png" alt="Usuário" width={250} height={250} />
                        </div>
                    </div>
                    
                    
                    <div className="flex-col p-20 bg-slate-100 rounded-lg mr-60 ml-60 shadow-md mt-11
                        sm:flex-col 
                        md:flex-col md:mr-36 md:ml-48
                        lg:flex-col lg:mr-36 lg:ml-48
                        xl:flex-col
                        2xl:flex-col
                        min-[320px]:flex-col min-[320px]:text-center min-[320px]:ml-28
                    ">
                        <div className="flex flex-col gap-2 mb-9
                        ">
                            <h3 className="text-lg font-bold text-gray-600">Objetivos</h3>
                            <p className="text-sm font-semibold text-gray-600">Diminuir a conta de:</p>
                        </div>

                        <div className="flex-col mr-20 font-bold
                        sm:flex-col 
                        md:flex-col 
                        lg:flex-col
                        xl:flex-col
                        2xl:flex-col
                        min-[320px]:flex-col
                        ">
                            {["luz", "agua", "gas"].map((item) => (
                                <div key={item} className="flex items-center justify-between
                                    sm:flex-col
                                    md:flex-col
                                    lg:flex-row lg:ml-24
                                    xl:flex-row
                                    2xl:flex-row
                                    min-[320px]:flex-col
                                ">
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

                    <div className="flex-col mr-60 ml-60 bg-slate-50 p-14 rounded-lg shadow-md mt-11 mb-12
                        sm:flex-col
                        md:flex-col md:mr-36 md:ml-48
                        lg:flex-col lg:mr-36 lg:ml-48
                        xl:flex-col
                        2xl:flex-col 2xl:text-left
                        min-[320px]:flex-col min-[320px]:text-center min-[320px]:ml-28
                    ">
                        <h4 className="text-lg font-semibold mb-4">Seus relatórios Salvos:</h4>
                        {relatorios.length > 0 ? (
                            relatorios.map((relatorio, index) => (
                                <div key={index} className="mb-8 p-4 border rounded-lg bg-slate-100 shadow-lg">
                                    <h3 className="text-xl font-semibold">
                                        Mês de Referência: {relatorio.mesReferencia}
                                    </h3>
                                    <p>Tipo de Residência: {relatorio.tipoResidencia}</p>
                                    <p>Quantidade de Pessoas: {relatorio.quantidadePessoas}</p>

                                    <h4 className="mt-4 font-semibold">Consumo de Eletrodomésticos:</h4>
                                    {relatorio.consumoReal.map((consumo, idx) => (
                                        <p key={idx}>
                                            Eletrodoméstico {idx + 1}: Consumo Real - {consumo} kWh
                                        </p>
                                    ))}

                                    <h4 className="mt-4 font-semibold">Consumo do Chuveiro:</h4>
                                    <p>Consumo Calculado: {relatorio.chuveiroConsumo.toFixed(2)} kWh</p>
                                </div>
                            ))
                        ) : (
                            <p>Nenhum relatório disponível.</p>
                        )}
                    </div>

                </section>
            </div>
        </Layout>
    );
}
