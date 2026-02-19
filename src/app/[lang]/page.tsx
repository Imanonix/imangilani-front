import Image from "next/image";
import apiEndPoint from "@/ApiEndPoint";
import { cookies } from "next/headers";
import Wall from "../components/wall";
import CarouselSlider from "../components/Carousel";
import ProjectCard from "../components/projectCard";
import { ApiResponse, IProjectsPreviewDTO } from "@/types/type";
import ScrollLine from "../components/scrollline";

type Lang = "fa" | "en" | "de";

const homeTexts: Record<
    Lang,
    {
        heroTitle: string;
        heroDescription: string;
        servicesTitle: string;
        servicesDescription: string;
        projectsTitle: string;
    }
> = {
    en: {
        heroTitle: "Website & Application Design",
        heroDescription:
            "I design visually stunning websites and powerful applications that engage users and deliver seamless experiences. From modern UI design to robust backend solutions, I combine creativity and technology to bring digital ideas to life.",
        servicesTitle: "Services",
        servicesDescription:
            "I provide full-stack web development, responsive UI/UX design, mobile application solutions, and custom software tailored to specific business needs, ensuring seamless integration and high performance.",
        projectsTitle: "Portfolio",
    },

    de: {
        heroTitle: "Webseiten- & Anwendungsdesign",
        heroDescription:
            "Ich entwerfe visuell ansprechende Webseiten und leistungsstarke Anwendungen, die Nutzer begeistern und reibungslose Erlebnisse bieten. Von modernem UI-Design bis hin zu robusten Backend-Lösungen verbinde ich Kreativität mit Technologie.",
        servicesTitle: "Leistungen",
        servicesDescription:
            "Ich biete Full-Stack-Webentwicklung, responsives UI/UX-Design, mobile Anwendungslösungen sowie maßgeschneiderte Software, abgestimmt auf spezifische Geschäftsanforderungen, mit Fokus auf nahtlose Integration und hohe Performance.",
        projectsTitle: "Portfolio",
    },

    fa: {
        heroTitle: "طراحی وب‌سایت و اپلیکیشن",
        heroDescription:
            "من وب‌سایت‌ها و اپلیکیشن‌هایی زیبا و قدرتمند طراحی می‌کنم که کاربران را درگیر کرده و تجربه‌ای روان ارائه می‌دهند. از طراحی مدرن رابط کاربری تا پیاده‌سازی بک‌اند قدرتمند، خلاقیت و فناوری را برای تحقق ایده‌های دیجیتال ترکیب می‌کنم.",
        servicesTitle: "خدمات",
        servicesDescription:
            "من خدمات توسعه فول‌استک وب، طراحی UI/UX واکنش‌گرا، توسعه اپلیکیشن‌های موبایل و نرم‌افزارهای سفارشی متناسب با نیازهای خاص کسب‌وکار ارائه می‌دهم و بر یکپارچگی و عملکرد بالا تمرکز دارم.",
        projectsTitle: "نمونه‌کارها",
    },
};



const GetProjects = async (language: string): Promise<IProjectsPreviewDTO[]> => {
    const res = await fetch(
        `${apiEndPoint.baseURL}/api/public/projects?lang=${language}`,
        { cache: "no-store" }
    );
    const projects: ApiResponse<IProjectsPreviewDTO[]> = await res.json();
    return projects.data;
};


export default async function Home({ params }: { params: { lang: Lang }; }) {
    const { lang } = await params;
    const language = lang as "en" | "fa" | "de";
    const projects = await GetProjects(language);
    const t = homeTexts[language];

    return (
        <div lang={language} className="w-full flex flex-wrap justify-center" style={{ direction: language === "fa" ? "rtl" : "ltr", fontFamily: language === "fa" ? "Vazir" : "Roboto", backgroundColor: "#393E46" }}>
            <div className="flex flex-col w-full items-center">
                <div className="w-[90%] md:w-4/5 flex-col flex-wrap items-center justify-center pt-10 pb-5 mb-20 md:mb-30 lg:mb-40">
                    <div className="w-[100%] flex flex-col justify-center">
                        <h1 className={`text-2xl md:text-3xl font-bold mb-8 text-[#F9C74F] ${language === "fa" ? "text-right" : "text-left"}`}>
                            {t.heroTitle}
                        </h1>
                        <p className="text-lg leading-8">
                            {t.heroDescription}
                        </p>
                    </div>
                    <Wall />
                </div>

                {/* SERVICES */}
                <div className="w-[90%] md:w-4/5 flex flex-col items-center justify-center pb-15 lg:mt-14">
                    <h2 className="self-start text-2xl md:text-3xl font-bold mt-4 mb-4 text-[#F9C74F]">
                        {t.servicesTitle}
                    </h2>
                    <div className="flex flex-col lg:flex-row items-start">
                        <p className="lg:w-[48%] text-lg leading-8 mb-6">
                            {t.servicesDescription}
                        </p>
                        <ScrollLine language={language} />
                    </div>
                </div>
            </div>

            {/* PROJECTS */}
            <section className="w-[90%] md:w-4/5 flex flex-col items-start mx-auto pb-10">
                <h2 className="text-2xl md:text-3xl font-bold  text-[#F9C74F]">
                    {t.projectsTitle}
                </h2>

                <div className="flex flex-wrap justify-center mx-auto my-8 gap-4">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} {...project} />
                    ))}
                </div>
            </section>
        </div>
    );
}
