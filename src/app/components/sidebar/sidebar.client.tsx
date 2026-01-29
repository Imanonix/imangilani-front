"use client";

import { IPageDTO, ISocialMedia, Language } from "@/types/type";
import { Langar } from "next/font/google";
import Link from "next/link";
import { JSX } from "react";
import { FaEnvelope, FaInstagram, FaLinkedin, FaXing } from "react-icons/fa";

const technologies = [
    "React",
    "TypeScript",
    "Next.js",
    "ASP.NET Core",
    "SQL Server",
    "Docker",
    "Git",
];

export const IconMap: Record<string, JSX.Element> = {
    FaInstagram: <FaInstagram size={24} />,
    FaXing: <FaXing size={24} />,
    FaLinkedin: <FaLinkedin size={24} />,
    FaEmail: <FaEnvelope size={24} />,
};

interface Props {
    language: "en" | "fa" | "de";
    pages: IPageDTO[];
    socialMediaList: ISocialMedia[];
}

type Lang = "en" | "fa" | "de"
const content: Record<Lang,
    {
        service: string
        tech: string
        link: string
        contact: string
        availability: string
    }
> = {
    en: {
        service: "Services",
        tech: "Technologies",
        link: " ⬇ Download CV",
        contact: "Quick Contact",
        availability: "Available for new projects"
    },
    de: {
        service: "Services",
        tech: "Technologies",
        link: " ⬇ Download Lebenslauf",
        contact: "Quick Contact",
        availability: "Verfügbar für neue Projekte"
    },
    fa: {
        service: "خدمات",
        tech: "فناوری‌ها",
        link: "⬇ دانلود رزومه",
        contact: "ارتباط",
        availability: "آماده پذیرش پروژه‌های جدید"
    }

}

const SidebarClient = ({ language, pages, socialMediaList }: Props) => {
    const dir = language === "fa" ? "rtl" : "ltr";
    return (
        <aside
            style={{ fontFamily: language === "fa" ? "Vazir" : "Roboto" }}
            dir={dir}
            className="
        sticky top-24 h-fit
        w-full
        md:w-2/5
        lg:w-1/4 
        xl:w-1/5
        border border-[#F9C74F]
        bg-[#222831]
        p-3 lg:p-4
        m-x-2
        max-md:static max-md:w-[94%] max-md:mx-auto max-md:mt-8
        flex flex-col gap-7
      "
        >
            {/* Services */}
            <section>
                <h3 className="mb-4 text-[13px] font-semibold tracking-widest uppercase text-white">
                    {content[language].service}
                </h3>
                <ul
                    className={`
            flex flex-col text-sm list-disc
            ${language === "fa" ? "pr-4 pl-0" : "pl-4 pr-0"}
          `}
                >
                    {pages.map((p) => (
                        <li className="my-2" key={p.id}>
                            <Link
                                href={`/${language}/${p.slug}/${p.id}`}
                                className="hover:text-[#F9C74F] transition-colors"
                            >
                                {p.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Technologies */}
            <section>
                <h3 className="mb-4 text-[13px] font-semibold tracking-widest uppercase text-white">
                    {content[language].tech}
                </h3>
                <div className="flex flex-wrap gap-2">
                    {technologies.map((tech) => (
                        <span
                            key={tech}
                            className="text-xs px-2.5 py-1.5 rounded bg-gray-100 text-gray-900"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </section>

            {/* Quick Contact */}
            <section>
                <h3 className="mb-4 text-[13px] font-semibold tracking-widest uppercase text-white">
                    {content[language].contact}
                </h3>

                <a
                    href="mailto:hello@example.com"
                    className="block mb-3 text-sm hover:underline"
                >
                    hello@example.com
                </a>

                <div className="flex gap-3">
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
            </section>

            {/* Download */}
            <section>
                <a
                    href="/portfolio.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
            block text-center text-sm font-medium
            px-4 py-3 rounded-xl
            bg-gray-100 text-[#38383B]
            hover:opacity-90 transition
          "
                >
                    {content[language].link}
                </a>
            </section>

            {/* Availability */}
            <section className="flex items-center gap-2 text-sm font-medium text-white">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                {content[language].availability}
            </section>
        </aside>
    );
};

export default SidebarClient;
