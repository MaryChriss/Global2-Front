"use client";

import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import CustomInput from '@/components/CustomInput/CustomInput';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
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
                    [field]: type === "checkbox" ? checked : value,
                },
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: type === "checkbox" ? checked : value,
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

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">Dados de Consumo de Energia</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-4">
                <label className="block mb-2 font-medium">Tipo de Residência:</label>
                <select
                    name="tipoResidencia"
                    value={formData.tipoResidencia}
                    onChange={handleInputChange}
                    className="w-full py-2 px-4 bg-[#c3d4a4] rounded-full focus:outline-none"
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

                {['geladeira', 'chuveiro', 'arCondicionado', 'maquinaLavar', 'fornoCooktop'].map((item) => (
                    <div key={item}>
                        <h3 className="text-lg font-semibold mb-2">{item.charAt(0).toUpperCase() + item.slice(1)}</h3>
                        <div className="flex items-center mb-2">
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

                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Gerar Gráficos
                </button>
            </form>

            {showGraphs && eletrodomesticosSelecionados.length > 0 && (
                <div className="mt-8" style={{ height: '400px' }}>
                    <h3 className="text-xl font-semibold mb-4">Gráfico de Consumo dos Eletrodomésticos</h3>
                    <Bar data={consumoEletrodomesticosData} options={options} />
                </div>
            )}

            {showGraphs && formData.chuveiro.tem && (
                <div className="mt-20" style={{ height: '400px' }}>
                    <h3 className="text-xl font-semibold mb-6">Consumo Específico do Chuveiro</h3>
                    <Bar data={chuveiroData} options={options} />
                </div>
            )}
        </div>
    );
};
