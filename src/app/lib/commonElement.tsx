import { FieldError } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: FieldError;
}

export const Input = ({ label, error, className = "", ...props }: InputProps) => {
    return (
        <div className="flex flex-col my-1 h-24">
            {label && <label className="text-sm">{label}</label>}
            <input className="outline-none border rounded p-2" {...props} />
            {error && <span className="text-xs text-red-600">{error.message}</span>}
        </div>
    )
}
 

interface PageTitleProps {
    title: string;
    className?: string;
}

export const PageTitle = ({ title, className = "" }: PageTitleProps) => {
    return (
        <h1 className="text-center text-2xl font-semibold mb-8">
            {title}
        </h1>
    )
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: FieldError;
}

export const TextArea = ({label, error, className="", ...props}: TextAreaProps) => {
    return (
        <div className="flex flex-col my-8 h-56 ">
            {label && <label className="text-sm">{label}</label>}
            <textarea  className="outline-none border rounded p-2 resize-none" {...props} />
            {error && <span className="text-xs text-red-600">{error.message}</span>}
        </div>
    )
} 

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    label: string
    isPending: boolean
}
export const Button = ({label, isPending,className="", ...props}:ButtonProps) => {
    return(
        <button className="cursor-pointer w-1/2 py-2 rounded-lg mx-auto text-white border-1 hover:bg-[#fff] hover:text-[#393E46] avtive:scale-95" >
            {label}
        </button>
    )
}
 