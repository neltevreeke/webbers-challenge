import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { REVIEW_MODULE } from "../../modules/review"
import ReviewModuleService from "../../modules/review/service"
import { Review } from "../../modules/review/models/review"
import { sanitize } from "../../lib/sanitize"

type CustomerCreateReviewStepInput = Omit<Review, "id" | "is_verified_customer" | "is_published" | "created_at" | "updated_at" | "deleted_at">

export const customerCreateReviewStep = createStep(
  "customer-create-review",
  async (input: CustomerCreateReviewStepInput, { container }) => {
    const reviewService: ReviewModuleService = container.resolve(REVIEW_MODULE)
    const customerService = container.resolve("customer")

    const [customer, customerCount] = await customerService.listAndCountCustomers({
      email: input.email.toLowerCase()
    })

    const review = await reviewService.createReviews({
      ...input,
      title: sanitize(input.title),
      description: sanitize(input.description),
      locale: input.locale.toLowerCase(),
      is_verified_customer: customerCount === 1 && customer[0].email === input.email.toLowerCase()
    })

    return new StepResponse(review, review.id)
  },
  async (id, { container }) => {
    if (!id) {
      return
    }

    const reviewService: ReviewModuleService = container.resolve(REVIEW_MODULE)

    await reviewService.deleteReviews(id)
  }
)