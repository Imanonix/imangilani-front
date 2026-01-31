"use client";
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaInstagram, FaLinkedin, FaXing } from 'react-icons/fa';
import Link from 'next/link';
import { Button, Input, TextArea } from '@/app/lib/commonElement';
import { useParams } from 'next/navigation';
import { LanguageContext, LanguageContextType } from '@/app/providers/languageContext';
import apiEndPoint from '@/ApiEndPoint';
import { ApiResponse, IContent } from '@/types/type';
import { fetchGenericFunction, ResponseDataGeneric } from '@/CommonFunction';


// import apiEndPoint from '../config/ApiEndPoint';
// import { PulseLoader } from 'react-spinners';
// import { fetchGenericFunction, ResponseDataGeneric } from '../commonFunctions/CommonFunction';




interface ContactUsDTO {
    email: string
    address: string
    phone: string
    whatsApp: string
    fax: string | undefined
}

interface InputData {
    email: string;
    name: string;
    subject: string
    message: string;
}

interface ResponseData<T> {
    data: T[]
    message: string
    statuse: number
}


const page = () => {
    const { lang, id } = useParams()
    const { register, handleSubmit, formState: { errors }, reset } = useForm<InputData>();
    const [isPending, setIsPending] = useState<boolean>(false)
    const [fetchError, setFetchError] = useState<string>("")
    const [fetchMessage, setFetchMessage] = useState<string>()
    const [contactUsInfo, setContactUsInfo] = useState<ContactUsDTO>()
    const [responseMessage, setResponseMessage] = useState<string>("")
    const [content, setContent] = useState<IContent | null>(null)


    useEffect(() => {
        const fetchContent = async () => {
            window.scrollTo(0, 0)

            try {
                const response = await fetch(
                    `${apiEndPoint.baseURL}/api/public/page/translation?id=${Number(id)}&lang=${lang}`
                )

                const data: ApiResponse<IContent> = await response.json()

                if (data.status === 200) {
                    setContent(data.data)
                }
            } catch (error) {
            } finally {
            }
        }

        fetchContent()
    }, [lang, id])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const onSubmit = async (data: InputData) => {
        setFetchError("")
        setFetchMessage("")

        const formData = new FormData();
        formData.append("email", data.email);
        formData.append("name", data.name);
        formData.append("subject", data.subject);
        formData.append("message", data.message);
        setIsPending(true)
        try {
            const responseData: ResponseDataGeneric<boolean> = await fetchGenericFunction(
                {
                    url: `${apiEndPoint.baseURL}/api/contact/add?lang=${lang}`,
                    method: 'POST',
                    body: formData,
                    credentials: undefined
                }
            );
            if (!navigator.onLine) {
                setFetchError('You are offline. Please check your connection.');
                return
            }
            if (responseData.status === 200) {
                setFetchMessage(responseData.message)
                setResponseMessage(responseData.message)
                setFetchError("")
                reset()
                return
            }

            if (responseData.status === 500) {
                setFetchError(responseData.message)
                return
            }

        } catch (err: any) {
            setFetchError(err.message || 'An error occurred. Please try again later.')
        }
        finally {
            setIsPending(false)
        }
    };
    if (!content) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                {lang === "fa" ? "محتوایی یافت نشد" : "Content not found"}
            </div>
        )
    }

    return (

        <div className='self-center flex flex-col items-center md:flex-row md:justify-center md:items-start w-full mx-auto py-10 gap-2 bg-[#393E46]'  >

            <section className="w-[90%] md:w-[45%] px-10 flex flex-col items-start" style={{ direction: lang === "fa" ? "rtl" : "ltr" }}>
                <h2 className="text-3xl font-bold mb-4 text-gray-800" style={{ color: "#F9C74F" }}>
                    {content.title}
                </h2>
                <div dangerouslySetInnerHTML={{ __html: content.body }} />
            </section>

            <section className='w-[90%] md:w-[45%]'>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col align-center p-10 w-full bg-[#222831]' >
                    <Input label='Email*' error={errors.email} type="email" {...register("email", { required: "Email is required" })} />
                    <Input label='Name*' error={errors.name} type="text" {...register("name", { required: "Name is required", maxLength: { value: 100, message: "Name should be at most 100 characters" } })} />
                    <Input label='Subject*' error={errors.subject} type="text" {...register("subject", { required: "Subject is required", maxLength: { value: 300, message: "Subject should be at most 70 characters" } })} />
                    <TextArea rows={6} label='Message*' error={errors.message}  {...register("message", { required: "Message is required", maxLength: { value: 2000, message: "Message should be at most 70 characters" } })} />
                    <button className="cursor-pointer w-1/2 py-2 rounded-lg mx-auto text-white border-1 hover:bg-[#fff] hover:text-[#393E46] active:scale-95" >
                        {isPending ?  <div className="mx-auto w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>  : "Submit"}
                    </button>
                    <div className='w-full pt-4'>{responseMessage}</div>
                </form>

            </section>

        </div>

    );
};
export default page;