import z from 'zod'

export const customerGetReviewsQuerySchema = z.object({
  offset: z.string().optional(),
  limit: z.string().optional(),
})

export type CustomerGetReviewsQuerySchema = z.infer<typeof customerGetReviewsQuerySchema>