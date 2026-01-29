"use client";

import { useContext, useRef } from "react";
import { LanguageContext } from "../providers/languageContext";
import { IconType } from "react-icons";

interface CardProps {
    input: string;
    icon: IconType;
    imag : string
    currentIndex: number
}

const Card = ({ input, icon: Icon, imag, currentIndex }: CardProps) => {
    const { language } = useContext(LanguageContext);
    const ref = useRef<HTMLDivElement|null>(null)
    const height = ref.current?.getBoundingClientRect().height
    const realHeight = height? height : 160;
    return (
        <div
            ref={ref}
            style={{transform: `translateY(-${currentIndex * realHeight}px)`}}
            className={`   
                flex flex-col items-center gap-6                
                w-[360px]
                h-[250px]
                md:w-[650px]
                md:h-[300px]
                hover:text-[#F9C74F]
                text-gray-200
                text-[17px] font-semibold
                transition-all duration-1000
                hover:text-gray-200
                ${language === "fa" ? "font-vazir" : "font-roboto"}
            `}>
                <img src={imag} style={{opacity:"0.8", 	objectFit:"cover"}}/>
            <div className="text-gray-200 absolute top-10">
                <Icon size={48}/>
            </div>
            <div className="absolute text-1xl md:text-3xl top-35">{input}</div>
           
        </div>
    );
};

export default Card;
