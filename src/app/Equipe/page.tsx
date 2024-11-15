import { BotaoRedeSocial } from "@/components/BotaoRedeSocial/BotaoRedeSocial";
import { Layout } from "@/components/Layout/Layout";
import Image from "next/image";
import { BiLogoGithub, BiLogoLinkedinSquare } from "react-icons/bi";

export default function Equipe() {

     // sm: md: lg: xl: 2xl:
    return(
        <Layout>
            <section>

                <div className="flex flex-row items-center justify-center gap-36 mt-8 
                sm:gap-3 sm:flex-col sm:mt-20
                md:gap-3 md:flex-col md:mt-20
                lg:gap-36 lg:flex-row
                xl:gap-36 xl:flex-row
                2xl:gap-36 2xl:flex-row
                min-[320px]:flex-col min-[320px]:mt-20
                ">
                    <div>
                        <h1 className="font-semibold font-raleway text-3xl mb-6">Conheça nosso time!</h1>
                        <p className="font-crimson text-xl
                        sm:text-base
                        md:text-xl
                        lg:text-xl
                        xl:text-xl
                        2xl:text-xl
                        min-[320px]:text-base
                        ">Uma equipe dedicada a transformar ideias sustentáveis em <br/> 
                        soluções que fazem a diferença, com o compromisso de <br/> 
                        tornar a sustentabilidade acessível e impactar positivamente o futuro de todos.</p>
                    </div>

                    <div>
                        <Image className="" src="/equip.png" alt="" width={400} height={400}></Image>
                    </div>
                </div>

                <div className="flex justify-center gap-40 mt-28
                sm:flex-col sm:items-center
                md:flex-col md:items-center
                lg:flex-col lg:items-center
                xl:flex-row
                2xl:flex-row
                min-[320px]:flex-col min-[320px]:items-center
                ">

                    <div className="text-center text-2xl font-bold mt-0">
                        <Image src="/mariFoto.jpg" alt="" className="w-48 h-48 rounded-full border-lime-500" width={200} height={200} />
                        <p>Mariana Christina <br />
                            RM: 554773
                        </p>

                        <div className="flex flex-col justify-center items-center mt-8 mb-9 gap-8">
                            <BotaoRedeSocial
                                Icone={BiLogoGithub}
                                url="https://github.com/MaryChriss"
                                label="GitHub"
                            />

                            <BotaoRedeSocial
                                Icone={BiLogoLinkedinSquare}
                                url="https://www.linkedin.com/in/mariana-fernandes-92690425a/"
                                label="LinkedIn"
                            />
                        </div>
                    </div>

                    <div className="text-center text-2xl font-bold mt-0">
                        <Image src="/henriqueFoto.jpeg" alt="" className="w-48 h-48 rounded-full border-lime-500" width={200} height={200} />
                        <p>Henrique Maciel <br />
                            RM: 556480
                        </p>

                        <div className="flex flex-col justify-center items-center mt-8 mb-9 gap-8">
                            <BotaoRedeSocial
                                Icone={BiLogoGithub}
                                url="https://github.com/Maciel0123"
                                label="GitHub"
                            />

                            <BotaoRedeSocial
                                Icone={BiLogoLinkedinSquare}
                                url="https://www.linkedin.com/in/henrique-maciel-a70140312/"
                                label="LinkedIn"
                            />

                        </div>
                    </div>

                    <div className="text-center text-2xl font-bold mt-0">
                    <Image src="/gabiFoto.jpg" alt="" className="w-48 h-48 rounded-full border-lime-500" width={200} height={200} />
                        <p>Gabriela Moguinho <br />
                            RM: 556143
                        </p>

                        <div className="flex flex-col justify-center items-center mt-8 mb-9 gap-8">
                            <BotaoRedeSocial
                                Icone={BiLogoGithub}
                                url="https://github.com/gabrielamoguinho"
                                label="GitHub"
                            />

                            <BotaoRedeSocial
                                Icone={BiLogoLinkedinSquare}
                                url="https://www.linkedin.com/in/gabriela-moguinho-a18762265/"
                                label="LinkedIn"
                            />
                        </div>
                    </div>

                </div>

            </section>
        </Layout>
    )
}