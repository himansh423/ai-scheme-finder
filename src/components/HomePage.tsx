"use client";

import { Mic, Search } from "lucide-react";
import Robot3DModel from "./Robot3DModel";
import ThinkingBrain3DModel from "./ThinkingBrain3DModel";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Bebas_Neue } from "next/font/google";
import { z } from "zod";
import { Recommend } from "@/library/zodSchema/getRecommendationForm";
import axios from "axios";

const bebasNeue = Bebas_Neue({ weight: "400" });

type UserData = z.infer<typeof Recommend>;

const HomePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserData>({
    defaultValues: {
      age: "",
      salary: "",
      occupation: "",
      location: "",
      description: "",
    },
    resolver: zodResolver(Recommend),
  });

  const onSubmit = async (data: UserData) => {
    try {
      

      const response = await axios.post(`/api/recommend`, data);
      
      if (response.data.recommendation) {
        console.log("Recommendations:", response.data.recommendation);
        alert("Recommendations received successfully");
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-screen min-h-screen relative">
        <div className="w-full h-full absolute top-0 right-0 z-10">
          <Robot3DModel />
          <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black via-black/80 to-black/10"></div>
        </div>

        <div className="absolute top-[40px] left-5 z-20">
          <input
            type="number"
            {...register("age")}
            placeholder="Enter Your Age"
            className={`${bebasNeue.className} w-[400px] text-center placeholder:text-center h-[60px] border-white border-[1px] rounded-md shadow-lg shadow-[#e5e5e5] text-white bg-transparent px-4 text-xl`}
          />
          {errors.age && <p className="text-orange-500 text-sm">{errors.age.message}</p>}
        </div>

        <div className="absolute top-[40px] right-8 z-20">
          <input
            type="number"
            {...register("salary")}
            placeholder="Enter your Monthly Earnings.."
            className={`${bebasNeue.className} w-[400px] text-center placeholder:text-center h-[60px] border-white border-[1px] rounded-md shadow-lg shadow-[#e5e5e5] text-white bg-transparent px-4 text-xl`}
          />
          {errors.salary && <p className="text-orange-500 text-sm">{errors.salary.message}</p>}
        </div>

        <div className="absolute bottom-[260px] right-8 z-20">
          <input
            type="text"
            {...register("location")}
            placeholder="Location..."
            className={`${bebasNeue.className} w-[400px] text-center placeholder:text-center h-[60px] border-white border-[1px] rounded-md shadow-lg shadow-[#e5e5e5] text-white bg-transparent px-4 text-xl`}
          />
          {errors.location && <p className="text-orange-500 text-sm">{errors.location.message}</p>}
        </div>

        <div className="absolute bottom-[260px] left-5 z-20">
          <input
            {...register("occupation")}
            type="text"
            placeholder="Occupation..."
            className={`${bebasNeue.className} w-[400px] text-center placeholder:text-center h-[60px] border-white border-[1px] rounded-md shadow-lg shadow-[#e5e5e5] text-white bg-transparent px-4 text-xl`}
          />
          {errors.occupation && <p className="text-orange-500 text-sm">{errors.occupation.message}</p>}
        </div>

        <div className="absolute bottom-[300px] left-[50%] translate-x-[-50%] z-20">
          <input
            type="text"
            {...register("description")}
            placeholder="Description for Scheme"
            className={`${bebasNeue.className} w-[400px] text-center placeholder:text-center h-[60px] border-white border-[1px] rounded-md shadow-lg shadow-[#e5e5e5] text-white bg-transparent px-4 text-xl`}
          />
          {errors.description && <p className="text-orange-500 text-sm">{errors.description.message}</p>}
        </div>

        <div className={`${bebasNeue.className} w-[200px] h-[50px] bg-black text-white shadow-md shadow-[#e5e5e5] flex items-center justify-center absolute inset-0 m-auto z-20 top-64 rounded-lg border-[1px] border-black`}>
          <Mic className="mr-2 h-4 w-4" />
          <p>Voice</p>
        </div>

        <button
          type="submit"
          className={`${bebasNeue.className} w-[200px] h-[50px] bg-black text-white shadow-md shadow-[#e5e5e5] flex items-center justify-center absolute inset-0 m-auto z-20 top-96 rounded-lg border-[1px] border-black`}
        >
          <Search className="mr-2 h-4 w-4" />
          <p>Get Recommendation</p>
        </button>
      </form>
      <ThinkingBrain3DModel />
    </div>
  );
};

export default HomePage;
