import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { FaArrowLeft } from "react-icons/fa";

interface ClienteFormData {
    nome_cliente: string;
    email: string;
    endereco: string;
    telefone: string;
}

interface LoginFormData {
    password: string;
    confirmPassword: string;
}

interface FormCadastroProps {
    toggleForm: () => void;
}

const schemaCliente = Yup.object().shape({
    nome_cliente: Yup.string().required("Nome é obrigatório"),
    email: Yup.string().email("Email inválido").required("Email é obrigatório"),
    endereco: Yup.string().required("Endereço é obrigatório"),
    telefone: Yup.string().required("Telefone é obrigatório"),
});

const schemaLogin = Yup.object().shape({
    password: Yup.string().min(6, "A senha deve ter pelo menos 6 caracteres").required("Senha é obrigatória"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "As senhas não coincidem")
        .required("Confirme sua senha"),
});

const FormCadastro: React.FC<FormCadastroProps> = ({ toggleForm }) => {
    const [step, setStep] = useState(1); 
    const [clienteId, setClienteId] = useState<string | null>(null);
    const [email, setEmail] = useState<string>(""); 
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const {
        register: registerCliente,
        handleSubmit: handleSubmitCliente,
        formState: { errors: errorsCliente },
    } = useForm<ClienteFormData>({ resolver: yupResolver(schemaCliente) });

    const {
        register: registerLogin,
        handleSubmit: handleSubmitLogin,
        formState: { errors: errorsLogin },
        reset: resetLoginForm,
    } = useForm<LoginFormData>({ resolver: yupResolver(schemaLogin), defaultValues: {password: "", confirmPassword: ""} });

    const onSubmitCliente: SubmitHandler<ClienteFormData> = async (login) => {
        const { nome_cliente, email, endereco, telefone } = login;
        setEmail(email); 
    
        try {
            const response = await fetch(`${apiUrl}/webapi/cliente`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nome_cliente: nome_cliente,
                    email: email,
                    endereco: endereco,
                    telefone: telefone,
                }),
            });
    
            if (response.ok) {
                const result = await response.json();
                setClienteId(result.id_cliente);
                setEmail(result.email);

                resetLoginForm();
                setStep(2);
            } else {
                console.log("erro",response.json);
                console.log("erro",response);
                alert("Erro ao cadastrar. Verifique os dados e tente novamente.");
            }
        } catch (error) {
            console.error("Erro ao chamar a API:", error);
            alert("Erro ao cadastrar. Por favor, tente novamente mais tarde.");
        }
    };

    const onSubmitLogin: SubmitHandler<LoginFormData> = async (data) => {
        const { password } = data;
        try {
            await fetch(`${apiUrl}/webapi/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email_login: email ,
                    senha_login: password,
                    id_cliente: clienteId ,
                }),
            });

            alert("Cadastro realizado com sucesso! Agora faça o login.");
            toggleForm();
        } catch (error) {
            console.error("Erro ao chamar a API:", error);
            alert("Erro ao cadastrar. Por favor, tente novamente mais tarde.");
        }
    };

    return (
        <>
            <FaArrowLeft size={25} onClick={toggleForm} />
            <h1>Cadastre-se:</h1>
            {step === 1 ? (
                <form onSubmit={handleSubmitCliente(onSubmitCliente)}>
                    <input type="text" placeholder="Nome Completo" {...registerCliente("nome_cliente")} />
                    {errorsCliente.nome_cliente && <p>{errorsCliente.nome_cliente.message}</p>}

                    <input type="email" placeholder="Email" {...registerCliente("email")} />
                    {errorsCliente.email && <p>{errorsCliente.email.message}</p>}

                    <input type="text" placeholder="Endereço" {...registerCliente("endereco")} />
                    {errorsCliente.endereco && <p>{errorsCliente.endereco.message}</p>}

                    <input type="text" placeholder="Telefone" {...registerCliente("telefone")} />
                    {errorsCliente.telefone && <p>{errorsCliente.telefone.message}</p>}

                    <button type="submit">Próximo</button>
                </form>
            ) : (
                <form onSubmit={handleSubmitLogin(onSubmitLogin)}>

                    
                    <input type="password" placeholder="Senha" {...registerLogin("password")} />
                    {errorsLogin.password && <p>{errorsLogin.password.message}</p>}

                    <input type="password" placeholder="Confirme sua senha" {...registerLogin("confirmPassword")} />
                    {errorsLogin.confirmPassword && <p>{errorsLogin.confirmPassword.message}</p>}

                    <button type="submit">Cadastrar Login</button>
                </form>
            )}
            <a onClick={toggleForm}>Já tem uma conta? Login</a>
        </>
    );
};

export default FormCadastro;
