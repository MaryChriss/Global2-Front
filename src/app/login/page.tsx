"use client";

import { Footer } from "@/components/Footer/footer";
import { SwitchPanel } from "@/components/SwitchPanel/SwitchPanel";
import router from "next/router";
import { FaCircleArrowLeft } from "react-icons/fa6";

export default function Login() {
    return(
        <>
            <div className="bg-login-fundo bg-cover bg-center h-screen p-40 ">
                <div className="bg-white bg-opacity-70 flex flex-col rounded-3xl">

                    <div className="flex flex-col text-center p-11">
                        <FaCircleArrowLeft className="cursor-pointer" size={25} onClick={() => router.push('/')} />
                        <h1 className="font-raleway text-3xl mb-6">Bem-vindo ao Eco-home! <br/></h1>
                        <p className="font-crimson text-xl"> Faça login para transformar sua relação com a energia, <br/>
                        ajudando a natureza enquanto economiza </p>
                    </div>

                    <div>
                        <SwitchPanel/>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}