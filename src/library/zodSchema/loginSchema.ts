import { z } from "zod";

export const User = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(6, "Password should be at least 6 characters")
      .max(20, "Password should not be longer than 20 characters"),
  })
