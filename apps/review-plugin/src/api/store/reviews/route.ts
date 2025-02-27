import {
  MedusaRequest,
  MedusaResponse
} from "@medusajs/framework/http"
import { Review } from "../../../modules/review/models/review"
import { customerCreateReviewWorkflow } from "../../../workflows/createReviewWorkflow"
import { CustomerCreateReviewSchema } from "./validation"

export async function POST(
  req: MedusaRequest<CustomerCreateReviewSchema>,
  res: MedusaResponse<Review>
) {
  const { result } = await customerCreateReviewWorkflow(req.scope)
    .run({
      input: req.validatedBody
    })

  res.json(result.review)
}