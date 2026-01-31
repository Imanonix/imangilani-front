import apiEndPoint from "@/ApiEndPoint";
import { ApiResponse } from "@/types/type";
import { FaCalendarAlt, FaTags, FaExternalLinkAlt } from "react-icons/fa";

interface IProjectDetailsDTO {
    id: number;
    projectType: string;
    projectUrl?: string | null;
    projectDate: string;
    projectDuration?: string | null;
    projectTags: string;
    isVisible: boolean;
    title?: string | null;
    summary?: string | null;
    body?: string | null;
}
interface Props {
    params: Promise<{ id: string; lang: string }>;
}
export default async function ProjectDetailsPage({ params }: Props){
    const { id, lang } = await params;

    const res = await fetch(
        `${apiEndPoint.baseURL}/api/public/project?id=${id}&lang=${lang}`
    );

    const data: ApiResponse<IProjectDetailsDTO> = await res.json();

    const project:IProjectDetailsDTO = data.data;

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-500">
                {lang === "fa" ? "پروژه‌ای یافت نشد" : "Project not found"}
            </div>
        );
    }

    return (
        <section className="bg-[#393E46] min-h-screen py-10 px-4 leading-loose" style={{fontFamily: lang === "fa"? "Vazir" : "Roboto" }}>
            <div className="max-w-4xl mx-auto bg-[#222831] rounded-2xl shadow-lg p-6 md:p-10 space-y-6">

                {/* Title */}
                <h1 className="w-full text-center text-3xl font-bold text-white">
                    {project.title}
                </h1>

                <span className="flex w-full flex-wrap justify-center items-center gap-2">
                    <FaTags />
                    {project.projectTags.split(",").filter(item => item !== "").map((tag, index) => (
                        <span key={index} className="px-3 py-1 bg-[#F9C74F] text-black text-xs md:text-sm rounded-full"> {tag} </span>
                    ))}
                </span>
                {/* Meta info */}
                <div className="flex width-full justify-around flex-wrap gap-4 text-sm text-white">
                    <span className="flex items-center gap-2">
                        <FaCalendarAlt />
                        {new Date(project.projectDate).toLocaleDateString()}
                    </span>

                    {project.projectDuration && (
                        <span className="px-3 py-1 rounded-full">
                            {project.projectDuration}
                        </span>
                    )}
                </div>

                {/* Summary */}
                {project.summary && (
                    <p className={`text-white leading-relaxed  ${lang === "fa" ? "text-right" : "text-left"}`}>
                        {project.summary}
                    </p>
                )}

                {/* Body (HTML) */}
                {project.body && (
                    <div
                        className={`prose prose-teal max-w-none prose-img:rounded-xl prose-a:text-teal-600 ${lang === "fa" ? "text-right" : "text-left"}`}
                        dangerouslySetInnerHTML={{ __html: project.body }}
                    />
                )}

                {/* External link */}
                {project.projectUrl && (
                    <a
                        href={project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                            inline-flex items-center gap-2
                            text-black bg-[#F9C74F] hover:bg-[#fdbc23]
                            px-6 py-3 rounded-xl transition
                        "
                    >
                        <FaExternalLinkAlt />
                        {lang === "fa" ? "مشاهده پروژه" : "View Project"}
                    </a>
                )}
            </div>
        </section>
    );
};


