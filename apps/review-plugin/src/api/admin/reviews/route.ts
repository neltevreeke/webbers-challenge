import { AuthenticatedMedusaRequest, MedusaResponse } from "@medusajs/framework";
import { Review } from "../../../modules/review/models/review";
import { REVIEW_MODULE } from "../../../modules/review";
import { AdminGetReviewsQuerySchema } from "./validation";
import ReviewModuleService from "../../../modules/review/service";

export type GetReviewsResponse = {
  result: Review[]
  total: number
  offset: number
  limit: number
}

export async function GET(
  req: AuthenticatedMedusaRequest<never, AdminGetReviewsQuerySchema>,
  res: MedusaResponse<GetReviewsResponse>
) {
  const reviewModuleService: ReviewModuleService = req.scope.resolve(REVIEW_MODULE)
  const query = req.validatedQuery
  const skip = query.offset ? parseInt(query.offset, 10) : 0
  const take = query.limit ? parseInt(query.limit, 10) : 15

  const [result, total] = await reviewModuleService.listAndCountReviews({
    q: query.search
  }, {
    skip,
    take
  })

  res.json({
    result,
    total,
    offset: skip,
    limit: take
  })
}

