import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Header from "../components/header";
import Footer from "../components/footer";
import "../globals.css"

export const metadata: Metadata = {
    title: "Iman Gilani",
    description: "Create Website and Application, Web Application, Mobile Application",
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
            <body>
                <Header language={language} />
                {children}
                <Footer language={language} />
            </body>
        </html>
    );
}
