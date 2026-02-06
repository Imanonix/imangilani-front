"use client";

import { useCallback, useEffect, useState } from "react";
import { FaReact, FaNodeJs, FaDocker, FaGitAlt } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiExpress, SiMongodb, SiSharp, SiHtml5, SiCss3, SiJavascript, SiRedux, SiGraphql, SiWebpack } from "react-icons/si";

const icons = [
    { icon: <SiSharp className="icon" color="#9b59b6" />},
    { icon: <FaReact className="icon" color="#61DBFB" />},
    { icon: <SiNextdotjs className="icon" color="#fafafa"/> },
    { icon: <SiTypescript className="icon" color="#007ACC" /> },
    { icon: <SiTailwindcss className="icon" color="#38B2AC" /> },
    { icon: <FaNodeJs className="icon" color="#3C873A" /> },
    { icon: <SiExpress className="icon" color="#d8d8d8" /> },
    { icon: <SiMongodb className="icon" color="#4DB33D" /> },
    { icon: <SiHtml5 className="icon" color="#E34F26" /> },
    { icon: <SiCss3 className="icon" color="#264DE4" /> },
    { icon: <SiJavascript className="icon" color="#F0DB4F" /> },
    { icon: <SiRedux className="icon" color="#764ABC" /> },
    { icon: <FaDocker className="icon" color="#0db7ed" /> },
    { icon: <FaGitAlt className="icon" color="#F1502F" /> },
    { icon: <SiGraphql className="icon" color="#E10098"/> },
    { icon: <SiWebpack className="icon" color="#8DD6F9" /> },
];

const Wall = () => {
    return (
        <div className="container">
            {icons.map((item, index) => (
                <div key={index} style={{position:"absolute", inset: "0 0 0 0" ,transform: `rotateY(${(index + 1 - 1) * (360/ icons.length)}deg) translateZ(50px)`}}>
                    {item.icon}
                </div>
            ))}
        </div>
    );
};

export default Wall;
