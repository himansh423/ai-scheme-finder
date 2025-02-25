import { z } from "zod";

export const Recommend = z.object({
  age: z
    .number()
    .int("Age must be an integer")
    .min(1, "Age must be at least 1")
    .max(100, "Age must be realistic"),

  salary: z
    .number()
    .min(1, "Salary must be at least 1")
    .max(1_000_000, "Salary must be realistic"),

  occupation: z
    .string()
    .min(2, "Occupation must be at least 2 characters long")
    .max(50, "Occupation must not exceed 50 characters")
    .trim(),
  location: z
    .string()
    .min(2, "Location must be at least 2 characters long")
    .max(100, "Location must not exceed 100 characters")
    .trim(),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters long")
    .max(500, "Description must not exceed 500 characters")
    .trim(),
});
