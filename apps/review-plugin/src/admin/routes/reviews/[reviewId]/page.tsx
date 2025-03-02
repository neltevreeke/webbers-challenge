import { Link, useParams } from "react-router-dom";
import { Button, Container, Heading } from "@medusajs/ui";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AdminGetReviewResponse, AdminUpdateReviewResponse } from "../../../../api/admin/reviews/[id]/route";
import { sdk } from "../../../lib/sdk";
import { ArrowLeft } from "@medusajs/icons";
import Rating from "../../../components/Rating";

const ReviewDetailPage = () => {
  const { reviewId } = useParams();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery<AdminGetReviewResponse>({
    queryFn: () => sdk.client.fetch(`/admin/reviews/${reviewId}`),
    queryKey: ["review", reviewId]
  })

  const handlePublishReview = async () => {
    await sdk.client.fetch<AdminUpdateReviewResponse>(`/admin/reviews/${reviewId}`, {
      method: "PUT",
      body: {
        is_published: !data?.result.is_published
      }
    })

    queryClient.invalidateQueries({
      queryKey: ["review", reviewId]
    });
    queryClient.invalidateQueries({
      queryKey: ["reviews"]
    })
  }

  if (isLoading || !data) {
    return (
      <Container className="divide-y p-0">
        <div className="flex items-center justify-between px-6 py-4">
          <Heading level="h2">Loading...</Heading>
        </div>
      </Container>
    )
  }

  return (
    <div className="space-y-6 mt-4">
      <div className="flex justify-between">
        <Link 
          to="/reviews" 
        >
          <Button variant="transparent">
            <ArrowLeft /> 
            Back to reviews
          </Button>
        </Link>
        <Button onClick={handlePublishReview} variant={!data.result.is_published ? "primary" : "danger"}>
          {data.result.is_published ? "Unpublish" : "Publish"} review
        </Button>
      </div>
      <Container className="py-12 flex gap-y-6 flex-col">
        <div>
          <Heading level="h2" className="text-lg font-black mb-2">Email:</Heading>
          <div className="flex items-center space-x-4">
            <p>{data.result.email}</p>
            {data.result.is_verified_customer ? (
              <div className="flex items-center space-x-2">
                <div className="bg-green-500 rounded-full h-2 w-2" />
                <span>Verified</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <div className="bg-red-500 rounded-full h-2 w-2" />
                <span>Unverified</span>
              </div>
            )}
          </div>
        </div>
        <div>
          <Heading level="h2" className="text-lg font-black mb-2">Locale:</Heading>
          <p>{data.result.locale}</p>
        </div>
      </Container>
      <Container className="py-12 flex gap-y-4 flex-col">
        <div className="flex items-center gap-x-4">
          <Heading level="h2" className="text-2xl font-black">Review</Heading>
          <Rating value={data.result.rating} />
        </div>
        <div>
          <Heading level="h2" className="text-lg font-black mb-2">Product(s):</Heading>
          <Link to={`/products/${data.result.product_id}`}>
            {data.result.product_id}
          </Link>
        </div>
        <div>
          <Heading level="h2" className="text-lg font-black mb-2">Title:</Heading>
          {data.result.title}
        </div>
        <div>
          <Heading level="h2" className="text-lg font-black mb-2">Description:</Heading>
          {data.result.description}
        </div>
      </Container>
    </div>
  )
}

export default ReviewDetailPage;