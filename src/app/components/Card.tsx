"use client";

import { useContext, useRef } from "react";
import { LanguageContext } from "../providers/languageContext";
import { IconType } from "react-icons";

interface CardProps {
    input: string;
    icon: IconType;
    imag: string
    currentIndex: number
}

const Card = ({ input, icon: Icon, imag, currentIndex }: CardProps) => {
    const { language } = useContext(LanguageContext);
    const ref = useRef<HTMLDivElement | null>(null)
    const height = ref.current?.getBoundingClientRect().height
    const realHeight = height ? height : 160;
    return (
        <div
            ref={ref}
            style={{ transform: `translateY(-${currentIndex * realHeight}px)` }}
            className={` 
                relative  
                flex flex-col items-center gap-6                
                w-[100%]
                h-auto
                hover:text-[#F9C74F]
                text-gray-200
                text-[17px] font-semibold
                transition-all duration-1000
                hover:text-gray-200
                ${language === "fa" ? "font-vazir" : "font-roboto"}
            `}>
            <img src={imag} className="w-full h-full object-cover opacity-80" />
            <div className="text-gray-200 absolute top-10">
                <Icon size={48} />
            </div>
            <div className="absolute text-1xl md:text-3xl lg:text-2xl top-35">{input}</div>



        </div>
    );
};

export default Card;
