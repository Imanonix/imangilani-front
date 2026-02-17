"use client"
import apiEndPoint from "@/ApiEndPoint";
import { ApiResponse } from "@/types/type";
import { Modal } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


interface IPageProps {
    params: {
        lang: string
        id: number
    }
}
interface IImage {
    id: number
    url: string
}
interface IGallery {
    id: number
    title: string
    description: string
    images: IImage[]
}
export default  function page(params: IPageProps) {
    const { id, lang } = useParams();
    const [isLoading, setIsLoading] = useState<boolean>(true)
    // const res = await fetch(
    //     `${apiEndPoint.baseURL}/api/public/project?id=${id}&lang=${lang}`
    // );
    const [gallery, setGallery] = useState<IGallery>()
    const [selectedImage, setSelectedImage] = useState<string>("")
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [imageList, setImageList] = useState<IImage[]>([])
    const [currentIndex, setCurrentIndex] = useState<number>(0)

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await fetch(`${apiEndPoint.baseURL}/api/public/gallery?id=${id}&lang=${lang}`, {
                    method: "GET"
                })
                const data: ApiResponse<IGallery> = await response.json()
                if (data.status === 200) {
                    setGallery(data.data)
                    setImageList(data.data.images)
                    console.log(data.data)
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
            setSelectedImage(imageList[imageList.length - 1].url)
        }
        else {
            setCurrentIndex((prev) => (prev - 1) % imageList.length)
            setSelectedImage(imageList[currentIndex].url)
        }
    };

    const handleNext = () => {
        if (currentIndex == imageList.length - 1) {
            setCurrentIndex(0)
            setSelectedImage(imageList[0].url)
        }
        else {
            setCurrentIndex((prev) => (prev + 1) % imageList.length)
            setSelectedImage(imageList[currentIndex].url)
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
            <div className="max-w-4xl mx-auto bg-[#222831] rounded-2xl shadow-lg p-6 md:p-10 space-y-6">
                {/* Title */}
                <h1 className="w-full text-center text-3xl font-bold text-white capitalize">
                    {gallery?.title}
                </h1>

                {/* Summary */}
                {gallery?.description && (
                    <p className={`text-white leading-relaxed  ${lang === "fa" ? "text-right" : "text-left"}`}>
                        {gallery.description}
                    </p>
                )}

                <div className="flex flex-wrap max-w-4xl justify-center gap-5">
                    {imageList.map((image, index) => (
                        <img className="w-[45%]  cursor-pointer" key={index} src={`${apiEndPoint.baseURL}${image.url}`} onClick={() => setImage(index)} />
                    ))}
                </div>
                {
                    <Modal
                        open={isOpen}
                        onClose={onClose}
                        className="flex w-full justify-center items-center border-none z-5 bg-[#222831]"
                        onClick={() => setIsOpen(false)}
                    >
                        <div className="flex flex-row items-center justify-center gap-5 w-[80%] h-auto p-4 border-none outline-none ">
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
                                src={`${apiEndPoint.baseURL}${imageList[currentIndex].url}`}
                                className="border max-w-[100%] object-contain rounded-lg border-none"
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
}