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
    const { id } = useParams()
    const { register, handleSubmit, formState: { errors }, reset } = useForm<InputData>();
    const [isPending, setIsPending] = useState<boolean>(false)
    const [fetchError, setFetchError] = useState<string>("")
    const [fetchMessage, setFetchMessage] = useState<string>()
    const [contactUsInfo, setContactUsInfo] = useState<ContactUsDTO>()

    const [content, setContent] = useState<IContent | null>(null)
    const { language } = useContext<LanguageContextType>(LanguageContext)

    useEffect(() => {
        const fetchContent = async () => {
            window.scrollTo(0, 0)

            try {
                const response = await fetch(
                    `${apiEndPoint.baseURL}/api/public/page/translation?id=${Number(id)}&lang=${language}`
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
    }, [language, id])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const onSubmit = async (data: InputData) => {
        setFetchError("")
        setFetchMessage("")

        // const formData = new FormData();
        // formData.append("email", data.email);
        // formData.append("name", data.name);
        // formData.append("subject", data.subject);
        // formData.append("message", data.message);
        // setIsPending(true)
        // try {
        //     const responseData: ResponseDataGeneric<boolean> = await fetchGenericFunction(
        //         {
        //             url: apiEndPoint.contact.public.postMessage,
        //             method: 'POST',
        //             body: formData,
        //             credentials: undefined
        //         }
        //     );
        //     if (!navigator.onLine) {
        //         setFetchError('You are offline. Please check your connection.');
        //         return
        //     }
        //     if (responseData.status === 200) {
        //         setFetchMessage(responseData.message)
        //         setFetchError("")
        //         reset()
        //         return
        //     }

        //     if (responseData.status === 500) {
        //         setFetchError(responseData.message)
        //         return
        //     }

        // } catch (err: any) {
        //     setFetchError(err.message || 'An error occurred. Please try again later.')
        // }
        // finally {
        //     setIsPending(false)
        // }
    };
        if (!content) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                {language === "fa" ? "محتوایی یافت نشد" : "Content not found"}
            </div>
        )
    }

    return (

        <div className='self-center flex  justify-center items-start w-4/5 mx-auto h-screen gap-2 mt-20'  >

            <section className="w-1/2 px-10 flex flex-col justify-end text-left">
                <h2 className="text-3xl font-bold mb-4 text-gray-800" style={{ color: "#F9C74F" }}>
                    Get in Touch
                </h2>

                <div lang={language} dangerouslySetInnerHTML={{ __html: content.body }} />

            </section>

            <section className='w-1/2 mx-20'>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col align-center p-5 w-100% rounded-xl bg-[#222831]' >
                    <Input label='Email*' error={errors.email} type="email" {...register("email", { required: "Email is required" })} />
                    <Input label='Name*' error={errors.name} type="text" {...register("name", { required: "Name is required" })} />
                    <Input label='Subject*' error={errors.subject} type="text" {...register("subject", { required: "Subject is required", maxLength: { value: 70, message: "Sbject should be at most 70 characters" } })} />
                    <TextArea rows={6} label='Message*' error={errors.message}  {...register("message", { required: "Message is required" })} />
                    <Button label={'Submit'} isPending={false} />
                    {/*

                    <ButtonWrapper>
                        <Button type="submit"> {isPending ? <PulseLoader color='#fff' /> : "SEND MESSEGE"}  </Button>

                        {fetchError ?
                            <FetchError>
                                {fetchError}
                            </FetchError>
                            :
                            <FetchMessage>
                                {fetchMessage}
                            </FetchMessage>
                        }
                    </ButtonWrapper> */}

                </form>
            </section>

        </div>

    );
};
export default page;