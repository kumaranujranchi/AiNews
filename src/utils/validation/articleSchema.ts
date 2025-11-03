import { z } from "zod";

export const articleSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  featured_image_url: z.string().url().optional().or(z.literal("")),
  published_at: z.string().datetime().optional().or(z.literal("")),
  tags: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
});

export type ArticleFormValues = z.infer<typeof articleSchema>;

