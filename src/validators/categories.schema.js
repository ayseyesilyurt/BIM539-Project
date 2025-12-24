import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(2)
});

export const updateCategorySchema = z
  .object({
    name: z.string().min(2).optional()
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided"
  });