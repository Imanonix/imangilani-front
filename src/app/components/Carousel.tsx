"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Card from "./Card";
import { LanguageContext } from "../providers/languageContext";
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

const CarouselSlider = () => {
    const [width, setWidth] = useState<number | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [pages, setPages] = useState<IPageDTO[]>([]);
    const { language } = useContext(LanguageContext);

    const touchStartX = useRef(0);
    const touchEndX = useRef(0);
    useEffect(() => {
        const updateWidth = () => setWidth(window.innerWidth);

        updateWidth(); // مقدار اولیه
        window.addEventListener("resize", updateWidth);

        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    const translatePercent = () => {
        if (!width) return 0;
        if (width >= 992) return currentIndex * 20;
        if (width >= 768) return currentIndex * 33.33;
        return currentIndex * 50;
    };
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

    /* ================= SLIDER LOGIC ================= */
    const next = () => {
        setCurrentIndex((prev) => Math.min(prev + 1, pages.length - 1));
    };

    const previous = () => {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
    };

    /* ================= TOUCH ================= */
    const onTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const onTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const onTouchEnd = () => {
        const diff = touchStartX.current - touchEndX.current;
        if (Math.abs(diff) < 50) return;

        diff > 0 ? next() : previous();
    };

    /* ================= RESPONSIVE TRANSLATE ================= */

    return (
        <div className="flex justify-center w-4/5 mx-auto mb-8">
            <div className="relative w-full overflow-hidden">
                {/* LEFT BUTTON */}
                <button
                    onClick={previous}
                    disabled={currentIndex === 0}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-10
                     w-10 h-10 rounded-full border border-white
                     bg-white/20 text-2xl cursor-pointer
                     transition hover:scale-110"
                >
                    ‹
                </button>

                {/* SLIDER */}
                <div
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                    className="flex w-full gap-2 transition-transform duration-500 ease-in-out"
                    style={{
                        transform: `translateX(-${translatePercent()}%)`,
                    }}
                >
                    {pages.map((item, index) => {
                        const Icon = serviceIcons[index % serviceIcons.length];
                        return (
                            <Link
                                key={item.id}
                                href={`/${language}/${item.slug}/${item.id}`}
                                className="w-full"
                            >
                                {/* <Card input={item.title} icon={Icon} currentIndex={currentIndex} /> */}
                            </Link>
                        );
                    })}
                </div>

                {/* RIGHT BUTTON */}
                <button
                    onClick={next}
                    disabled={currentIndex >= pages.length - 1}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-10
                     w-10 h-10 rounded-full border border-white
                     bg-white/20 text-2xl cursor-pointer
                     transition hover:scale-110"
                >
                    ›
                </button>
            </div>
        </div>
    );
};

export default CarouselSlider;
