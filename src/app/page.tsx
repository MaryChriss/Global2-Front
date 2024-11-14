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

        <div className="flex flex-row justify-center gap-20 pb-20">

          <div className="flex flex-row gap-20">

            <div className=" flex flex-col justify-center text-center">
              <BsGraphUpArrow size={40} className=" text-black " />
              <p className="font-raleway mt-5">Monitore o consumo <br/>
              de energia em tempo real</p>
            </div>

            <div className=" flex flex-col justify-center text-center">
              <FaLightbulb size={40} className=" text-black " />
              <p className="font-raleway mt-5">Receba dicas <br/>
              personalizadas para <br/>
              economizar</p>
            </div>

          </div>

          <div className="flex flex-row gap-20">

            <div className=" flex flex-col justify-center text-center">
              <FaRecycle size={40} className=" text-black" />
              <p className="font-raleway mt-5">Promova práticas <br/>
              sustentáveis no seu dia a dia </p>
            </div>

            <div className=" flex flex-col justify-center text-center">
            <FaHandshake size={40} className=" text-black " />
            <p className="font-raleway mt-5">Transforme sua vida com <br/>
            eficiência energética</p>
            </div>

          </div>

        </div>

        <div className="flex flex-col justify-center text-center pb-10">
          <p>Acesse o DashBord para iniciar:</p>
            <div className=" flex justify-center">
              <Link href="/dashbord" className=" w-40 mt-5 bg-lime-800 text-white px-6 py-2 rounded-full">Acesse aqui!</Link>
            </div>
        </div>

      </div>
    </Layout>
  )
}
