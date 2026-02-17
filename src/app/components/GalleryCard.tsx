import apiEndPoint from "@/ApiEndPoint";
import { IGallery } from "../[lang]/galleries/page";



const GalleryCard = (gallery: IGallery) => {
    return (
            <div className="flex flex-col items-center">
                <h2 className="text-xl p-2 capitalize">{gallery.title}</h2>
                <div className="p-2">{gallery.description}</div>
                <div className="w-[100%] flex flex-row flex-wrap gap-3 justify-center my-4">
                    {gallery.images?.slice(0, 4).map(image => (
                        <img key={image.id} src={`${apiEndPoint.baseURL}${image.url}`} className="w-[48%] hover:scale-105 rounded-md " />
                    ))}
                </div>
            </div>
       
    )
}
export default GalleryCard