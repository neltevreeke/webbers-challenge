import { defineLink } from "@medusajs/framework/utils"
import ReviewModule from "../modules/review"
import ProductModule from "@medusajs/medusa/product"

export default defineLink(
  {
    ...ReviewModule.linkable.review.id,
    field: "product_id"
  }, 
  ProductModule.linkable.product.id,
  {
    readOnly: true
  }
)