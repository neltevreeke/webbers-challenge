import z from 'zod'

export const adminGetReviewsQuerySchema = z.object({
  offset: z.string().optional(),
  limit: z.string().optional(),
})

export type AdminGetReviewsQuerySchema = z.infer<typeof adminGetReviewsQuerySchema>