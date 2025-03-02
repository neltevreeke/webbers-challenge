import{ defineRouteConfig } from "@medusajs/admin-sdk";
import { 
  Container, 
  Heading,
} from "@medusajs/ui";
import { Star } from "@medusajs/icons"
import ReviewsDataTable from "../../components/ReviewsDataTable";
import { useSearchParams } from "react-router-dom";
import ReviewDetail from "../../components/ReviewDetail";

const ReviewPage = () => {
  const [searchParams] = useSearchParams();
  const reviewId = searchParams.get("reviewId");

  if (!reviewId) {
    return (
      <Container className="px-8 pt-12">
        <Heading level="h1">Reviews</Heading>
        <div className="mt-12">
          <ReviewsDataTable />
        </div>
      </Container>
    )
  }

  return (
    <ReviewDetail /> 
  )
}

export const config = defineRouteConfig({
  label: "Reviews",
  icon: Star
})

export default ReviewPage;