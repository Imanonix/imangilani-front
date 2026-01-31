"use client";

import Link from "next/link";
import { FaLinkedin, FaXing, FaInstagram, FaEnvelope, FaPhone } from "react-icons/fa";
import { IFooterClientProps } from "@/types/type";
import { JSX } from "react";

export const IconMap: Record<string, JSX.Element> = {
    FaInstagram: <FaInstagram size={24} />,
    FaXing: <FaXing size={24} />,
    FaLinkedin: <FaLinkedin size={24} />,
    FaEmail: <FaEnvelope size={24} />,
};

const FooterClient = ({ pages, socialMediaList, language }: IFooterClientProps) => {
    const aboutText = {
        en: "I develop high-quality web and software solutions with a focus on clean design, performance, and modern technologies.",
        fa: "من راهکارهای وب و نرم‌افزاری با کیفیت بالا با تمرکز بر طراحی تمیز، عملکرد و فناوری‌های مدرن توسعه می‌دهم.",
        de: "Ich entwickle hochwertige Web- und Softwarelösungen mit Fokus auf sauberes Design, Performance und moderne Technologien."
    };

    const dir = language === "fa" ? "rtl" : "ltr";

    return (
        <footer
            dir={dir}
            style={{ fontFamily: language === "fa" ? "Vazir" : "Roboto", fontSize: "17px" }}
            className="w-full bg-[#222831] text-white px-4 pt-12 pb-4 flex flex-col gap-8 border-t-2 border-[#F9C74F]"

        >
            {/* Grid */}
            <div className="max-w-[1200px] mx-auto flex flex-wrap justify-between gap-8">
                {/* About */}
                <div className="flex-1 min-w-[200px]">
                    <h4 className="font-bold mb-4 text-[#C2C8CC]">
                        {language === "fa" ? "درباره ما" : language === "de" ? "Über" : "About"}
                    </h4>
                    <p className="leading-relaxed">{aboutText[language]}</p>
                </div>

                {/* Services */}
                <div className="flex-1 min-w-[200px]">
                    <h4 className="font-bold mb-4 text-[#C2C8CC]">
                        {language === "fa" ? "خدمات ما" : language === "de" ? "Unsere Leistungen" : "Services"}
                    </h4>
                    {pages
                        .filter((p) => p.position === "sidebar")
                        .map((item) => (
                            <Link
                                key={item.id}
                                href={`/${language}/${item.slug}/${item.id}`}
                                className="block mb-2 hover:text-[#F9C74F] transition-colors"
                            >
                                {item.title}
                            </Link>
                        ))}
                </div>

                {/* Contact */}
                <div className="flex-1 min-w-[200px]">
                    <h4 className="font-bold mb-4 text-[#C2C8CC]">
                        {language === "fa" ? "ارتباط با ما" : language === "de" ? "Kontakt" : "Contact"}
                    </h4>

                    <p className="flex items-center gap-2 mb-2">
                        <FaEnvelope />
                        info@example.com
                    </p>

                    <p className="flex items-center gap-2 mb-4">
                        <FaPhone />
                        +49 163 1394782
                    </p>

                    <div className="flex gap-4">
                        {socialMediaList.map((item) => (
                            <Link
                                key={item.id}
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-[#F9C74F] transition-colors"
                            >
                                {IconMap[item.title]}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Divider */}
            <hr className="w-[80%] h-px bg-white/30 rounded mx-auto" />

            {/* Copyright */}
            <p className="text-center text-sm text-[#F9C74F]">
                © {new Date().getFullYear()} imangilani.com.{" "}
                {language === "fa"
                    ? "تمام حقوق محفوظ است"
                    : language === "de"
                        ? "Alle Rechte vorbehalten"
                        : "All rights reserved"}
                .
            </p>
        </footer>
    );
};

export default FooterClient;
