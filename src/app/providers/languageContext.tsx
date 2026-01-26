"use client";

import { createContext, FunctionComponent, ReactNode, useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation";



type Language = 'en' | 'fa' | 'de'

export interface LanguageContextType {
    language: Language
    setLanguage: (input: Language) => void
    direction: 'ltr' | 'rtl'
}

export const LanguageContext = createContext<LanguageContextType>({
    language: "en",
    setLanguage: (input: Language) => { },
    direction: "ltr"
})


export interface LanguageContextProps {
    children: ReactNode
    initialLanguage: Language;
}


export const LanguageContextProvider: FunctionComponent<LanguageContextProps> = ({ children, initialLanguage }) => {
    const [language, setLanguageState] = useState<Language>(initialLanguage)

    const setLanguage = (lang: Language) => {
        document.cookie = `language=${lang}; path=/; max-age=31536000`;
        setLanguageState(lang);

        // ساده، امن، بدون loop
        window.location.reload();
    };


    return (
        <LanguageContext.Provider value={{ language, setLanguage, direction: language === 'fa' ? 'rtl' : 'ltr', }}>
            {children}
        </LanguageContext.Provider>
    )
} 