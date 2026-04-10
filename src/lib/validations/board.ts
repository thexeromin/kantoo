import { z } from "zod";

export const boardSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Board title is required" })
    .max(50, { message: "Title cannot exceed 50 characters" }),
  description: z
    .string()
    .max(255, { message: "Description cannot exceed 255 characters" })
    .optional()
});

export type BoardInput = z.infer<typeof boardSchema>;
