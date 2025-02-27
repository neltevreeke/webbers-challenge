import { createWorkflow, WorkflowResponse } from "@medusajs/framework/workflows-sdk";
import { validateAdminUpdateReviewInputStep } from "./steps/validateAdminUpdateReview";
import { adminUpdateReviewStep } from "./steps/adminUpdateReview";
import { Review } from "../modules/review/models/review";

type AdminUpdateReviewWorkflowInput = {
  id: string;
  is_published: boolean;
}

export const adminUpdateReviewWorkflow = createWorkflow(
  "admin-update-review",
  (input: AdminUpdateReviewWorkflowInput) => {
    validateAdminUpdateReviewInputStep(input)

    const review = adminUpdateReviewStep(input)

    return new WorkflowResponse({
      review
    })
  }
)