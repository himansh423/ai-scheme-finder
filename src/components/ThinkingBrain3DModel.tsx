"use client";
import Spline from "@splinetool/react-spline";
import { useState, useEffect } from "react";
import { Bebas_Neue } from "next/font/google";
const bebasNeue = Bebas_Neue({
  weight: "400",
});
const ThinkingBrain3DModel = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="w-screen h-screen relative flex items-center justify-center">
   
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-t to-black via-black/80 from-black/10"></div>

      <Spline scene="https://prod.spline.design/MlHrGwLonRbK5z4E/scene.splinecode" />

      
      <div className="ThinkingBox absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#e5e5e5] text-2xl font-semibold">
        <p className={bebasNeue.className}>Thinking{dots}</p>
      </div>

     
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black via-black/80 to-black/10"></div>
    </div>
  );
};

export default ThinkingBrain3DModel;
