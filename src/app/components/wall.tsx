"use client";

import { FaReact, FaNodeJs, FaDocker, FaGitAlt } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiExpress, SiMongodb, SiSharp, SiHtml5, SiCss3, SiJavascript, SiRedux, SiGraphql, SiWebpack } from "react-icons/si";

const icons = [
  { icon: <SiSharp size={28} color="#9b59b6" /> },
  { icon: <FaReact size={28} color="#61DBFB" /> },
  { icon: <SiNextdotjs size={28} color="#fafafa" /> },
  { icon: <SiTypescript size={28} color="#007ACC" /> },
  { icon: <SiTailwindcss size={28} color="#38B2AC" /> },
  { icon: <FaNodeJs size={28} color="#3C873A" /> },
  { icon: <SiExpress size={28} color="#d8d8d8" /> },
  { icon: <SiMongodb size={28} color="#4DB33D" /> },
  { icon: <SiHtml5 size={28} color="#E34F26" /> },
  { icon: <SiCss3 size={28} color="#264DE4" /> },
  { icon: <SiJavascript size={28} color="#F0DB4F" /> },
  { icon: <SiRedux size={28} color="#764ABC" /> },
  { icon: <FaDocker size={28} color="#0db7ed" /> },
  { icon: <FaGitAlt size={28} color="#F1502F" /> },
  { icon: <SiGraphql size={28} color="#E10098" /> },
  { icon: <SiWebpack size={28} color="#8DD6F9" /> },
];

const Wall = () => {
  return (
    <div className="grid grid-cols-4 gap-6 w-1/2 mx-auto my-4">
      {icons.map((item, index) => (
        <div key={index} className="flex items-center justify-center">
          {item.icon}
        </div>
      ))}
    </div>
  );
};

export default Wall;
