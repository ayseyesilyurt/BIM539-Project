import { z } from "zod";

export const createUserSchema = z.object({
  email: z.string().email(),
  fullName: z.string().min(2)
});

export const updateUserSchema = z
  .object({
    email: z.string().email().optional(),
    fullName: z.string().min(2).optional()
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided"
  });