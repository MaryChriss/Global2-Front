import React, { useState, useEffect } from 'react';

export const ModalFeedback: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [comentario, setComentario] = useState('');
    const [avaliacao, setAvaliacao] = useState<number | null>(null);
    const [idCliente, setIdCliente] = useState<number | null>(null);

    // Obter id_cliente do localStorage quando o componente for montado
    useEffect(() => {
        const storedId = localStorage.getItem('id_cliente');
        if (storedId) {
        setIdCliente(Number(storedId));
        }
    }, []);

    // Função para alternar visibilidade do modal
    const toggleModal = () => setIsVisible(!isVisible);

    // Mostrar o modal a cada 3 minutos
    useEffect(() => {
        const interval = setInterval(() => {
        setIsVisible(true);
        }, 180000); // 180000ms = 3 minutos

        return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
    }, []);

    const handleSubmit = () => {
        if (!idCliente) {
        alert('Usuário não autenticado!');
        return;
        }

        // Enviar feedback para a API
        const feedbackData = {
        id_cliente: idCliente,
        comentario,
        avaliacao,
        };

        fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedbackData),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log('Feedback enviado:', data);
            toggleModal();
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
                <select
                    className="w-full border p-2 rounded"
                    value={avaliacao || ''}
                    onChange={(e) => setAvaliacao(Number(e.target.value))}
                >
                    <option value="" disabled>Selecione</option>
                    {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                        {num} Estrela{num > 1 && 's'}
                    </option>
                    ))}
                </select>
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
