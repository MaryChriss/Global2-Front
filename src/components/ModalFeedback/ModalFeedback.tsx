import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const ModalFeedback: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [comentario, setComentario] = useState('');
    const [avaliacao, setAvaliacao] = useState<number | null>(null);
    const [idCliente, setIdCliente] = useState<number | null>(null);

    useEffect(() => {
        const loginData = localStorage.getItem('loginData');
        if (loginData) {
            try {
                const parsedData = JSON.parse(loginData);
                const id_cliente = parsedData?.cliente?.id_cliente;
                if (id_cliente) {
                    setIdCliente(Number(id_cliente));
                }
            } catch (error) {
                console.error('Erro ao parsear loginData:', error);
            }
        }
    }, []);

    const toggleModal = () => setIsVisible(!isVisible);

    useEffect(() => {
        const interval = setInterval(() => {
        setIsVisible(true);
        }, 480000); // =8m

        return () => clearInterval(interval); 
    }, []);

    const handleSubmit = () => {
        if (!idCliente) {
        alert('Usuário não autenticado!');
        return;
        }

        const feedbackData = {
        cliente:  { id_cliente: idCliente },
        comentario,
        avaliacao,
        };

        fetch(`http://localhost:8080/Global2/webapi/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedbackData),
        })
        .then((res) => {res.json()
            isVisible == false
            toggleModal();
        })
        .then((data) => {
            console.log('Feedback enviado:', data);
        })
        .catch((err) => console.error('Erro ao enviar feedback:', err));


    };

    return (
        <>
        {isVisible && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-lg font-bold mb-4">Deixe seu Feedback</h2>
                <textarea
                className="w-full border p-2 rounded mb-4"
                rows={4}
                placeholder="Seu comentário"
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                />
                <div className="mb-4">
                <label className="block mb-2">Sua Avaliação:</label>
                <div className="flex flex-col gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                    <label
                        key={num}
                        className="flex items-center gap-2 cursor-pointer"
                    >
                        <input
                        type="radio"
                        name="avaliacao"
                        value={num}
                        checked={avaliacao === num}
                        onChange={() => setAvaliacao(num)}
                        className="hidden"
                        />
                        <FaStar
                        size={20}
                        className={avaliacao === num ? 'text-yellow-500' : 'text-gray-400'}
                        />
                        {`${num} Estrela${num > 1 ? 's' : ''}`}
                    </label>
                    ))}
                </div>
                </div>
                <div className="flex justify-end gap-4">
                <button
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                    onClick={toggleModal}
                >
                    Cancelar
                </button>
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded"
                    onClick={handleSubmit}
                >
                    Enviar
                </button>
                </div>
            </div>
            </div>
        )}
        </>
    );
};

export default ModalFeedback;
