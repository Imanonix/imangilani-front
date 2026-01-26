'use client'
import { IHeaderClientProps } from "@/types/type";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { JSX } from "react";
import { FaEnvelope, FaInstagram, FaLinkedin, FaXing } from "react-icons/fa";



export const IconMap: Record<string, JSX.Element> = {
    FaInstagram: <FaInstagram size={24} />,
    FaXing: <FaXing size={24} />,
    FaLinkedin: <FaLinkedin size={24} />,
    FaEmail: <FaEnvelope size={24} />
}

const HeaderClient = ({ pages, socialMediaList, language }: IHeaderClientProps) => {

    const router = useRouter();
    const pathname = usePathname();
    const segments = pathname.split("/");
    const changeLanguage = (newLang: "en" | "fa" | "de") => {
        const segments = pathname.split("/"); // حذف خالی‌ها
        segments[0] = newLang; // فقط اولین segment

        const newPath = "/" + segments.join("/");
        router.push(newPath);
    };
    return (
        <div className="w-full bg-[#222831] sticky top-0 z-50 ">
            <nav className="w-4/5 mx-auto flex px-6 pt-3 text-sm  space-between justify-between ">
                <div>
                    <Link href={"/"} style={{fontFamily: language === "fa"? "Vazir" : "Roboto"}} className="pt-2 px-5 capitalize  cursor-pointer text-l hover:text-[#F9C74F]">{language === "fa" ? "خانه " : "Home"}</Link>
                    {pages.filter(p => p.position === "top").map(p => (
                        <Link key={p.id} href={p.slug ? `/${language}/${p.slug}/${p.id}` : `/${p.url}/${language}/${p.id}`} style={{fontFamily: language === "fa"? "Vazir" : "Roboto"}} className="pt-2 px-5 capitalize cursor-pointer text-l hover:text-[#F9C74F]">{p.title}</Link>
                    ))}

                </div>
                <ul className="flex">
                    <li onClick={() => changeLanguage("en")} className="py-1 px-2  hover:text-[#F9C74F] cursor-pointer">En</li>
                    <li className="py-1">/</li>
                    <li onClick={() => changeLanguage("de")} className="py-1 px-2  hover:text-[#F9C74F] cursor-pointer">De</li>
                    <li className="py-1">/</li>
                    <li onClick={() => changeLanguage("fa")} className="py-1 px-2  hover:text-[#F9C74F] cursor-pointer">Fa</li>
                </ul>
            </nav>
            <hr className="w-4/5 mx-auto"/>
            <nav className="w-4/5 mx-auto flex px-6 py-2 text-sm space-between justify-between">

                <ul className="flex">
                    {
                        pages.filter(p => p.position === "bottom").map(item => (
                            <Link key={item.id} href={`/${language}/${item.slug}/${item.id}`} style={{fontFamily: language === "fa"? "Vazir" : "Roboto"}} className="py-1 px-5 capitalize cursor-pointer text-l hover:text-[#F9C74F]">{item.title}</Link>
                        ))
                    }
                </ul>
                <ul className="flex">
                    {socialMediaList.map(item => (
                        <Link key={item.id} href={item.url} className="py-1 px-3 hover:text-[#F9C74F] cursor-pointer" target="_blank" rel="noopener noreferrer"> {IconMap[item.title]} </Link>
                    ))}
                </ul>
            </nav>
        </div>
    )
}
export default HeaderClient