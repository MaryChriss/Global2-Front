import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
    return (
        <div className="flex items-center">
            <Link href="/">
                <Image className="w-15 h-auto rounded-md" src="/Logo.png" alt="pequena arvore verde" width={100} height={100}/>
            </Link>
            <h1 className="font-itim text-lg text-lime-700 font -m-5 mr-11">EcoHome</h1>
        </div>
    );
};
