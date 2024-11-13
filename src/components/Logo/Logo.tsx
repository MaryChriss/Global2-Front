import Image from "next/image"

export const Logo = () => {
    return (
        <div className="flex items-center">
            <Image className="w-8 h-auto ml-5 rounded-md" src="/Logo.png" alt="pequena arvore verde" width={30} height={30}/>
            <h1 className="font-itim text-sm">EcoHome</h1>
        </div>
    )
}