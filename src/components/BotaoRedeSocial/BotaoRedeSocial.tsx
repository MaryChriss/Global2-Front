import { IconType } from "react-icons";

interface BotaoRedeSocialProps {
    Icone: IconType; 
    url: string; 
    label: string; 
    iconSize?: string | number;
}

export const BotaoRedeSocial = ({ Icone, url, label, iconSize = '2rem' }: BotaoRedeSocialProps) => (
    <div className="bg-lime-200 hover:bg-lime-100 rounded-lg border border-gray-300 p-2 h-12 w-32 flex items-center justify-center">
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-black font-bold text-xl flex items-center space-x-2 no-underline">
            <Icone size={iconSize} />
            <span>{label}</span>
        </a>
    </div>
);
