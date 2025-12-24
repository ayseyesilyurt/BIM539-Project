import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(2),
  price: z.number().nonnegative(),
  categoryId: z.number().int().positive()
});

export const updateProductSchema = z
  .object({
    name: z.string().min(2).optional(),
    price: z.number().nonnegative().optional(),
    categoryId: z.number().int().positive().optional()
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided"
  });