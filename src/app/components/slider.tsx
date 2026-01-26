"use client"

import { FunctionComponent, useEffect, useState } from "react"

const slides = [
    {
        id: 1,
        descriptionFa: "",
        descriptionEn: "",
        imageUrl: "https://7aban.org/upload/slides/f4d3b7aa-5c84-453d-80aa-4aa2f5ff98ca.webp",
        order: 1,
        targetUrl: ""
    }, {
        descriptionFa: "",
        descriptionEn: "",
        imageUrl: "https://7aban.org/upload/slides/85a0ad91-f30c-42b3-8539-2a0b5900affe.webp",
        order: 1,
        targetUrl: ""
    }

]
export interface SlideDTO {
    id: number
    descriptionFa: string
    descriptionEn: string
    imageUrl: string
    order: number
    targetUrl: string
}


const Slider: FunctionComponent<{}> = ({ }) => {

    const [error,] = useState<boolean>(false)

    const [isPaused,] = useState<boolean>(false)

    const [currentImageIndex, setCurrentImageIndex] = useState(0);


    useEffect(() => {
        if (isPaused) return;

        const timer = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [isPaused, slides.length]);

    return (
        <>
            {!error &&
                <div className='w-screen flex justify-center relative '>
                    <div className='flex w-screen h-auto overflow-hidden' >
                        {slides?.map((item) => (
                            <div key={item.id} className='flex-none basis-full relative ' style={{ transform: `translateX(${-100 * currentImageIndex}%)` }} >
                                <img src={`${item.imageUrl}`} alt={item.descriptionFa || "slide"} />
                                <text className='absolute w-4/5 top-14' style={{ direction: "ltr" }}>
                                    {item.targetUrl && (
                                        <a className='inline-block p-4 bg-yellow-400' href={item.targetUrl} target="_blank" rel="noopener noreferrer">
                                            { }
                                        </a>
                                    )}
                                </text>

                            </div>
                        ))}
                    </div>

                    <div className='absolite bottom-8 z-10 self-center' >
                        {slides?.map((_, index) => (
                            <button className=' w-3 h-2 border-1' style={{ backgroundColor: index === currentImageIndex ? "#163860" : "transparent" }} key={index} onClick={() => setCurrentImageIndex(index)}></button>
                        ))}
                    </div>

                </div>
            }
        </>

    )
}

export default Slider


