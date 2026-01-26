import { GetPages, GetSocialMedia } from "@/CommonFunction";
import { IFooterProps } from "@/types/type";
import FooterClient from "./footer.client";

export default async function FooterServer({ language }: IFooterProps) {
    const pages = await GetPages(language);
    const socialMediaList = await GetSocialMedia();
    return (
        <FooterClient pages={pages} socialMediaList={socialMediaList} language={language} />
    )
}