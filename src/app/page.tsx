import { Header } from "@/components/Header/Header";
import { Layout } from "@/components/Layout/Layout";
import { SideMenu } from "@/components/Menu/Menu";
import Image from "next/image";
import Link from "next/link";
import { BsGraphUpArrow } from "react-icons/bs";
import { FaHandshake, FaLightbulb, FaRecycle } from "react-icons/fa";

export default function Home() {
  return (
    <Layout>
      <Image className=" w-full h-56" src="/naturezaa.jpg" alt="paisagem em um monte com muitas arvores" width={1000} height={1000}/>
      <div className="flex flex-col justify-center text-center bg-white">
        <h1 className="font-raleway text-4xl mt-5 mb-5">Por que existimos?</h1>
        <p className="font-crimson text-lg mb-8">Para promover sustentabilidade e economia, transformando <br/>
        a vida das pessoas com energia eficiente e consciente.</p>
      </div>

      <div className="bg-lime-100 pt-10">

        <div>
          <h2 className="text-center font-raleway text-xl">Sistema de Monitoramento de Eficiência Energética</h2>
          <p className="mt-2 text-center text-lg font-crimson">Monitore seu consumo de energia e obtenha sugestões de economia</p>
        </div>

        <div>
          <h3 className="mt-9 font-raleway text-base font-bold ml-20 pb-10">Como Funciona o Monitoramento:</h3>
        </div>

        
    </Layout>
  )
}
