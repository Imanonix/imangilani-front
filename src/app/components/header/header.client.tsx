'use client'
import { IHeaderClientProps } from "@/types/type";
import { navigate } from "next/dist/client/components/segment-cache/navigation";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { JSX, useEffect, useState } from "react";
import { FaEnvelope, FaInstagram, FaLinkedin, FaXing, FaBars } from "react-icons/fa";



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
    const [isOpen, setIsOpen] = useState<boolean>(false)

    useEffect(() => {
        setIsOpen(false)
    },[pathname])

    const goToHome = () => {
        router.push("/")
    }
    return (
        <div className="w-full bg-[#222831] sticky top-0 z-50 ">
            <nav className="w-[90%] mb:w-4/5 mx-auto flex px-6 pt-3 text-sm  space-between justify-between ">
                <div>
                    <span onClick={() => setIsOpen(true)} className=" capitalize inline-block  md:hidden cursor-pointer text-l hover:text-[#F9C74F]">
                        <FaBars size={30} />
                    </span>
                    <span><img className="absolute top-2 inset-x-1/5 md:inset-x-1/2 cursor-pointer" src={"/logo.png"} onClick={goToHome} width={100} height={30}/></span>
                    <Link href={"/"} style={{ fontFamily: language === "fa" ? "Vazir" : "Roboto" }} className="pt-2 px-5 capitalize hidden md:inline-block cursor-pointer text-l hover:text-[#F9C74F]">{language === "fa" ? "خانه " : "Home"}</Link>
                    {pages.filter(p => p.position === "top").map(p => (
                        <Link key={p.id} href={p.slug ? `/${language}/${p.slug}/${p.id}` : `/${p.url}/${language}/${p.id}`} style={{ fontFamily: language === "fa" ? "Vazir" : "Roboto" }} className="hidden md:inline-block pt-2 px-5 capitalize cursor-pointer text-l hover:text-[#F9C74F]">{p.title}</Link>
                    ))}

                </div>
                <ul className="flex">
                    <li onClick={() => changeLanguage("en")} className="py-1 px-2  hover:text-[#F9C74F] cursor-pointer" style={{ color: language === "en" ? "#F9C74F" : "fff" }}>En</li>
                    <li className="py-1">/</li>
                    <li onClick={() => changeLanguage("de")} className="py-1 px-2  hover:text-[#F9C74F] cursor-pointer" style={{ color: language === "de" ? "#F9C74F" : "fff" }}>De</li>
                    <li className="py-1">/</li>
                    <li onClick={() => changeLanguage("fa")} className="py-1 px-2  hover:text-[#F9C74F] cursor-pointer" style={{ color: language === "fa" ? "#F9C74F" : "fff" }}>Fa</li>
                </ul>
            </nav>
            <hr className="w-[90%] mb:w-4/5 mx-auto my-2" />
            <nav className="w-[90%] mb:w-4/5 mx-auto flex px-6 py-2 text-sm space-between justify-between">

                <ul className="flex">
                    {
                        pages.filter(p => p.position === "bottom").map(item => (
                            <Link key={item.id} href={`/${language}/${item.slug}/${item.id}`} style={{ fontFamily: language === "fa" ? "Vazir" : "Roboto" }} className="hidden md:inline-block py-1 px-5 capitalize cursor-pointer text-l hover:text-[#F9C74F]">{item.title}</Link>
                        ))
                    }
                </ul>
                {/* <Link href={`/${language}/galleries`}>Gallery</Link> */}
                <ul className="flex">
                    {socialMediaList.map(item => (
                        <Link key={item.id} href={item.url} className="py-1 px-3 hover:text-[#F9C74F] cursor-pointer" target="_blank" rel="noopener noreferrer"> {IconMap[item.title]} </Link>
                    ))}
                </ul>
            </nav>
            <div className={`flex flex-col absolute top-0 left-0 h-screen w-80 bg-[#F9C74F] z-10 transition-transform duration-300 ease-in-out ${isOpen? "translate-x-0" : "-translate-x-full"}`}>
                <div className="flex justify-between px-5 py-5">
                    <img src={"/logo.png"} width={120} height={30} onClick={goToHome}/>
                    <div className="text-2xl text-black font-bold" onClick={() => setIsOpen(false)}>X</div>
                </div>
                <Link href={"/"} style={{ fontFamily: language === "fa" ? "Vazir" : "Roboto" }} className="pt-2 px-5 font-bold capitalize cursor-pointer text-l text-[#303030] hover:text-[#000000]">{language === "fa" ? "خانه " : "Home"}</Link>
                {pages.filter(p => p.position === "top").map(p => (
                    <Link key={p.id} href={p.slug ? `/${language}/${p.slug}/${p.id}` : `/${p.url}/${language}/${p.id}`} style={{ fontFamily: language === "fa" ? "Vazir" : "Roboto" }} className="pt-2 px-5 font-bold capitalize cursor-pointer text-l text-[#303030] hover:text-[#000000]">{p.title}</Link>
                ))}
                {pages.filter(p => p.position === "bottom").map(item => (
                    <Link key={item.id} href={`/${language}/${item.slug}/${item.id}`} style={{ fontFamily: language === "fa" ? "Vazir" : "Roboto" }} className="py-1 px-5 font-bold capitalize cursor-pointer text-l text-[#303030] hover:text-[#000000]">{item.title}</Link>
                ))}
            </div>
        </div>
    )
}
export default HeaderClient