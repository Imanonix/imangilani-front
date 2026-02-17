import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Header from "../components/header";
import Footer from "../components/footer";
import "../globals.css"
import Cookieconsent from "../components/CookieConsent";

export const metadata: Metadata = {
    title: "Iman Gilani",
    description: "Iman Gilani, software developer specializing in web development, mobile applications, and modern digital solutions."
};

const roboto = Roboto({
    weight: ["400", "500", "700"],
    subsets: ["latin"],
});

// export function generateStaticParams() {
//   return ["en", "fa", "de"].map((lang) => ({ lang }));
// }

interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}

export default async function RootLayout({ children, params }: LayoutProps) {
    const { lang } = await params;
    const language = lang as "en" | "fa" | "de";

    return (
        <html lang={language} dir={language === "fa" ? "rtl" : "ltr"} className={roboto.className}>
            <head>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
                />
            </head>
            <body style={{position:"relative"}}>
                <Header language={language} />
                {children}
                <Footer language={language} />
                <Cookieconsent />
            </body>
        </html>
    );
}
