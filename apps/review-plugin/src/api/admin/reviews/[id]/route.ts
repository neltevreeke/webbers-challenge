import { AuthenticatedMedusaRequest, MedusaResponse } from "@medusajs/framework"
import { Review } from "../../../../modules/review/models/review"
import { REVIEW_MODULE } from "../../../../modules/review"
import { MedusaError } from "@medusajs/framework/utils"
import ReviewModuleService from "../../../../modules/review/service"
import { AdminUpdateReviewSchema } from "./validation"
import { adminUpdateReviewWorkflow } from "../../../../workflows/updateReviewWorkflow"

export type AdminGetReviewResponse = {
  result: Review;
}

export async function GET(
  req: AuthenticatedMedusaRequest<never, never>,
  res: MedusaResponse<AdminGetReviewResponse>
) {
  const reviewModuleService: ReviewModuleService = req.scope.resolve(REVIEW_MODULE)
  const reviewId = req.params.id

  const result = await reviewModuleService.retrieveReview(reviewId)

  if (!result) {
    throw new MedusaError(
      MedusaError.Types.NOT_FOUND, 
      `Review with id: ${reviewId} was not found`
    )
  }

  res.json({
    result
  })
}

export type AdminUpdateReviewResponse = {
  result: Review;
}

export async function PUT(
  req: AuthenticatedMedusaRequest<AdminUpdateReviewSchema>,
  res: MedusaResponse<AdminUpdateReviewResponse>
) {
  const id = req.params.id

  const { result } = await adminUpdateReviewWorkflow(req.scope)
    .run({
      input: {
        id,
        is_published: req.validatedBody.is_published
      }
    })

  res.json({
    result: result.review
  })
}