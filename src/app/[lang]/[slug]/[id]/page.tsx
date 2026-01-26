
import apiEndPoint from "@/ApiEndPoint"
import Sidebar from "@/app/components/sidebar";
import { ResponseDataGeneric } from "@/CommonFunction"
import { IContent } from "@/types/type";

// export const Body = styled.div<{ lang: string }>`
//     font-size: 1rem;
//     line-height: 1.9;
//     text-align: justify;
//     /* direction: ${({ lang }) => (lang === "fa" ? "rtl" : "ltr")}; */
//     text-align: justify;
//     // استایل مخصوص نوشته زیر عکس
//     .image-caption {
//         text-align: center !important; /* لغو کردن text-align: justify کل کانتینر */
//         display: block;
//         width: 100%;
//         margin-top: -5px;      /* نزدیک شدن به عکس قبلی */
//         margin-bottom: 1.5rem; /* فاصله از پاراگراف بعدی */
//         font-size: 0.85rem;    /* کمی کوچک‌تر از متن اصلی */
//         color: #666;           /* رنگ کمی ملایم‌تر */
//         font-weight: 500;
//     }
//     .footnote-anchor {
//         vertical-align: super;
//         font-size: 0.85rem;
//         font-weight: bold;
//         text-decoration: none;
//         padding: 0 2px;
//         color: #4db3a5; 
//     }
//     p {
//         padding: 0 0;
//         margin-bottom: 1rem;
//         width: calc(100%);
//     }

//     img {
//         width: 70%;
//         border-radius: 8px;
//         margin: 1rem 0;
//         display: block;
//         margin: 10px auto;
//     }

//         a {
//             //color: #1a73e8;
//             cursor: pointer;
//             font-size: 13px;
//             font-weight:600;
//     }

//     ul {
//         list-style-type: disc;
//         margin-right: 30px;
//     }
//     iframe[src*="youtube.com"],
//     iframe[src*="youtu.be"],
//     iframe[src*="twitter.com"] {
//         width: 100% !important;
//         min-height: 100% ;
//         aspect-ratio: 16 / 9;
//         border-radius: 8px;
//         display: block;
//         margin: 1.5rem auto;
//   }
//    @media (min-width: 481px) and (max-width: 767px){
//         width: 96%;
//         margin-top: 1rem;
//     }
//     @media (max-width: 480px){
//         width: 90%;
//         margin-top: 1rem;
//     }
// `;


interface PageProps {
    params: Promise<{
        lang: "en" | "de" | "fa"
        slug: string
        id: string
    }>
}

export default async function Page({ params }: PageProps) {
    const { lang, id } = await params

    const res = await fetch(
        `${apiEndPoint.baseURL}/api/public/page/translation?id=${Number(id)}&lang=${lang}`,
        { cache: "no-store" }
    )

    if (!res.ok) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                {lang === "fa" ? "محتوایی یافت نشد" : "Content not found"}
            </div>
        )
    }

    const content: ResponseDataGeneric<IContent> = await res.json()

    if (!content?.data) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                {lang === "fa" ? "محتوایی یافت نشد" : "Content not found"}
            </div>
        )
    }

    const page = content.data

    return (
        <div style={{ backgroundImage: 'url("/images/footer.jpg")', backgroundSize: "cover" }} className="flex flex-wrap flex-col-reverse md:flex-row w-full  px-12 mx-auto py-12 min-h-full">
            <Sidebar language={lang}/>
            <div className=" max-w-4xl mx-auto rounded-2xl px-2 items-center pb-2 md:pb-5 space-y-8 ">
                <h1 style={{fontFamily: lang === "fa"? "Vazir" : "Roboto"}} className={`text-3xl md:text-4xl text-[#F9C74F] font-bold ${lang === "fa" ? "text-right" : "text-left"}`}>
                    {page.title}
                </h1>

                <div className="w-full h-[2px] bg-[#C2C8CC] rounded-full" />

                <div className="content-body" lang={lang} dangerouslySetInnerHTML={{ __html: page.body }} />
            </div>
        </div>
    )
}


