"use client"

import type React from "react"
import { Bebas_Neue } from "next/font/google"
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa"
import Link from "next/link"
import type { z } from "zod"
import { type SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/redux/store"
import { User } from "@/library/zodSchema/loginSchema"
import { loginAction } from "@/redux/loginSlice"

const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"] })

type UserData = z.infer<typeof User>

const Login: React.FC = () => {
  const dispatch = useDispatch()
  const { error } = useSelector((store: RootState) => store.login)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<UserData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(User),
  })

  const onSubmit: SubmitHandler<UserData> = async (data: UserData) => {
    try {
      const payload = {
        email: data.email,
        password: data.password,
      }
      const res = await axios.post("/api/auth/login", payload)

      if (res.data.success) {
        router.push("/")
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(loginAction.setError({ data: "Invalid Credentials" }))
        setError("root", {
          type: "manual",
          message: error.message,
        })
      }
    }
  }

  return (
    <div className="min-h-screen bg-black text-[#E5E5E5] flex justify-center items-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className={`${bebasNeue.className} text-5xl text-[#E5E5E5]`}>BRANDNAME</h1>
          <p className="text-[#999999] mt-2">Grow Your Network efficiently</p>
        </div>

        <div className="bg-[#0A0A0A] rounded-xl border border-[#222222] shadow-xl p-8">
          <h2 className={`${bebasNeue.className} text-3xl mb-6 text-center text-[#E5E5E5]`}>LOGIN</h2>

          {error && (
            <div className="w-full bg-[#331111] border border-[#662222] text-[#FF5555] p-3 rounded-md mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
            <div className="space-y-1">
              <input
                type="email"
                {...register("email")}
                className="w-full h-12 rounded-md border border-[#333333] bg-[#111111] outline-none focus:border-[#E5E5E5] px-4 text-[#E5E5E5] transition-all duration-300"
                placeholder="Email"
              />
              {errors.email && <p className="text-[#FF5555] text-sm">{errors.email.message}</p>}
            </div>

            <div className="space-y-1">
              <input
                type="password"
                {...register("password")}
                className="w-full h-12 rounded-md border border-[#333333] bg-[#111111] outline-none focus:border-[#E5E5E5] px-4 text-[#E5E5E5] transition-all duration-300"
                placeholder="Password"
              />
              {errors.password && <p className="text-[#FF5555] text-sm">{errors.password.message}</p>}
            </div>

            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className={`${bebasNeue.className} text-[#999999] hover:text-[#E5E5E5] transition-all duration-300`}
              >
                FORGOT PASSWORD?
              </Link>
            </div>

            <button
              disabled={isSubmitting}
              className="w-full h-12 mt-4 bg-[#111111] border border-[#333333] text-[#E5E5E5] rounded-md hover:bg-[#222222] transition-all duration-300"
            >
              <span className={`${bebasNeue.className} text-xl`}>{isSubmitting ? "LOGGING IN..." : "LOGIN"}</span>
            </button>

            <div className="text-[#999999] flex gap-2 items-center justify-center mt-4">
              <p>Don&apos;t have an Account?</p>
              <Link href="/auth/register" className={`${bebasNeue.className} font-bold text-[#E5E5E5] hover:underline`}>
                REGISTER
              </Link>
            </div>
          </form>

        
        </div>
      </div>
    </div>
  )
}

export default Login

