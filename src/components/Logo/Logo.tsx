import Image from "next/image"

export const Logo = () => {
    return (
        <div className="flex items-center">
            <Image className="w-15 h-auto rounded-md" src="/Logo.png" alt="pequena arvore verde" width={100} height={100}/>
            <h1 className="font-itim text-lg text-lime-700 font -m-5 mr-11">EcoHome</h1>
        </div>
    )
}