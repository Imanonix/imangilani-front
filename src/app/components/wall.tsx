"use client";

import { FaReact, FaNodeJs, FaDocker, FaGitAlt } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiExpress, SiMongodb, SiSharp, SiHtml5, SiCss3, SiJavascript, SiRedux, SiGraphql, SiWebpack } from "react-icons/si";

const icons = [
  { icon: <SiSharp size={44} color="#9b59b6" style={{border:"2px", padding:"6px",borderStyle:"solid", borderColor:"#f8fc07", borderRadius:"50px"}}/> },
  { icon: <FaReact size={44} color="#61DBFB" style={{border:"2px", padding:"6px",borderStyle:"solid", borderColor:"#f8fc07", borderRadius:"50px"}}/> },
  { icon: <SiNextdotjs size={44} color="#fafafa" style={{border:"2px", padding:"6px",borderStyle:"solid", borderColor:"#f8fc07", borderRadius:"50px"}}/> },
  { icon: <SiTypescript size={44} color="#007ACC" style={{border:"2px", padding:"6px",borderStyle:"solid", borderColor:"#f8fc07", borderRadius:"50px"}}/> },
  { icon: <SiTailwindcss size={44} color="#38B2AC" style={{border:"2px", padding:"6px",borderStyle:"solid", borderColor:"#f8fc07", borderRadius:"50px"}}/> },
  { icon: <FaNodeJs size={44} color="#3C873A" style={{border:"2px", padding:"6px",borderStyle:"solid", borderColor:"#f8fc07", borderRadius:"50px"}}/> },
  { icon: <SiExpress size={44} color="#d8d8d8" style={{border:"2px", padding:"6px",borderStyle:"solid", borderColor:"#f8fc07", borderRadius:"50px"}}/> },
  { icon: <SiMongodb size={44} color="#4DB33D" style={{border:"2px", padding:"6px",borderStyle:"solid", borderColor:"#f8fc07", borderRadius:"50px"}}/> },
  { icon: <SiHtml5 size={44} color="#E34F26" style={{border:"2px", padding:"6px",borderStyle:"solid", borderColor:"#f8fc07", borderRadius:"50px"}}/> },
  { icon: <SiCss3 size={44} color="#264DE4" style={{border:"2px", padding:"6px",borderStyle:"solid", borderColor:"#f8fc07", borderRadius:"50px"}}/> },
  { icon: <SiJavascript size={44} color="#F0DB4F" style={{border:"2px", padding:"6px",borderStyle:"solid", borderColor:"#f8fc07", borderRadius:"50px"}}/> },
  { icon: <SiRedux size={44} color="#764ABC" style={{border:"2px", padding:"6px",borderStyle:"solid", borderColor:"#f8fc07", borderRadius:"50px"}}/> },
  { icon: <FaDocker size={44} color="#0db7ed" style={{border:"2px", padding:"6px",borderStyle:"solid", borderColor:"#f8fc07", borderRadius:"50px"}}/> },
  { icon: <FaGitAlt size={44} color="#F1502F" style={{border:"2px", padding:"6px",borderStyle:"solid", borderColor:"#f8fc07", borderRadius:"50px"}}/> },
  { icon: <SiGraphql size={44} color="#E10098" style={{border:"2px", padding:"6px",borderStyle:"solid", borderColor:"#f8fc07", borderRadius:"50px"}}/> },
  { icon: <SiWebpack size={44} color="#8DD6F9" style={{border:"2px", padding:"6px",borderStyle:"solid", borderColor:"#f8fc07", borderRadius:"50px"}}/> },
];

const Wall = () => {
  return (
    <div className="grid grid-cols-4 gap-6 w-4/5 sm:w-1/2 mx-auto my-4">
      {icons.map((item, index) => (
        <div key={index} className="flex items-center justify-center">
          {item.icon}
        </div>
      ))}
    </div>
  );
};

export default Wall;
