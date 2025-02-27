import { MedusaError } from "@medusajs/framework/utils"
import { createStep } from "@medusajs/framework/workflows-sdk"
import { REVIEW_MODULE } from "../../modules/review"
import ReviewModuleService from "../../modules/review/service"

type ValidateAdminUpdateReviewStepInput = {
  id: string
}

export const validateAdminUpdateReviewInputStep = createStep(
  "validate-admin-update-review-input",
  async ({ id }: ValidateAdminUpdateReviewStepInput, { container }) => {
    const reviewModuleService: ReviewModuleService = container.resolve(REVIEW_MODULE)

    const review = await reviewModuleService.retrieveReview(id)

    if (!review) {
      throw new MedusaError(
        MedusaError.Types.NOT_FOUND,
        `Review with id: ${id} not found`
      )
    }
  }
)