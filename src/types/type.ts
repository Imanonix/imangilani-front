// types/language.ts
export type Language = "fa" | "en" | "de";

export interface ISocialMedia {
    id: number
    title: string
    url: string
    order: number
}

export interface IPageDTO {
    id: number
    slug: string
    type: string
    position: string
    title: string
    url: string
}

export interface IHeaderProps {
    language:"fa"|"en"|"de"
}


export interface IHeaderClientProps {
    pages: IPageDTO[]
    socialMediaList: ISocialMedia[]
    language: "fa"|"en"|"de"
}

export interface IFooterProps {
	language:"en"|"fa"|"de"
}

export interface IFooterClientProps {
    pages: IPageDTO[]
    socialMediaList: ISocialMedia[]
    language: "fa"|"en"|"de"
}

export interface ISidebarProps {
    language:"fa"|"en"|"de"
}


export interface IContent {
    id: number
    title: string
    body: string
}

export interface ApiResponse<T> {
    data: T;
    message: string;
    status: number;
}

export interface IProjectsPreviewDTO {
    id: number;
    projectType: string;
    projectUrl?: string | null;
    projectDate: string;
    projectDuration?: string | null;
    projectTags: string;
    isVisible: boolean;
    title?: string | null;
    summary?: string | null;
}