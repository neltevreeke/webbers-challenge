import { MedusaError } from "@medusajs/framework/utils"
import { createStep } from "@medusajs/framework/workflows-sdk"
import { Review } from "../../modules/review/models/review";

type ValidateCustomerCreateReviewStepInput = Omit<Review, "id" | "is_verified_customer" | "is_published" | "created_at" | "updated_at" | "deleted_at">

export const validateCustomerCreateReviewInputStep = createStep(
  "validate-customer-create-review-input",
  async ({ product_id, rating }: ValidateCustomerCreateReviewStepInput, { container }) => {
    const productService = container.resolve("product")

    const [, productCount] = await productService.listAndCountProducts({
      id: product_id
    })

    if (productCount === 0) {
      throw new MedusaError(
        MedusaError.Types.NOT_FOUND,
        `Product with id: ${product_id} not found`
      )
    }

    if (rating < 1 || rating > 5) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        `Rating must be between 1 and 5`
      )
    }
  }
)