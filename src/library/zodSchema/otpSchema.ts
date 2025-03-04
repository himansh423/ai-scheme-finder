import { z } from "zod"

export const otpSchema = z
  .object({
    number1: z.string().length(1, "Required"),
    number2: z.string().length(1, "Required"),
    number3: z.string().length(1, "Required"),
    number4: z.string().length(1, "Required"),
    number5: z.string().length(1, "Required"),
    number6: z.string().length(1, "Required"),
  })
  .refine(
    (data) => {
      const otp = Object.values(data).join("")
      return otp.length === 6 && /^\d+$/.test(otp)
    },
    {
      message: "Enter a valid 6-digit OTP",
      path: ["number1"],
    },
  )

