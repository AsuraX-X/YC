import { z } from "zod";

export const formSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z
    .string()
    .min(3, "Category must be at least 3 characters")
    .max(20, "Category must be less than 20 characters"),
  link: z
    .string()
    .url("Invalid URL")
    .refine(
      (url) => {
        return /\.(jpg|jpeg|png|gif|webp|svg|bmp|ico)(\?.*)?$/i.test(url);
      },
      {
        message:
          "URL must point to a valid image file (.jpg, .png, .gif, etc.)",
      }
    ),
  pitch: z.string().min(10, "Pitch must be at least 10 characters"),
});
