import {
  validateAndTransformBody,
  defineMiddlewares
} from "@medusajs/framework/http"
import { customerCreateReviewSchema } from "./store/reviews/validation"

export default defineMiddlewares({
  routes: [
    {
      matcher: "/store/reviews",
      method: "POST",
      middlewares: [
        // @ts-expect-error -- According to docs, this should be a valid type: https://docs.medusajs.com/learn/fundamentals/api-routes/validation#step-1-create-validation-schema
        validateAndTransformBody(customerCreateReviewSchema)
      ]
    }
  ]
})