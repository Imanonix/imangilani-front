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
            "Crafting visually stunning websites and powerful applications that engage users and deliver seamless experiences. From modern UI design to robust backend solutions, we combine creativity and technology to bring your digital ideas to life.",
        servicesTitle: "Services",
        servicesDescription:
            "We provide full-stack web development, responsive UI/UX design, mobile application solutions, and custom software tailored to your business needs. Our team ensures seamless integration and high-performance solutions.",
        projectsTitle: "Projects",
    },
    de: {
        heroTitle: "Webseiten- & Anwendungsdesign",
        heroDescription:
            "Wir entwickeln visuell ansprechende Webseiten und leistungsstarke Anwendungen, die Nutzer begeistern und reibungslose Erlebnisse bieten. Von modernem UI-Design bis hin zu robusten Backend-Lösungen verbinden wir Kreativität mit Technologie.",
        servicesTitle: "Leistungen",
        servicesDescription:
            "Wir bieten Full-Stack-Webentwicklung, responsives UI/UX-Design, mobile Anwendungslösungen sowie maßgeschneiderte Software für Ihre Geschäftsanforderungen. Unser Team sorgt für nahtlose Integration und hohe Performance.",
        projectsTitle: "Projekte",
    },
    fa: {
        heroTitle: "طراحی وب‌سایت و اپلیکیشن",
        heroDescription:
            "ما وب‌سایت‌ها و اپلیکیشن‌هایی زیبا و قدرتمند طراحی می‌کنیم که کاربران را درگیر کرده و تجربه‌ای روان ارائه می‌دهند. از طراحی مدرن رابط کاربری تا پیاده‌سازی بک‌اند قدرتمند، خلاقیت و تکنولوژی را برای تحقق ایده‌های دیجیتال شما ترکیب می‌کنیم.",
        servicesTitle: "خدمات ما",
        servicesDescription:
            "ما خدمات توسعه فول‌استک وب، طراحی UI/UX واکنش‌گرا، توسعه اپلیکیشن‌های موبایل و نرم‌افزارهای سفارشی متناسب با نیاز کسب‌وکار شما را ارائه می‌دهیم. تمرکز ما بر یکپارچگی و عملکرد بالا است.",
        projectsTitle: "پروژه‌های ما",
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
    // const cookieStore = cookies();
    // const language = ((await cookieStore).get("language")?.value ?? "en") as Lang;
    const projects = await GetProjects(language);
    const t = homeTexts[language];

    console.log(language)
    return (
        <div lang={language} className="w-full flex flex-wrap justify-center" style={{ direction: language === "fa" ? "rtl" : "ltr", fontFamily: language === "fa"? "Vazir" : "Roboto", backgroundImage: 'url("/images/free.jpg")', backgroundSize: "cover" }}>
            <div className="flex flex-col items-center">
                <div className="w-4/5 flex flex-wrap justify-center pt-10 pb-5">
                    <div className="w-4/5 md:w-[45%] flex flex-col justify-center px-4">
                        <h1 className={`text-3xl font-bold mb-8 text-[#F9C74F] ${language === "fa" ? "text-right" : "text-left"}`}>
                            {t.heroTitle}
                        </h1>

                        <p className="text-lg text-justify leading-8">
                            {t.heroDescription}
                        </p>
                    </div>
                    <Wall />
                </div>

                {/* SERVICES */}
                <div className="w-4/5 flex flex-row items-start py-15">
                    <section className="w-1/2 flex flex-col items-start">
                        <h2 className="text-3xl font-bold mt-4 mb-4 text-[#F9C74F]">
                            {t.servicesTitle}
                        </h2>
                        <p className="text-lg text-justify leading-8 mb-6">
                            {t.servicesDescription}
                        </p>
                    </section>

                    {/* <CarouselSlider /> */}
                    <ScrollLine language={language} />
                </div>
            </div>


            {/* PROJECTS */}
            <section className="w-full md:w-4/5 flex flex-col items-start mx-auto pb-10">
                <h2 className="text-3xl font-bold mb-4 text-[#F9C74F]">
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
