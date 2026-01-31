'use client'
import apiEndPoint from '@/ApiEndPoint'
import ProjectCard from '@/app/components/projectCard'
import { LanguageContext, LanguageContextType } from '@/app/providers/languageContext'
import { ApiResponse, IProjectsPreviewDTO } from '@/types/type'
import { useParams } from 'next/navigation'
import { stringify } from 'querystring'
import { useContext, useEffect, useState } from 'react'
type Lang = "en" | "de" | "fa"
const content:Record<Lang, {
    title: string
    description: string
}>
= {
    en:{
        title: "Portfolio",
        description: "Here you can explore a selection of my projects.These works reflect my skills, experience, and professional approach."
    },
    de:{
        title: "Portfolio",
        description: "Hier können Sie eine Auswahl meiner Projekte sehen.Diese Arbeiten spiegeln meine Fähigkeiten, Erfahrungen und meinen Arbeitsstil wider."
    },
    fa:{
        title: "نمونه‌کارها",
        description: "در این بخش می‌توانید برخی از نمونه‌کارهای منتخب را مشاهده کنید.این پروژه‌ها نمایانگر مهارت‌ها، تجربه‌ها و سبک کاری هستند."
    }
}


const page = () => {
    const {lang, id} = useParams()
    
    const [, setIsLoading] = useState<boolean>(true)
    const [projects, setProjects] = useState<IProjectsPreviewDTO[]>([])
    useEffect(() => {
        const fetchProject = async () => {
            setIsLoading(true)
            try {
                const response = await fetch(`${apiEndPoint.baseURL}/api/public/projects?lang=${lang}`, {
                    method: "GET"
                })
                const data: ApiResponse<IProjectsPreviewDTO[]> = await response.json()
                if (data.status === 200) {
                    setProjects(data.data)
                    return
                }
            }
            catch { }
            finally {
                setIsLoading(false)
            }
        }; fetchProject();
    }, [lang])

    return (
        <div className='flex flex-col min-h-[70vh] justify-start items-center bg-[#393E46]'>
            <div className=' w-[90%] mx-auto rounded-2xl px-2 items-center pb-2 md:pb-5 space-y-8'>
                <h1 style={{fontFamily: lang === "fa"? "Vazir" : "Roboto"}} className={`text-3xl md:text-4xl pt-9 pb-6 my-0 text-[#F9C74F] font-bold ${lang === "fa" ? "text-right" : "text-left"}`}>
                    {content[lang as "de" | "en" | "fa"].title}
                </h1>
                <div className="w-full h-[2px] bg-[#C2C8CC] rounded-full" />
                <div>{content[lang as "de" | "en" | "fa"].description}</div>
            </div>
            <div className="flex flex-wrap w-[90%] justify-center mx-auto my-8 gap-4 ">
                {projects.map(project => (
                    <ProjectCard key={project.id} {...project} />
                ))}
            </div>
        </div>
    )
}

export default page
