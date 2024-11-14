"use client"; // Adicione esta linha no início do arquivo

import Image from "next/image";
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import CustomInput from '@/components/CustomInput/CustomInput';
import { Layout } from '@/components/Layout/Layout';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => setIsClient(true), []);

    const [formData, setFormData] = useState({
        tipoResidencia: '',
        quantidadePessoas: '',
        geladeira: { tem: false, quantidade: 0, consumo: 0 },
        chuveiro: { tem: false, quantidade: 0, potencia: 0, tempoBanho: 0 },
        arCondicionado: { tem: false, quantidade: 0, consumo: 0 },
        maquinaLavar: { tem: false, quantidade: 0, consumo: 0 },
        fornoCooktop: { tem: false, quantidade: 0, consumo: 0 },
    });

    const [showGraphs, setShowGraphs] = useState(false);

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        const [category, field] = name.includes(".") ? name.split(".") : [name];

        if (field) {
            setFormData((prevData) => ({
                ...prevData,
                [category]: {
                    ...prevData[category],
                    [field]: type === "checkbox" ? checked : parseFloat(value),
                },
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: type === "checkbox" ? checked : parseFloat(value),
            }));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setShowGraphs(true);
    };

    const eletrodomesticos = [
        { nome: 'Geladeira', key: 'geladeira', gastoIdeal: 30 },
        { nome: 'Ar-condicionado', key: 'arCondicionado', gastoIdeal: 80 },
        { nome: 'Máquina de Lavar', key: 'maquinaLavar', gastoIdeal: 20 },
        { nome: 'Forno/Cooktop', key: 'fornoCooktop', gastoIdeal: 40 },
    ];

    const eletrodomesticosSelecionados = eletrodomesticos.filter((item) => formData[item.key].tem);

    const labels = eletrodomesticosSelecionados.map((item) => item.nome);
    const consumoReal = eletrodomesticosSelecionados.map(
        (item) => formData[item.key].consumo * formData[item.key].quantidade
    );
    const gastoIdeal = eletrodomesticosSelecionados.map((item) => item.gastoIdeal);

    const consumoEletrodomesticosData = {
        labels,
        datasets: [
            {
                label: 'Consumo Atual (kWh)',
                data: consumoReal,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
            {
                label: 'Consumo Ideal (kWh)',
                data: gastoIdeal,
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
            },
        ],
    };

    const chuveiroData = {
        labels: ['Chuveiro'],
        datasets: [
            {
                label: 'Consumo do Chuveiro (kWh)',
                data: [formData.chuveiro.potencia * formData.chuveiro.quantidade * formData.chuveiro.tempoBanho / 60],
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
            },
            {
                label: 'Gasto Ideal do Chuveiro (kWh)',
                data: [60],  // valor fixo como gasto ideal do chuveiro
                backgroundColor: 'rgba(300, 60, 270, 0.5)',
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

    if (!isClient) return null;

    return (
        <Layout>
            <div className="flex items-center justify-center mb-8">
                <h1 className="font-raleway text-xl text-left mr-40">
                    Insira seus dados de consumo para visualizar <br/>
                    seus gastos de luz e água e identificar oportunidades <br/>
                    de economia e ajudar o meio ambiente!
                </h1>
                <Image className="ml-36" src="/regando.png" width={350} height={350} alt="garota regando uma árvore" />
            </div>

            <div className="">
                <h2 className="text-2xl font-bold font-crimson mb-7 ml-9">Dados de Consumo de Energia</h2>
                <p className="mb-7 ml-9 font-itim" >(Coloque o consumo medio por mês!)</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex gap-28 justify-center">
                        <div className="mb-4">
                            <label className="block mb-2 font-medium">Tipo de Residência:</label>
                            <select
                                name="tipoResidencia"
                                value={formData.tipoResidencia}
                                onChange={handleInputChange}
                                className="py-2 px-4 w-80 bg-[#c3d4a4] rounded-full focus:outline-none"
                            >
                                <option value="">Selecione</option>
                                <option value="casa">Casa</option>
                                <option value="apartamento">Apartamento</option>
                            </select>
                        </div>

                        <CustomInput
                            label="Quantidade de Pessoas:"
                            type="number"
                            name="quantidadePessoas"
                            value={formData.quantidadePessoas}
                            onChange={handleInputChange}
                            min="1"
                        />
                    </div>

                <div className="bg-lime-50 rounded-3xl flex-col w-9/12 justify-center ml-56">
                    <div className="flex justify-center gap-96">
                        <div>
                            {['geladeira', 'chuveiro'].map((item) => (
                                <div className="" key={item}>
                                    <h3 className="text-lg font-semibold mb-2 mt-24 ">{item.charAt(0).toUpperCase() + item.slice(1)}</h3>
                                    <div className="flex items-center mb-5">
                                        <input
                                            type="checkbox"
                                            name={`${item}.tem`}
                                            checked={formData[item].tem}
                                            onChange={handleInputChange}
                                            className="mr-2"
                                        />
                                        <label>Possui?</label>
                                    </div>
                                    {formData[item].tem && (
                                        <div className="space-y-2 ">
                                            <CustomInput
                                                label="Quantidade:"
                                                type="number"
                                                name={`${item}.quantidade`}
                                                value={formData[item].quantidade}
                                                onChange={handleInputChange}
                                            />
                                            <CustomInput
                                                label="Consumo Médio por Unidade (kWh):"
                                                type="number"
                                                name={`${item}.consumo`}
                                                value={formData[item].consumo}
                                                onChange={handleInputChange}
                                            />
                                            {item === 'chuveiro' && (
                                                <>
                                                    <CustomInput
                                                        label="Potência do Chuveiro (W):"
                                                        type="number"
                                                        name="chuveiro.potencia"
                                                        value={formData.chuveiro.potencia}
                                                        onChange={handleInputChange}
                                                    />
                                                    <CustomInput
                                                        label="Tempo Médio no Banho (min):"
                                                        type="number"
                                                        name="chuveiro.tempoBanho"
                                                        value={formData.chuveiro.tempoBanho}
                                                        onChange={handleInputChange}
                                                    />
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                            <div>
                                {['arCondicionado', 'maquinaLavar'].map((item) => (
                                    <div key={item}>
                                        <h3 className="text-lg font-semibold mb-2 mt-24">{item.charAt(0).toUpperCase() + item.slice(1)}</h3>
                                        <div className="flex items-center mb-7">
                                            <input
                                                type="checkbox"
                                                name={`${item}.tem`}
                                                checked={formData[item].tem}
                                                onChange={handleInputChange}
                                                className="mr-2"
                                            />
                                            <label>Possui?</label>
                                        </div>
                                        {formData[item].tem && (
                                            <div className="space-y-2">
                                                <CustomInput
                                                    label="Quantidade:"
                                                    type="number"
                                                    name={`${item}.quantidade`}
                                                    value={formData[item].quantidade}
                                                    onChange={handleInputChange}
                                                />
                                                <CustomInput
                                                    label="Consumo Médio por Unidade (kWh):"
                                                    type="number"
                                                    name={`${item}.consumo`}
                                                    value={formData[item].consumo}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>


                        <div className="flex justify-center">
                            <div className="mt-9">
                                <h3 className="text-lg font-semibold mb-2">Forno/Cooktop</h3>
                                <div className="flex items-center mb-6">
                                    <input
                                        type="checkbox"
                                        name="fornoCooktop.tem"
                                        checked={formData.fornoCooktop.tem}
                                        onChange={handleInputChange}
                                        className="mr-2"
                                    />
                                    <label>Possui?</label>
                                </div>
                                {formData.fornoCooktop.tem && (
                                    <div className="space-y-2 mb-11">
                                        <CustomInput
                                            label="Quantidade:"
                                            type="number"
                                            name="fornoCooktop.quantidade"
                                            value={formData.fornoCooktop.quantidade}
                                            onChange={handleInputChange}
                                        />
                                        <CustomInput
                                            label="Consumo Médio por Unidade (kWh):"
                                            type="number"
                                            name="fornoCooktop.consumo"
                                            value={formData.fornoCooktop.consumo}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <button type="submit" className="flex justify-center items-center mx-auto mt-9 bg-lime-800 text-white px-6 py-3 rounded-full mb-8">
                            Gerar Gráficos
                        </button>

                    </div>
                </form>

                {showGraphs && eletrodomesticosSelecionados.length > 0 && (
                    <div className="mt-8 mb-6" style={{ height: '400px' }}>
                        <h3 className="text-xl font-semibold mb-4 mt-20 ml-9">Gráfico de Consumo dos Eletrodomésticos</h3>
                        <Bar data={consumoEletrodomesticosData} options={options} />
                    </div>
                )}

                {showGraphs && formData.chuveiro.tem && (
                    <div className="mt-20 mb-36" style={{ height: '400px' }}>
                        <h3 className="text-xl font-semibold mb-6  ml-9">Consumo Específico do Chuveiro</h3>
                        <Bar data={chuveiroData} options={options} />
                    </div>
                )}
            </div>
        </Layout>
    );
};
