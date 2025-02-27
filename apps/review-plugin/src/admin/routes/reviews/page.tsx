import{ defineRouteConfig } from "@medusajs/admin-sdk";
import { 
  Container, 
  Heading,
} from "@medusajs/ui";
import { Star } from "@medusajs/icons"
import ReviewsDataTable from "../../components/ReviewsDataTable";

const ReviewPage = () => {
  return (
    <Container className="px-8 pt-12">
      <Heading level="h1">Reviews</Heading>
      <div className="mt-12">
        <ReviewsDataTable />
      </div>
    </Container>
  )
}

export const config = defineRouteConfig({
  label: "Reviews",
  icon: Star
})

export default ReviewPage;