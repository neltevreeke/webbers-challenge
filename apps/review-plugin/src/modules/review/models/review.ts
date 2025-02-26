import { model } from "@medusajs/framework/utils"
import { InferTypeOf } from "@medusajs/framework/types"

const ReviewModel = model.define("review", {
  id: model.id().primaryKey(),
  product_id: model.text(),
  rating: model.number(),
  email: model.text(),
  title: model.text(),
  description: model.text(),
  locale: model.text(),
  is_verified_customer: model.boolean().default(false),
  is_published: model.boolean().default(false),
})

export type Review = InferTypeOf<typeof ReviewModel>

export default ReviewModel