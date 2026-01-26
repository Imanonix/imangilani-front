import { cookies } from "next/headers";
import SideBarClient from "./sidebar.client";
import { GetPages, GetSocialMedia } from "@/CommonFunction";
import { ISidebarProps } from "@/types/type";



export default async function SidebarServer({language}: ISidebarProps) {
    // const cookieStore = cookies();
    // const language = ((await cookieStore).get("language")?.value ?? "en") as "en" | "fa" | "de";

    const pages = (await GetPages(language)).filter(p => p.position === 'sidebar')
    const socialMediaList = await GetSocialMedia()

    return (
        <SideBarClient language={language} pages={pages} socialMediaList={socialMediaList} />
    )
}