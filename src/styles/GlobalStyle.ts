"use client";

import { Language } from "@/types/type";
import { createGlobalStyle } from "styled-components";


export const GlobalStyle = createGlobalStyle<{ lang: Language }>`

  :root {
    --header-bg: #222831;
    --bg-color: #393E46;
    --bg-card: #F9C74F;
    --text-color: #ffffff;
  }

  body {
    margin: 0;
    padding: 0;

    direction: ${({ lang }) =>
      lang === "fa" ? "rtl" : "ltr"};

    font-family: ${({ lang }) =>
      lang === "fa"
        ? "VAZIR" 
        : "Roboto"};

    background-color: var(--bg-color);
    color: #fff;
  }
`;
