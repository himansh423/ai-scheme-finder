"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import axios from "axios";
import { Mic, Search } from "lucide-react";
import { Bebas_Neue } from "next/font/google";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Robot3DModel from "./Robot3DModel";
import ThinkingBrain3DModel from "./ThinkingBrain3DModel";
import { Recommend } from "@/library/zodSchema/getRecommendationForm";
import { schemeAction } from "@/redux/schemeSlice";
import { userInputAction } from "@/redux/userInputSlice";

const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"] });

type UserData = z.infer<typeof Recommend>;

declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey as string);

const HomePage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isListening, setIsListening] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
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

  useEffect(() => {
    if (isListening) {
      startListening();
    }
  }, [isListening]);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "hi-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = async (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      await processSpeech(transcript);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
    recognition.start();
  };

  const processSpeech = async (speechText: string) => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const prompt = `Extract user details (age, salary, location, occupation, description) from the given statement:
      "${speechText}" 
      Format it in JSON:
      
      {"age": "", "salary": "", "location": "", "occupation": "", "description": ""}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const jsonText = await response.text();
      const match = jsonText.match(/\{[\s\S]*\}/);
      const extractedData = JSON.parse(match ? match[0] : "{}");

      setValue("age", extractedData.age || "");
      setValue("salary", extractedData.salary || "");
      setValue("location", extractedData.location || "");
      setValue("occupation", extractedData.occupation || "");
      setValue("description", extractedData.description || "");

      handleSubmit(onSubmit)();
    } catch (error) {
      console.error("Error processing speech data:", error);
    }
  };

  const onSubmit = async (data: UserData) => {
    try {
      const response = await axios.post(`/api/recommend`, data);

      if (response.data.recommendation) {
        console.log("Recommendations:", response.data.recommendation);
        dispatch(userInputAction.setInput({ data: data }));
        dispatch(
          schemeAction.setSchemes({
            data: response.data.recommendation.recommended_schemes,
          })
        );
        router.push("/recommendations");
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-screen min-h-screen relative"
      >
        <div className="w-full h-full absolute top-0 right-0 z-10">
          <Robot3DModel />
          <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black via-black/80 to-black/10"></div>
        </div>

        <div
          className={`w-screen h-screen absolute top-0 left-0 z-40 ${
            isSubmitting ? "block" : "hidden"
          }`}
        >
          <ThinkingBrain3DModel />
        </div>

        <div className="absolute top-[40px] left-5 z-20">
          <input
            type="number"
            {...register("age")}
            placeholder="Enter Your Age"
            className={`${bebasNeue.className} w-[400px] text-center placeholder:text-center h-[60px] border-white border-[1px] rounded-md shadow-lg shadow-[#e5e5e5] text-white bg-transparent px-4 text-xl`}
          />
          {errors.age && (
            <p className="text-orange-500 text-sm">{errors.age.message}</p>
          )}
        </div>

        <div className="absolute top-[40px] right-8 z-20">
          <input
            type="number"
            {...register("salary")}
            placeholder="Enter your Monthly Earnings.."
            className={`${bebasNeue.className} w-[400px] text-center placeholder:text-center h-[60px] border-white border-[1px] rounded-md shadow-lg shadow-[#e5e5e5] text-white bg-transparent px-4 text-xl`}
          />
          {errors.salary && (
            <p className="text-orange-500 text-sm">{errors.salary.message}</p>
          )}
        </div>

        <div className="absolute bottom-[260px] right-8 z-20">
          <input
            type="text"
            {...register("location")}
            placeholder="Location..."
            className={`${bebasNeue.className} w-[400px] text-center placeholder:text-center h-[60px] border-white border-[1px] rounded-md shadow-lg shadow-[#e5e5e5] text-white bg-transparent px-4 text-xl`}
          />
          {errors.location && (
            <p className="text-orange-500 text-sm">{errors.location.message}</p>
          )}
        </div>

        <div className="absolute bottom-[260px] left-5 z-20">
          <input
            {...register("occupation")}
            type="text"
            placeholder="Occupation..."
            className={`${bebasNeue.className} w-[400px] text-center placeholder:text-center h-[60px] border-white border-[1px] rounded-md shadow-lg shadow-[#e5e5e5] text-white bg-transparent px-4 text-xl`}
          />
          {errors.occupation && (
            <p className="text-orange-500 text-sm">
              {errors.occupation.message}
            </p>
          )}
        </div>

        <div className="absolute bottom-[300px] left-[50%] translate-x-[-50%] z-20">
          <input
            type="text"
            {...register("description")}
            placeholder="Description for Scheme"
            className={`${bebasNeue.className} w-[400px] text-center placeholder:text-center h-[60px] border-white border-[1px] rounded-md shadow-lg shadow-[#e5e5e5] text-white bg-transparent px-4 text-xl`}
          />
          {errors.description && (
            <p className="text-orange-500 text-sm">
              {errors.description.message}
            </p>
          )}
        </div>

        <div
          onClick={() => setIsListening(true)}
          className={`${bebasNeue.className} w-[200px] h-[50px] bg-black text-white shadow-md shadow-[#e5e5e5] flex items-center justify-center absolute inset-0 m-auto z-20 top-64 rounded-lg border-[1px] border-black cursor-pointer`}
        >
          <Mic className="mr-2 h-4 w-4" />
          <p>{isListening ? "Listening..." : "Voice"}</p>
        </div>

        <button
          type="submit"
          className={`${bebasNeue.className} w-[200px] h-[50px] bg-black text-white shadow-md shadow-[#e5e5e5] flex items-center justify-center absolute inset-0 m-auto z-20 top-96 rounded-lg border-[1px] border-black`}
        >
          <Search className="mr-2 h-4 w-4" />
          <p>Get Recommendation</p>
        </button>
      </form>
    </div>
  );
};

export default HomePage;
