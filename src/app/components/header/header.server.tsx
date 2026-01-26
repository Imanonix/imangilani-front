import { IHeaderProps } from "@/types/type";
import HeaderClient from "./header.client";
import { GetPages, GetSocialMedia } from "@/CommonFunction";


export default async function HeaderServer({ language }: IHeaderProps) {
    const pages = await GetPages(language);
    const socialMediaList = await GetSocialMedia();
    return (
        <HeaderClient pages={pages} socialMediaList={socialMediaList} language={language} />
    )
}