import { z } from "zod";

export const adminUpdateReviewSchema = z.object({
  is_published: z.boolean()
})

export type AdminUpdateReviewSchema = z.infer<typeof adminUpdateReviewSchema>