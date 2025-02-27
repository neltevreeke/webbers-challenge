import { createWorkflow, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { validateCustomerCreateReviewInputStep } from "./steps/validateCustomerCreateReview"
import { customerCreateReviewStep  } from "./steps/customerCreateReview"
import { Review } from "../modules/review/models/review"

type CustomerCreateReviewWorkflowInput = Omit<Review, "id" | "is_verified_customer" | "is_published" | "created_at" | "updated_at" | "deleted_at">

export const customerCreateReviewWorkflow = createWorkflow(
  "customer-create-review",
  (input: CustomerCreateReviewWorkflowInput) => {
    validateCustomerCreateReviewInputStep(input)

    const review = customerCreateReviewStep(input)

    return new WorkflowResponse({
      review
    })
  }
)