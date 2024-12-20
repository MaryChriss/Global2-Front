"use client";

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
    ChartOptions,
} from 'chart.js';
import CustomInput from '@/components/CustomInput/CustomInput';
import { Layout } from '@/components/Layout/Layout';

const apiUrl = process.env.NEXT_API_URL;

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);



export default function Dashboard() {
    const [relatorios, setRelatorios] = useState<any[]>([]);
    const [isClient, setIsClient] = useState(false);
    useEffect(() => setIsClient(true), []);


    const [formData, setFormData] = useState({
        quantidade_pessoas: '',
        mes_referencia: '',
        enderecoCompleto: '',
        geladeira: { tem: false, quantidade: 0, consumo: 0 },
        chuveiro: { tem: false, quantidade: 0, potencia: 0, tempoBanho: 0 },
        arCondicionado: { tem: false, quantidade: 0, consumo: 0 },
        maquinaLavar: { tem: false, quantidade: 0, consumo: 0 },
        fornoCooktop: { tem: false, quantidade: 0, consumo: 0 },
    });
    
    type EletrodomesticoKeys = keyof typeof formData;
    
    const eletrodomesticos = [
        { nome: 'Geladeira', key: 'geladeira', gastoIdeal: 50 },
        { nome: 'Ar-condicionado', key: 'arCondicionado', gastoIdeal: 90 },
        { nome: 'Máquina de Lavar', key: 'maquinaLavar', gastoIdeal: 20 },
        { nome: 'Forno/Cooktop', key: 'fornoCooktop', gastoIdeal: 120 },
    ];
    
    const eletrodomesticosSelecionados = eletrodomesticos.filter((item) => {
        const key = item.key as EletrodomesticoKeys;
        const value = formData[key];
    
        return typeof value === 'object' && value !== null && 'tem' in value && value.tem;
    });
    

    const [showGraphs, setShowGraphs] = useState(false);

    useEffect(() => {
        const savedRelatorios = JSON.parse(localStorage.getItem('relatorios') || '[]');
        setRelatorios(savedRelatorios);
    }, []);    

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
        ) => {
            const { name, value, type } = event.target;
        
            const checked =
            type === "checkbox" ? (event.target as HTMLInputElement).checked : undefined;
        
            if (name.includes(".")) {
            const [category, field] = name.split(".");
            setFormData((prevData) => ({
                ...prevData,
                [category]: {
                ...(prevData[category as keyof typeof prevData] as Record<string, any>),
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
        
        const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
        
            if (!formData.mes_referencia || !formData.quantidade_pessoas) {
                alert("Por favor, preencha todos os campos obrigatórios!");
                return;
            }
        
            try {
                const loginData = JSON.parse(localStorage.getItem('loginData') || '{}');
                const id_cliente = loginData?.cliente?.id_cliente;
        
                if (!id_cliente) {
                    alert("Erro: ID do cliente não encontrado.");
                    return;
                }
        
                const enderecoData = {
                    cliente: { id_cliente: id_cliente },
                    endereco_completo: formData.enderecoCompleto,
                };
        
                const enderecoResponse = await fetch(`${apiUrl}/webapi/endereco`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(enderecoData),
                });
        
                if (!enderecoResponse.ok) {
                    throw new Error("Erro ao salvar endereço.");
                }
        
                const enderecoResult = await enderecoResponse.json();
                const id_endereco = enderecoResult.id_endereco;
                localStorage.setItem('id_endereco', id_endereco);
        
                const novoRelatorio = {
                    mes_referencia: formData.mes_referencia,
                    quantidade_pessoas: formData.quantidade_pessoas,
                    id_endereco,
                };
        
                const relatorioResponse = await fetch(`${apiUrl}/webapi/relatorios`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(novoRelatorio),
                });
        
                if (!relatorioResponse.ok) {
                    throw new Error("Erro ao salvar relatório.");
                }
        
                const relatorio = await relatorioResponse.json();
                setRelatorios((prev) => [...prev, relatorio]);
                setShowGraphs(true);
            } catch (error) {
                console.error('Erro ao salvar endereço/relatório:', error);
                alert('Erro ao salvar relatório.');
            }
        };
        
        const labels = eletrodomesticosSelecionados.map((item) => item.nome);
        const consumoReal = eletrodomesticosSelecionados.map((item) => {
            const key = item.key as keyof typeof formData;
        
            const itemData = formData[key];
        
            if (itemData && typeof itemData !== 'string' && 'consumo' in itemData && 'quantidade' in itemData) {
                const consumo = itemData.consumo || 0;
                const quantidade = itemData.quantidade || 0;
                return consumo * quantidade;
            }
        
            return 0;
        });
        
        
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
                data: [165],
                backgroundColor: 'rgba(300, 60, 270, 0.5)',
            },
        ],
    };

    const options: ChartOptions<'bar'> = {
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
    

    // sm: md: lg: xl: 2xl:
    return (
        <Layout>
            <div className="flex items-center justify-center mb-8 
            sm:flex-col
            md:flex-col
            lg:flex-row
            xl:flex-row
            2xl:flex-row
            min-[320px]:flex-col">
                <h1 className="font-raleway text-xl text-left mr-40 
                sm:mr-3 ml-5 mt-5
                md:mr-6
                lg:mr-6
                xl:mr-40
                2xl:mr-40
                min-[320px]:mr-0">
                    Insira seus dados de consumo para visualizar <br/>
                    seus gastos de luz e água e identificar oportunidades <br/>
                    de economia e ajudar o meio ambiente!
                </h1>
                <Image className="ml-36
                sm:ml-6 
                md:ml-5 
                lg:ml-5 
                xl:ml-36
                2xl:ml-36
                min-[320px]:ml-0
                " src="/regando.png" width={350} height={350} alt="garota regando uma árvore" />
            </div>

                <div className="">

                    <h2 className="text-2xl font-bold font-crimson mb-7 ml-9">Dados de Consumo de Energia</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div className="flex gap-28 justify-center items-center
                            sm:flex-col sm:gap-5
                            md:flex-col
                            lg:flex-col 
                            xl:flex-row
                            2xl:flex-row 2x1:gap-28
                            min-[320px]:flex-col
                            ">
                                
                            <div className="mb-4 
                                sm:text-center
                                md:text-center 
                                lg:text-center
                                xl:mb-4
                                2xl:mb-4">
                                <label className="block mb-2 font-medium">Tipo de Residência:</label>
                                <select
                                    name="tipoResidencia"
                                    onChange={handleInputChange}
                                    className="py-2 px-4 w-80 bg-[#c3d4a4] rounded-full focus:outline-none min-[320px]:w-56"
                                >
                                    <option value="">Selecione</option>
                                    <option value="casa">Casa</option>
                                    <option value="apartamento">Apartamento</option>
                                </select>
                            </div>

                            <div className="mb-4 
                                    sm:text-center
                                    md:text-center 
                                    lg:text-center
                                    xl:mb-4
                                    2xl:mb-4">
                                    <label className="block mb-2 font-medium">Seu endereço:</label>
                                    <input 
                                        type="text" 
                                        name="enderecoCompleto" 
                                        value={formData.enderecoCompleto || ''} 
                                        onChange={handleInputChange} 
                                        className="py-2 px-4 w-80 bg-[#c3d4a4] rounded-full focus:outline-none min-[320px]:w-56" 
                                    />
                                </div>

                            <div className="flex justify-center gap-28 mb-0 text-center">
                            <div className="mb-4 ">
                                <label className="block mb-2 font-medium">Mês de Referência:</label>
                                <select
                                    name="mes_referencia"
                                    value={formData.mes_referencia || ''}
                                    onChange={handleInputChange}
                                    className="py-2 px-4 w-80 bg-[#c3d4a4] rounded-full focus:outline-none min-[320px]:w-56"
                                >
                                    <option value="">Selecione</option>
                                    {["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"].map((mes, index) => (
                                        <option key={index} value={mes}>{mes}</option>
                                    ))}
                                </select>
                            </div>
                            </div>


                                <div className="
                                    sm:text-center
                                    md:text-center 
                                    lg:text-center
                                    xl:text-center
                                    2xl:text-center
                                ">
                                    <CustomInput
                                        label="Quantidade de Pessoas:"
                                        type="number"
                                        name="quantidade_pessoas"
                                        value={formData.quantidade_pessoas}
                                        onChange={handleInputChange}
                                        min="1"
                                    />
                                </div>
                        </div>
                    </form>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="bg-lime-50 shadow-lg rounded-3xl flex-col w-9/12 justify-center ml-56 text-center
                            sm:ml-20
                            md:ml-28
                            lg:ml-36
                            xl:ml-40
                            2xl:ml-56
                            min-[320px]:ml-10
                        ">
                        <div className="flex justify-center
                            sm:flex-col sm:text-center sm:gap-2
                            md:flex-col md:text-center md:gap-5
                            lg:flex-col lg:text-center lg:gap-7
                            xl:flex-row xl:gap-10
                            2xl:flex-row 2xl:gap-64
                            min-[320px]:flex-col
                        ">
                        <div>
                        {['geladeira', 'chuveiro'].map((item) => {
                            const key = item as keyof typeof formData;
                            const value = formData[key];
                            const hasTem = typeof value === 'object' && value !== null && 'tem' in value;

                            return (
                                <div className="" key={item}>
                                <h3 className="text-lg font-semibold mb-2 mt-24 ">
                                    {item.charAt(0).toUpperCase() + item.slice(1)}
                                </h3>
                                <div
                                    className="flex items-center mb-5
                                                                    sm:text-center sm:justify-center
                                                                    md:text-center md:justify-center
                                                                    lg:text-center lg:justify-center
                                                                    xl:mb-10 xl:mt-0
                                                                    2xl:mb-5
                                                                "
                                >
                                    <input
                                    type="checkbox"
                                    name={`${item}.tem`}
                                    checked={hasTem ? value.tem : false}
                                    onChange={handleInputChange}
                                    className="mr-2"
                                    />
                                    <label>Possui?</label>
                                </div>
                                {hasTem && value.tem && (
                                    <div className="space-y-2 ">
                                    <CustomInput
                                        label="Quantidade:"
                                        type="number"
                                        name={`${item}.quantidade`}
                                        value={value.quantidade || 0}
                                        onChange={handleInputChange}
                                    />
                                    <CustomInput
                                        label="Consumo Médio por Unidade (kWh):"
                                        type="number"
                                        name={`${item}.consumo`}
                                        value={'consumo' in value ? value.consumo || 0 : 0}
                                        onChange={handleInputChange}
                                    />
                                    {item === 'chuveiro' && (
                                        <>
                                        <CustomInput
                                            label="Potência do Chuveiro (W):"
                                            type="number"
                                            name="chuveiro.potencia"
                                            value={'potencia' in value ? value.potencia || 0 : 0}
                                            onChange={handleInputChange}
                                        />
                                        <CustomInput
                                            label="Tempo Médio no Banho (min):"
                                            type="number"
                                            name="chuveiro.tempoBanho"
                                            value={'tempoBanho' in value ? value.tempoBanho || 0 : 0}
                                            onChange={handleInputChange}
                                        />
                                        </>
                                    )}
                                    </div>
                                )}
                                </div>
                            );
                            })}
                        </div>

                        <div>
                            {['arCondicionado', 'maquinaLavar'].map((item) => {
                            const key = item as keyof typeof formData;
                            const value = formData[key];
                            const hasTem = typeof value === 'object' && value !== null && 'tem' in value;

                            return (
                                <div key={item}>
                                <h3 className="text-lg font-semibold mb-2 mt-24">
                                    {item.charAt(0).toUpperCase() + item.slice(1)}
                                </h3>
                                <div
                                    className="flex items-center mb-5
                                                                    sm:text-center sm:justify-center
                                                                    md:text-center md:justify-center
                                                                    lg:text-center lg:justify-center
                                                                    xl:mb-10 xl:mt-0
                                                                    2xl:mb-5
                                                                    "
                                >
                                    <input
                                    type="checkbox"
                                    name={`${item}.tem`}
                                    checked={hasTem ? value.tem : false}
                                    onChange={handleInputChange}
                                    className="mr-2"
                                    />
                                    <label>Possui?</label>
                                </div>
                                {hasTem && value.tem && (
                                    <div className="space-y-2">
                                    <CustomInput
                                        label="Quantidade:"
                                        type="number"
                                        name={`${item}.quantidade`}
                                        value={value.quantidade || 0}
                                        onChange={handleInputChange}
                                    />
                                    <CustomInput
                                        label="Consumo Médio por Unidade (kWh):"
                                        type="number"
                                        name={`${item}.consumo`}
                                        value={'consumo' in value ? value.consumo || 0 : 0}
                                        onChange={handleInputChange}
                                    />
                                    </div>
                                )}
                                </div>
                            );
                            })}
                        </div>
                        </div>

                            <div className="flex justify-center">
                                <div className="mt-9">
                                    <h3 className="text-lg font-semibold mb-2 mt-12">Forno/Cooktop</h3>
                                    <div className="flex items-center mb-6
                                            sm:text-center sm:justify-center
                                            md:text-center md:justify-center
                                            lg:text-center lg:justify-center
                                            xl:mb-2 xl:mt-7
                                            2xl:mb-6
                                    ">
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
                            <h3 className="text-xl font-semibold mb-4 mt-20 ml-9">
                            Gráfico de Consumo dos Eletrodomésticos
                            </h3>
                            <Bar data={consumoEletrodomesticosData} options={options} />
                        </div>
                        )}

                        {showGraphs && formData.chuveiro?.tem && (
                        <div className="mt-20 mb-36" style={{ height: '400px' }}>
                            <h3 className="text-xl font-semibold mb-6  ml-9">
                            Consumo Específico do Chuveiro
                            </h3>
                            <Bar data={chuveiroData} options={options} />
                        </div>
                        )}

                        {showGraphs && (
                        <div className="mt-12 mb-36">
                            <h3 className="text-xl font-semibold mb-6 ml-9">Relatório de Consumo</h3>
                            <p className="ml-9">Mês de Referência: {formData.mes_referencia || "Não especificado"}</p>
                            <div className="bg-lime-50 p-6 rounded-lg w-10/12 mx-auto mt-6">
                            {eletrodomesticosSelecionados.length > 0 ? (
                                eletrodomesticosSelecionados.map((item, index) => {
                                const key = item.key as keyof typeof formData;
                                const value = formData[key];

                                if (
                                    typeof value === 'object' &&
                                    value !== null &&
                                    'consumo' in value &&
                                    'quantidade' in value
                                ) {
                                    const consumoReal = value.consumo * value.quantidade;
                                    const consumoIdeal = item.gastoIdeal;
                                    const status = consumoReal <= consumoIdeal ? 'Dentro do Ideal' : 'Acima do Ideal';
                                    const color = consumoReal <= consumoIdeal ? 'text-green-700' : 'text-red-700';

                                    return (
                                    <div key={index} className="flex justify-between py-2 border-b min-[320px]:flex-col">
                                        <span className="font-semibold">{item.nome}</span>
                                        <span>
                                        Consumo Real: <br /> {consumoReal.toFixed(2)} kWh
                                        </span>
                                        <span>
                                        Consumo Ideal: <br /> {consumoIdeal.toFixed(2)} kWh
                                        </span>
                                        <span className={`font-semibold ${color}`}>{status}</span>
                                    </div>
                                    );
                                }

                                return null;
                                })
                            ) : (
                                <p className="text-center">Nenhum eletrodoméstico selecionado.</p>
                            )}

                            {formData.chuveiro.tem && (
                                <div className="flex justify-between py-2 mt-4 border-t min-[320px]:flex-col">
                                <span className="font-semibold">Chuveiro</span>
                                <span>
                                    Consumo Real: <br />{' '}
                                    {(formData.chuveiro.potencia *
                                    formData.chuveiro.quantidade *
                                    formData.chuveiro.tempoBanho) /
                                    60}
                                    kWh
                                </span>
                                <span>Consumo Ideal: <br /> 60 kWh</span>
                                <span
                                    className={`${
                                    (formData.chuveiro.potencia *
                                        formData.chuveiro.quantidade *
                                        formData.chuveiro.tempoBanho) /
                                        60 <=
                                    60
                                        ? 'text-green-700'
                                        : 'text-red-700'
                                    } font-semibold`}
                                >
                                    {(formData.chuveiro.potencia *
                                    formData.chuveiro.quantidade *
                                    formData.chuveiro.tempoBanho) /
                                    60 <=
                                    60
                                    ? 'Dentro do Ideal'
                                    : 'Acima do Ideal'}
                                </span>
                                </div>
                            )}

                            {relatorios.map((relatorio, index) => (
                                <div key={index} className="mb-8 p-4 border border-gray-300 rounded-lg">
                                <h3 className="text-xl font-semibold">
                                    Mês de Referência: {relatorio.mesReferencia || relatorio.mes_referencia}
                                </h3>
                                <p>Tipo de Residência: {relatorio.tipoResidencia || 'Não especificado'}</p>
                                <p>Quantidade de Pessoas: {relatorio.quantidadePessoas || 'Não especificado'}</p>

                                {relatorio.consumoReal && relatorio.gastoIdeal ? (
                                    <>
                                    <h4 className="mt-4 text-lg font-semibold">Consumo de Eletrodomésticos:</h4>
                                    {eletrodomesticosSelecionados.map((item, idx) => (
                                        <div key={idx}>
                                        <p>
                                            {item.nome}: Consumo Real - {relatorio.consumoReal[idx]} kWh, Gasto Ideal -{' '}
                                            {relatorio.gastoIdeal[idx]} kWh
                                        </p>
                                        </div>
                                    ))}
                                    </>
                                ) : (
                                    <p className="mt-4">Informações de consumo não disponíveis para este relatório.</p>
                                )}

                                {relatorio.chuveiroConsumo !== undefined && (
                                    <h4 className="mt-4 text-lg font-semibold">Consumo do Chuveiro:</h4>
                                )}
                                <p>
                                    Consumo Calculado:{' '}
                                    {relatorio.chuveiroConsumo ? relatorio.chuveiroConsumo.toFixed(2) : 'N/A'} kWh
                                </p>
                                </div>
                            ))}

                            <div className="mt-8">
                                <h4 className="text-lg font-semibold">Consumo Total:</h4>
                                <p>
                                Total Real: {eletrodomesticosSelecionados.reduce((total, item) => {
                                    const key = item.key as keyof typeof formData;
                                    const value = formData[key];
                                    if (
                                    typeof value === 'object' &&
                                    value !== null &&
                                    'consumo' in value &&
                                    'quantidade' in value
                                    ) {
                                    return total + value.consumo * value.quantidade;
                                    }
                                    return total;
                                }, 0).toFixed(2)}{' '}
                                kWh
                                </p>
                                <p>
                                Total Ideal: {eletrodomesticosSelecionados.reduce((total, item) => {
                                    return total + item.gastoIdeal;
                                }, 0).toFixed(2)}{' '}
                                kWh
                                </p>
                            </div>
                            </div>
                        </div>
                        )}
                        </div>
        </Layout>
    );
};
