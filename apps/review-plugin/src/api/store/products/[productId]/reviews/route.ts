import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { Review } from "../../../../../modules/review/models/review";
import { CustomerGetReviewsQuerySchema } from "./validation";
import { REVIEW_MODULE } from "../../../../../modules/review";
import ReviewModuleService from "../../../../../modules/review/service";
import { maskEmail } from "../../../../../lib/maskEmail";

export async function GET(
  req: MedusaRequest<never, CustomerGetReviewsQuerySchema>,
  res: MedusaResponse<{
    result: Review[]
    total: number
    offset: number
    limit: number
  }>
) {
  const productId = req.params.productId
  const query = req.validatedQuery;
  const reviewModuleService: ReviewModuleService = req.scope.resolve(REVIEW_MODULE);
  const skip = query.offset ? parseInt(query.offset, 10) : 0;
  const take = query.limit ? parseInt(query.limit, 10) : 15;

  const [result, total] = await reviewModuleService.listAndCountReviews({
    is_published: true,
    product_id: productId,
  }, {
    skip,
    take
  })

  res.json({
    result: result.map(r => ({
      ...r,
      email: maskEmail(r.email)
    })),
    total,
    offset: skip,
    limit: take
  })
}