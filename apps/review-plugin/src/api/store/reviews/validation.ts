import { z } from "zod";

export const customerCreateReviewSchema = z.object({
  product_id: z.string(),
  rating: z.number(),
  email: z.string().email(),
  title: z.string(),
  description: z.string(),
  locale: z.string(),
});

export type CustomerCreateReviewSchema = z.infer<typeof customerCreateReviewSchema>;