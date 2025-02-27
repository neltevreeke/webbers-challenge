import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { REVIEW_MODULE } from "../../modules/review"
import ReviewModuleService from "../../modules/review/service"
import { Review } from "../../modules/review/models/review"

type AdminUpdateReviewStepInput = {
  id: string
  is_published: boolean
}

export const adminUpdateReviewStep = createStep(
  "admin-update-review",
  async ({
    id,
    is_published
  }: AdminUpdateReviewStepInput, { container }) => {
    const reviewService: ReviewModuleService = container.resolve(REVIEW_MODULE)

    const review = await reviewService.updateReviews({
      id,
      is_published
    })

    return new StepResponse(review, review.id)
  }
)