import apiEndPoint from "@/ApiEndPoint"
import GalleryCard from "@/app/components/GalleryCard"
import { ResponseDataGeneric } from "@/CommonFunction"
import Link from "next/link"



interface IPageProps {
    params: Promise<{
        lang: "en" | "de" | "fa"
    }>
}
interface IImage {
    id: number
    url: string
}

export interface IGallery {
    id: number
    title: string
    description: string
    images: IImage[]
}


export default async function Page({ params }: IPageProps) {
    const { lang } = await params

    const res = await fetch(
        `${apiEndPoint.baseURL}/api/galleries?lang=${lang}`,
        { cache: "no-store" }
    )
    console.log(res)
    const galleries: ResponseDataGeneric<IGallery[]> = await res.json()
    return (
        <div className="bg-[#393E46] flex wrap justify-center gap-10 py-10">
            {
                galleries.data.map((gallery, index) => (
                    <Link key={gallery.id} href={`/${lang}/galleries/${gallery.id}`} className="w-[45%] bg-[#222831] shadow-2xl p-4 flex flex-col items-center rounded-[5%] cursor-pointer">
                        <GalleryCard key={gallery.id} id={gallery.id} title={gallery.title} description={gallery.description} images={gallery.images} />
                    </Link>
                )
                )}
        </div>

    )
}