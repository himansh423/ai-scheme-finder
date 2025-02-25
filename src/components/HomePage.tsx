import { Mic, Search } from "lucide-react";
import Robot3DModel from "./Robot3DModel";
import ThinkingBrain3DModel from "./ThinkingBrain3DModel";

import { Bebas_Neue } from "next/font/google";
const bebasNeue = Bebas_Neue({
  weight: "400",
});
const HomePage = () => {
  return (
    <div>
      {/* <div>
        <h1
          className={`text-6xl text-center mt-2 text-[#e5e5e5] mb-12 ${passionOne.className}`}
        >
          AI Government Scheme Finder
        </h1>
      </div> */}

      <form className="w-screen min-h-screen relative">
        <div className="w-full h-full absolute top-0 right-0 z-10 ">
          <Robot3DModel />
          <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black via-black/80 to-black/10"></div>
        </div>

        <div className="absolute top-[40px] left-5 z-20">
          <input
            type="text"
            placeholder="Enter Your Age"
            className={`${bebasNeue.className} w-[400px] text-center placeholder:text-center h-[60px]  border-white border-[1px] rounded-md shadow-lg shadow-[#e5e5e5] text-white bg-transparent px-4 text-xl`}
          />
        </div>
        <div className="absolute top-[40px] right-8 z-20">
          <input
            type="text"
            placeholder="Enter your Monthly Earnings.."
            className={`${bebasNeue.className} w-[400px] text-center placeholder:text-center h-[60px]  border-white border-[1px] rounded-md shadow-lg shadow-[#e5e5e5] text-white bg-transparent px-4 text-xl`}
          />
        </div>
        <div className="absolute bottom-[260px] right-8 z-20">
          <input
            type="text"
            placeholder="Location..."
            className={`${bebasNeue.className} w-[400px] text-center placeholder:text-center h-[60px]  border-white border-[1px] rounded-md shadow-lg shadow-[#e5e5e5] text-white bg-transparent px-4 text-xl`}
          />
        </div>
        <div className="absolute bottom-[260px] left-5 z-20">
          <input
            type="text"
            placeholder="Occupation..."
            className={`${bebasNeue.className} w-[400px] text-center placeholder:text-center h-[60px]  border-white border-[1px] rounded-md shadow-lg shadow-[#e5e5e5] text-white bg-transparent px-4 text-xl`}
          />
        </div>
        <div className="absolute bottom-[300px] left-[50%] translate-x-[-50%] z-20">
          <input
            type="text"
            placeholder="Decription for Scheme"
            className={`${bebasNeue.className} w-[400px] text-center placeholder:text-center h-[60px]  border-white border-[1px] rounded-md shadow-lg shadow-[#e5e5e5] text-white bg-transparent px-4 text-xl`}
          />
        </div>
        <button className={`${bebasNeue.className} w-[200px] h-[50px] bg-black text-white shadow-md shadow-[#e5e5e5] flex items-center justify-center absolute inset-0 m-auto z-20 top-64 rounded-lg border-[1px] border-black`}>
          <Mic className="mr-2 h-4 w-4" />
          <p>Voice</p>
        </button>
        <button className={`${bebasNeue.className} w-[200px] h-[50px] bg-black text-white shadow-md shadow-[#e5e5e5] flex items-center justify-center absolute inset-0 m-auto z-20 top-96 rounded-lg border-[1px] border-black`}>
          <Search className="mr-2 h-4 w-4" />
          <p>Get Recommendation</p>
        </button>
      </form>
      <ThinkingBrain3DModel />
    </div>
  );
};

export default HomePage;
