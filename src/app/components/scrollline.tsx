"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Card from "./Card";
import {
    FaCode,
    FaMobileAlt,
    FaPaintBrush,
    FaServer,
    FaTools,
} from "react-icons/fa";
import { fetchGenericFunction, ResponseDataGeneric } from "@/CommonFunction";
import apiEndPoint from "@/ApiEndPoint";
import { IPageDTO } from "@/types/type";

export const serviceIcons = [
    FaCode,
    FaMobileAlt,
    FaPaintBrush,
    FaServer,
    FaTools,
];
export const serviceImages = [
    "/images/web.jpg",
    "/images/mobile.jpg",
    "/images/frontend.jpg",
    "/images/backend.jpg",
    "/images/maintenance.jpg"
]
interface ScrollLineProps {
    language: "en" | "de" | "fa"
}

const ScrollLine = ({ language }: ScrollLineProps) => {
    const [pages, setPages] = useState<IPageDTO[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0)


    /* ================= FETCH ================= */
    useEffect(() => {
        const fetchServices = async () => {
            const response: ResponseDataGeneric<IPageDTO[]> =
                await fetchGenericFunction({
                    url: `${apiEndPoint.baseURL}/api/public/page?lang=${language}`,
                    method: "GET",
                    body: undefined, credentials: undefined
                });

            if (response.status === 200) {
                setPages(response.data.filter((p) => p.position === "sidebar"));
            }
        };

        fetchServices();
    }, [language]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % 5);
        }, 2000);

        return () => clearInterval(interval);
    }, [currentIndex]);
            

    return (
        <div className="flex justify-center mx-auto my-0 
            w-[360px]
            md:w-[600px]
            lg:w-[800px]
            xl:w-[1000px]
            h-[250px]
            md:h-[300px]
            lg:h-[400px]
            xl:h-[500px]
            relative
            ">
            <div className={`flex flex-col overflow-hidden`} >
                {pages.map((item, index) => {
                    const Icon = serviceIcons[index % serviceIcons.length];
                    const Img = serviceImages[index % serviceImages.length];
                    return (
                        <Link
                            key={item.id}
                            href={`/${language}/${item.slug}/${item.id}`}
                        >
                            <Card input={item.title} icon={Icon} imag={Img} currentIndex={currentIndex} />
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default ScrollLine;
