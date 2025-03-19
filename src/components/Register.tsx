"use client"
import type React from "react"
import { Bebas_Neue } from "next/font/google"
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { z } from "zod"
import Link from "next/link"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { User } from "@/library/zodSchema/RegisterSchema"
import { emailActions } from "@/redux/emailSlice"

const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"] })

type UserData = z.infer<typeof User>
const Register: React.FC = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<UserData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(User),
  })

  const onSubmit: SubmitHandler<UserData> = async (data: UserData) => {
    try {
      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
      }
      const res = await axios.post("/api/auth/register", payload)

      if (res.data.success) {
        dispatch(emailActions.setEmail({ data: data.email }))
        router.push(`/auth/verify-otp/${payload.email}`)
      }
    } catch (error: unknown) {
      console.error("Error:", error)
      if (error instanceof Error)
        setError("root", {
          type: "manual",
          message: error.message,
        })
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
          <h2 className={`${bebasNeue.className} text-3xl mb-6 text-center text-[#E5E5E5]`}>REGISTER</h2>

          {errors.root && (
            <div className="w-full bg-[#331111] border border-[#662222] text-[#FF5555] p-3 rounded-md mb-4">
              {errors.root.message}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <input
                  {...register("firstName")}
                  type="text"
                  className="w-full h-12 rounded-md border border-[#333333] bg-[#111111] outline-none focus:border-[#E5E5E5] px-4 text-[#E5E5E5] transition-all duration-300"
                  placeholder="First Name"
                />
                {errors.firstName && <p className="text-[#FF5555] text-sm">{errors.firstName.message}</p>}
              </div>

              <div className="space-y-1">
                <input
                  {...register("lastName")}
                  type="text"
                  className="w-full h-12 rounded-md border border-[#333333] bg-[#111111] outline-none focus:border-[#E5E5E5] px-4 text-[#E5E5E5] transition-all duration-300"
                  placeholder="Last Name"
                />
                {errors.lastName && <p className="text-[#FF5555] text-sm">{errors.lastName.message}</p>}
              </div>
            </div>

            <div className="space-y-1">
              <input
                {...register("email")}
                type="email"
                className="w-full h-12 rounded-md border border-[#333333] bg-[#111111] outline-none focus:border-[#E5E5E5] px-4 text-[#E5E5E5] transition-all duration-300"
                placeholder="Email"
              />
              {errors.email && <p className="text-[#FF5555] text-sm">{errors.email.message}</p>}
            </div>

            <div className="space-y-1">
              <input
                {...register("phoneNumber")}
                type="number"
                className="w-full h-12 rounded-md border border-[#333333] bg-[#111111] outline-none focus:border-[#E5E5E5] px-4 text-[#E5E5E5] transition-all duration-300"
                placeholder="Phone Number"
              />
              {errors.phoneNumber && <p className="text-[#FF5555] text-sm">{errors.phoneNumber.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <input
                  {...register("password")}
                  type="password"
                  className="w-full h-12 rounded-md border border-[#333333] bg-[#111111] outline-none focus:border-[#E5E5E5] px-4 text-[#E5E5E5] transition-all duration-300"
                  placeholder="Password"
                />
                {errors.password && <p className="text-[#FF5555] text-sm">{errors.password.message}</p>}
              </div>

              <div className="space-y-1">
                <input
                  {...register("confirmPassword")}
                  type="password"
                  className="w-full h-12 rounded-md border border-[#333333] bg-[#111111] outline-none focus:border-[#E5E5E5] px-4 text-[#E5E5E5] transition-all duration-300"
                  placeholder="Confirm Password"
                />
                {errors.confirmPassword && <p className="text-[#FF5555] text-sm">{errors.confirmPassword.message}</p>}
              </div>
            </div>

            <button
              disabled={isSubmitting}
              className="w-full h-12 mt-4 bg-[#111111] border border-[#333333] text-[#E5E5E5] rounded-md hover:bg-[#222222] transition-all duration-300"
            >
              <span className={`${bebasNeue.className} text-xl`}>{isSubmitting ? "REGISTERING..." : "REGISTER"}</span>
            </button>

            <div className="text-[#999999] flex gap-2 items-center justify-center mt-4">
              <p>Already have an Account?</p>
              <Link href={"/auth/login"} className={`${bebasNeue.className} font-bold text-[#E5E5E5] hover:underline`}>
                LOGIN
              </Link>
            </div>
          </form>

          
        </div>
      </div>
    </div>
  )
}

export default Register

