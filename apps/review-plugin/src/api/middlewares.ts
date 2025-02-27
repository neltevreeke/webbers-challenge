import {
  validateAndTransformBody,
  defineMiddlewares,
  validateAndTransformQuery
} from "@medusajs/framework/http"
import { customerCreateReviewSchema } from "./store/reviews/validation"
import { customerGetReviewsQuerySchema } from "./store/products/[productId]/reviews/validation"
import { adminGetReviewsQuerySchema } from "./admin/reviews/validation"

export default defineMiddlewares({
  routes: [
    {
      matcher: "/store/reviews",
      method: "POST",
      middlewares: [
        // @ts-expect-error -- According to docs, this should be a valid type: https://docs.medusajs.com/learn/fundamentals/api-routes/validation#step-1-create-validation-schema
        validateAndTransformBody(customerCreateReviewSchema)
      ]
    },
    {
      matcher: "/store/products/:productId/reviews",
      method: "GET",
      middlewares: [
        // @ts-expect-error -- According to docs, this should be a valid type: https://docs.medusajs.com/learn/fundamentals/api-routes/validation#step-1-create-validation-schema
        validateAndTransformQuery(customerGetReviewsQuerySchema, {})
      ]
    },
    {
      matcher: "/admin/reviews",
      method: "GET",
      middlewares: [
        // @ts-expect-error -- According to docs, this should be a valid type: https://docs.medusajs.com/learn/fundamentals/api-routes/validation#step-1-create-validation-schema
        validateAndTransformQuery(adminGetReviewsQuerySchema, {})
      ]
    }
  ]
})