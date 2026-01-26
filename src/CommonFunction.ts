import apiEndPoint from "./ApiEndPoint"
import { IPageDTO, ISocialMedia } from "./types/type"

export interface InputFetchData {
    url: string
    method: string
    body: FormData | undefined 
    credentials: RequestCredentials | undefined
}

export interface ResponseDataGeneric<T> {
    data: T
    message: string
    status: number
}
export const fetchGenericFunction = async <T>(input:InputFetchData) =>  {
    const response = await fetch(input.url, {
        method: input.method,
        body: input.body,
        credentials: input.credentials,
    })
    const responseData: ResponseDataGeneric<T> = await response.json()   
    return responseData
}



export const GetPages = async (language: string) : Promise<IPageDTO[]> =>{
    const res = await fetch(`${apiEndPoint.baseURL}/api/public/page?lang=${language}`, {cache: "no-store"})
    const pages:ResponseDataGeneric<IPageDTO[]> = await res.json()
    return pages.data
}


export const GetSocialMedia = async () : Promise<ISocialMedia[]> =>{
    const res = await fetch(`${apiEndPoint.baseURL}/api/social-media/all`, {cache: "no-store"})
    const pages:ResponseDataGeneric<ISocialMedia[]> = await res.json()
    return pages.data
}

