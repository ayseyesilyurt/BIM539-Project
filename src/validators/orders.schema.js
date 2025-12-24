import { z } from "zod";

const allowedStatuses = ["pending", "paid", "shipped", "cancelled"];

export const createOrderSchema = z.object({
  userId: z.number().int().positive(),
  total: z.number().nonnegative(),
  status: z.string().optional().refine((s) => !s || allowedStatuses.includes(s), {
    message: `status must be one of: ${allowedStatuses.join(", ")}`
  })
});

export const updateOrderSchema = z
  .object({
    userId: z.number().int().positive().optional(),
    total: z.number().nonnegative().optional(),
    status: z.string().optional().refine((s) => !s || allowedStatuses.includes(s), {
      message: `status must be one of: ${allowedStatuses.join(", ")}`
    })
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided"
  });