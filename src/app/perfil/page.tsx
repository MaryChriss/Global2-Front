"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Layout } from "../../components/Layout/Layout";

interface User {
    name: string;
    email: string;
}

interface Endereco {
    id_endereco: number;
    endereco_completo: string;
}

export default function Perfil() {
    const [user, setUser] = useState<User | null>(null);
    const [endereco, setEndereco] = useState<Endereco | null>(null);
    const [objetivos, setObjetivos] = useState({
        luz: 0,
        agua: 0,
    });
    const [isEditing, setIsEditing] = useState({
        luz: false,
        agua: false,
    });

    const router = useRouter();

    useEffect(() => {
        const savedUser = localStorage.getItem("loginData");
        if (savedUser) {
            const parsedUser = JSON.parse(savedUser);
            setUser({ name: parsedUser.cliente?.nome_cliente, email: parsedUser.email_login });

            // Buscar o endereço associado ao cliente
            const fetchEndereco = async () => {
                try {
                    const idCliente = parsedUser.cliente?.id_cliente;
                    const response = await fetch(`/api/endereco/getByClient/${idCliente}`);
                    if (response.ok) {
                        const data = await response.json();
                        setEndereco(data);
                        localStorage.setItem("id_endereco", data.id_endereco); // Atualiza o localStorage com o ID do endereço
                    } else {
                        console.error("Erro ao buscar endereço.");
                    }
                } catch (error) {
                    console.error("Erro ao chamar a API:", error);
                }
            };

            fetchEndereco();
        } else {
            router.push("/login"); // Redireciona para login se não estiver autenticado
        }
    }, [router]);

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
        const savedRelatorios = JSON.parse(localStorage.getItem("relatorios") || "[]");
        setRelatorios(savedRelatorios);
    }, []);

    if (!user) {
        return <div>Carregando...</div>;
    }

    return (
        <Layout>
            <div className="bg-lime-50 p-4">
                <section>
                    <div className="flex justify-center text-center pt-20 sm:flex-col md:flex-col lg:flex-row xl:flex-row 2xl:flex-row min-[320px]:flex-col">
                        <div className="mt-20">
                            <h2 className="font-raleway font-semibold text-4xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-4xl min-[320px]:text-2xl min-[320px]:justify-center">
                                Bem vindo(a),
                            </h2>
                            <p className="font-crimson text-3xl font-bold text-gray-800 sm:text-2xl md:text-2xl md:mb-20 lg:text-3xl xl:text-3xl 2xl:text-3xl min-[320px]:text-xl">
                                {user?.name || "Nome do Usuário"}
                            </p>
                        </div>
                        <div className="relative sm:ml-11 md:ml-80 lg:relative xl:relative 2xl:relative min-[320px]:ml-11 min-[320px]:-40">
                            <Image src="/deco.png" className="absolute ml-24 -mt-5" alt="" width={50} height={50} />
                            <Image src="/foto-user.png" alt="Usuário" width={250} height={250} />
                        </div>
                    </div>

                    <div className="flex-col p-20 bg-slate-100 rounded-lg mr-60 ml-60 shadow-md mt-11 sm:flex-col md:flex-col md:mr-36 md:ml-48 lg:flex-col lg:mr-36 lg:ml-48 xl:flex-col 2xl:flex-col min-[320px]:flex-col min-[320px]:text-center min-[320px]:ml-28">
                        <div className="flex flex-col gap-2 mb-9">
                            <h3 className="text-lg font-bold text-gray-600">Seu Endereço</h3>
                            {endereco ? (
                                <p className="text-sm font-semibold text-gray-600">{endereco.endereco_completo}</p>
                            ) : (
                                <p className="text-sm text-gray-500">Carregando endereço...</p>
                            )}
                        </div>
                    </div>

                    <div className="flex-col mr-60 ml-60 bg-slate-50 p-14 rounded-lg shadow-md mt-11 mb-12 sm:flex-col md:flex-col md:mr-36 md:ml-48 lg:flex-col lg:mr-36 lg:ml-48 xl:flex-col 2xl:flex-col 2xl:text-left min-[320px]:flex-col min-[320px]:text-center min-[320px]:ml-28">
                        <h4 className="text-lg font-semibold mb-4">Seus relatórios Salvos:</h4>
                        {relatorios.length > 0 ? (
                            relatorios.map((relatorio, index) => (
                                <div key={index} className="mb-8 p-4 border rounded-lg bg-slate-100 shadow-lg">
                                    <h3 className="text-xl font-semibold">Mês de Referência: {relatorio.mesReferencia}</h3>
                                    <p>Tipo de Residência: {relatorio.tipoResidencia}</p>
                                    <p>Quantidade de Pessoas: {relatorio.quantidadePessoas}</p>
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
