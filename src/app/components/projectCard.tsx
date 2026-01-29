'use client'
import Link from "next/link";
import { FaExternalLinkAlt, FaFolderOpen, FaCode } from "react-icons/fa";
import { useContext } from "react";
import { LanguageContext, LanguageContextType } from "../providers/languageContext";
import { IProjectsPreviewDTO } from "@/types/type";

const texts = {
    en: {
        project: "Project",
        visit: "Visit",
        details: "Details",
    },
    fa: {
        project: "پروژه",
        visit: "مشاهده",
        details: "جزئیات",
    },
    de: {
        project: "Projekt",
        visit: "Besuchen",
        details: "Details",
    },
};

const ProjectCard = (project: IProjectsPreviewDTO) => {
    const { language } = useContext<LanguageContextType>(LanguageContext);
    const t = texts[language];

    const tagList = project.projectTags.split(",").filter(item => item !== "");

    return (
        <div className="
            flex flex-col bg-[#222831] p-6 rounded shadow-md border border-[#C2C8CC]
            hover:shadow-xl hover:-translate-y-1 transition-all duration-300
            sm:w-[90%] md:w-[48%]
        ">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h5 className=" font-bold text-xl flex items-center gap-2">
                    <FaFolderOpen /> {t.project}
                </h5>

                <a
                    href={project.projectUrl ? project.projectUrl : "/"}
                    target="_blank"
                    className="text-sm flex items-center gap-1 text-[#F9C74F]"
                >
                    {t.visit} <FaExternalLinkAlt />
                </a>
            </div>

            {/* Title */}
            <p className="text-lg font-semibold mb-2 text-center">
                {project.title}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 justify-center m-4">
                {tagList.map((tag, index) => (
                    <span
                        key={index}
                        className="px-3 py-1 bg-[#1B1F24] text-white rounded-md border-1"
                        style={{ fontSize: "11px", fontWeight:"600" }}
                    >
                        {tag}
                    </span>
                ))}
            </div>

            {/* Short Description */}
            <p className=" text-sm leading-6 my-4">
                {project.summary}
            </p>

            <Link
                href={`/${language}/project/${project.id}`}
                className="
                    border-1 border-white hover:bg-[#fff] hover:text-[#38383B]
                    p-2  mt-auto mx-auto w-1/2 cursor-pointer 
                    flex items-center justify-center gap-2 transition
                "
            >
                <FaCode /> {t.details}
            </Link>
        </div>
    );
};

export default ProjectCard;
