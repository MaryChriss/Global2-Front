"use client";

import { Footer } from "@/components/Footer/footer";
import { SwitchPanel } from "@/components/SwitchPanel/SwitchPanel";
import { useRouter } from "next/navigation";
import router from "next/router";
import { FaCircleArrowLeft } from "react-icons/fa6";

export default function Login() {
    const router = useRouter();
    
    return(
        <>
            <div className="bg-login-fundo bg-cover bg-center h-screen p-32 min-[320px]:p-9 sm:p-32 md:p-32 lg:p-32 xl:p-32 2xl:p-32">
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