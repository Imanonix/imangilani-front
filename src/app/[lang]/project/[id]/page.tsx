'use client'
import apiEndPoint from "@/ApiEndPoint";
import { ApiResponse } from "@/types/type";
import { Box, Modal } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
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
    galleryTitle: string
    description: string
    urls: string[]
}
interface Props {
    params: { id: string; lang: string };
}
export default function ProjectDetailsPage({ params }: Props) {
    const { id, lang } = useParams();
    const [isLoading, setIsLoading] = useState<boolean>(true)
    // const res = await fetch(
    //     `${apiEndPoint.baseURL}/api/public/project?id=${id}&lang=${lang}`
    // );
    const [project, setProject] = useState<IProjectDetailsDTO>()
    const [selectedImage, setSelectedImage] = useState<string>("")
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [imageList, setImageList] = useState<string[]>([])
    const [currentIndex, setCurrentIndex] = useState<number>(0)

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await fetch(`${apiEndPoint.baseURL}/api/public/project?id=${id}&lang=${lang}`, {
                    method: "GET"
                })
                const data: ApiResponse<IProjectDetailsDTO> = await response.json()
                if (data.status === 200) {
                    setProject(data.data)
                    setImageList(data.data.urls)
                    return
                }
            }
            catch { }
            finally {
                setIsLoading(false)
            }
        }; fetchProject();
    }, [lang])


    // const data: ApiResponse<IProjectDetailsDTO> = await res.json();

    // const project: IProjectDetailsDTO = data.data;
    const setImage = (index: number) => {
        setCurrentIndex(index)
        setIsOpen(true)
    }
    const handlePrev = () => {
        if (currentIndex == 0) {
            setCurrentIndex(imageList.length - 1)
            setSelectedImage(imageList[imageList.length - 1])
        }
        else {
            setCurrentIndex((prev) => (prev - 1) % imageList.length)
            setSelectedImage(imageList[currentIndex])
        }
    };

    const handleNext = () => {
        if (currentIndex == imageList.length - 1) {
            setCurrentIndex(0)
            setSelectedImage(imageList[0])
        }
        else {
            setCurrentIndex((prev) => (prev + 1) % imageList.length)
            setSelectedImage(imageList[currentIndex])
        }
    };

    const onClose = () => {
        setIsOpen(false);
    };
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-500">
                {lang === "fa" ? "در حال بارگذاری" : "Loading ..."}
            </div>
        );
    }

    return (
        <section className="bg-[#393E46] min-h-screen py-10 px-4 leading-loose" style={{ fontFamily: lang === "fa" ? "Vazir" : "Roboto" }}>
            <div className="max-w-4xl mx-auto bg-[#4E545C] rounded-2xl shadow-2xl p-6 md:p-10 space-y-6">

                {/* Title */}
                <h1 className="w-full text-center text-3xl font-bold text-white capitalize">
                    {project?.title}
                </h1>

                <span className="flex w-full flex-wrap justify-center items-center gap-2">
                    <FaTags />
                    {project?.projectTags.split(",").filter(item => item !== "").map((tag, index) => (
                        <span key={index} className="px-3 py-1 bg-[#F9C74F] text-black text-xs md:text-sm rounded-full"> {tag} </span>
                    ))}
                </span>
                {/* Meta info */}
                <div className="flex width-full justify-around flex-wrap gap-4 text-sm text-white">
                    <span className="flex items-center gap-2">
                        <FaCalendarAlt />
                        {project !== undefined && new Date(project.projectDate).toLocaleDateString()}
                    </span>

                    {project?.projectDuration && (
                        <span className="px-3 py-1 rounded-full">
                            {project.projectDuration}
                        </span>
                    )}
                </div>

                {/* Summary */}
                {project?.summary && (
                    <p className={`text-white leading-relaxed  ${lang === "fa" ? "text-right" : "text-left"}`}>
                        {project.summary}
                    </p>
                )}

                {/* Body (HTML) */}
                {project?.body && (
                    <div
                        className={`prose prose-teal max-w-none prose-img:rounded-xl prose-a:text-teal-600 ${lang === "fa" ? "text-right" : "text-left"}`}
                        dangerouslySetInnerHTML={{ __html: project.body }}
                    />
                )}

                {/* External link */}
                {project?.projectUrl && (
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
                <div>{project?.galleryTitle}</div>
                <div className="flex flex-wrap max-w-4xl justify-center gap-5">
                    {imageList.map((image, index) => (
                        <img className="w-[45%]  cursor-pointer" key={index} src={`${apiEndPoint.baseURL}${image}`} onClick={() => setImage(index)} />
                    ))}
                </div>
                {
                    <Modal
                        open={isOpen}
                        onClose={onClose}
                        className="flex justify-center items-center border-none z-5 bg-[#222831]"
                        onClick={() => setIsOpen(false)}
                    >
                        <div

                            className="flex flex-row justify-between items-center w-[80%] h-auto p-4 border-none outline-none "
                        >
                            {/* Left Arrow */}
                            <span
                                className="text-[36px] cursor-pointer select-none z-10"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handlePrev();
                                }}
                            >
                                <i className="fa fa-angle-double-left py-3 px-5 rounded-full border-1 hover:border-yellow-400 hover:text-yellow-400" aria-hidden="true"></i>
                            </span>

                            {/* Image */}
                            <img
                                onClick={(e) => e.stopPropagation()}
                                src={`${apiEndPoint.baseURL}${imageList[currentIndex]}`}
                                className="border max-h-[80vh] max-w-[80%] object-contain rounded-lg border-none"
                                alt="gallery"
                            />

                            {/* Right Arrow */}
                            <span
                                className="text-[36px] cursor-pointer select-none z-10"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleNext();
                                }}
                            >
                                <i className="fa fa-angle-double-right py-3 px-5 rounded-full z-10 border-1 hover:border-yellow-400 hover:text-yellow-400" aria-hidden="true"></i>
                            </span>
                            <span
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsOpen(false);
                                }}
                                className="absolute text-2xl top-[5%] right-[5%] -translate-x-1/2 text-white px-5 py-3 rounded-full cursor-pointer border-1 hover:border-yellow-400 hover:text-yellow-400"
                            >
                                <i className="fa fa-close"></i> 

                            </span>
                        </div>
                    </Modal>

                }
            </div>
        </section>
    );
};


