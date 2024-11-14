import { Header } from "@/components/Header/Header";
import { Layout } from "@/components/Layout/Layout";
import { SideMenu } from "@/components/Menu/Menu";
import Image from "next/image";

export default function Home() {
  return (
    <Layout>
      <Image className=" w-full h-56" src="/naturezaa.jpg" alt="paisagem em um monte com muitas arvores" width={1000} height={1000}/>
      <div className="flex flex-col justify-center text-center bg-white">
        <h1 className="font-raleway text-2xl mt-5 mb-5">Por que existimos?</h1>
        <p className="font-crimson text-lg mb-8">Para promover sustentabilidade e economia, transformando <br/>
        a vida das pessoas com energia eficiente e consciente.</p>
      </div>

      <div>
        
      </div>
    </Layout>
  )
}
