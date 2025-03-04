"use client";

import type React from "react";

import { useState, useRef, type KeyboardEvent } from "react";
import { Bebas_Neue } from "next/font/google";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import Link from "next/link";

const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"] });

const Verify = () => {
  const router = useRouter();
  const { email } = useSelector((store: RootState) => store.email);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join("");

    if (!/^[0-9]{6}$/.test(enteredOtp)) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await axios.post("/api/auth/verify-otp", {
        email,
        otp: enteredOtp,
      });
      if (res.data.success) {
        router.push("/");
      } else {
        setError(res.data.message || "Invalid OTP");
      }
    } catch (error: unknown) {
      if (error instanceof Error)
        setError(error.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-[#E5E5E5] flex justify-center items-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className={`${bebasNeue.className} text-5xl text-[#E5E5E5]`}>
            BRANDNAME
          </h1>
          <p className="text-[#999999] mt-2">Grow Your Network efficiently</p>
        </div>

        <div className="bg-[#0A0A0A] rounded-xl border border-[#222222] shadow-xl p-8">
          <h2
            className={`${bebasNeue.className} text-3xl mb-6 text-center text-[#E5E5E5]`}
          >
            VERIFY OTP
          </h2>

          <p className="text-[#999999] text-center mb-6">
            OTP sent to your registered email address
          </p>

          {error && (
            <div className="w-full bg-[#331111] border border-[#662222] text-[#FF5555] p-3 rounded-md mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <p className="text-center text-[#999999] mb-2">Enter 6 Digit OTP</p>

            <div className="w-full flex gap-2 justify-center mb-4">
              {otp.map((value, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={value}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  ref={(el: HTMLInputElement | null) => {
                    inputRefs.current[index] = el;
                  }}
                  className="w-[40px] h-[50px] rounded-md border border-[#333333] bg-[#111111] outline-none focus:border-[#E5E5E5] text-center text-[#E5E5E5] transition-all duration-300"
                />
              ))}
            </div>

            <button
              disabled={isSubmitting}
              className="w-full h-12 mt-4 bg-[#111111] border border-[#333333] text-[#E5E5E5] rounded-md hover:bg-[#222222] transition-all duration-300"
            >
              <span className={`${bebasNeue.className} text-xl`}>
                {isSubmitting ? "VERIFYING..." : "VERIFY OTP"}
              </span>
            </button>

            <div className="text-[#999999] flex gap-2 items-center justify-center mt-4">
              <p>Don&apos;t have an Account?</p>
              <Link
                href="/auth/register"
                className={`${bebasNeue.className} font-bold text-[#E5E5E5] hover:underline`}
              >
                REGISTER
              </Link>
            </div>
          </form>

          <div className="w-full flex items-center gap-3 my-6">
            <div className="h-[1px] flex-1 bg-[#333333]"></div>
            <div className={`${bebasNeue.className} text-[#999999]`}>OR</div>
            <div className="h-[1px] flex-1 bg-[#333333]"></div>
          </div>

          <div className="text-center">
            <button
              className="text-[#999999] hover:text-[#E5E5E5] transition-all duration-300"
              onClick={() => setOtp(["", "", "", "", "", ""])}
            >
              <span className={bebasNeue.className}>RESEND OTP</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;
