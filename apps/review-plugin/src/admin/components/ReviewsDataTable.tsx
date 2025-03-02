import {
  DataTable,
  DataTablePaginationState,
  useDataTable,
} from "@medusajs/ui"
import { useMemo, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import type { GetReviewsResponse } from "../../api/admin/reviews/route"
import { reviewsDataTableColumns } from "./ReviewsDataTableColumns"
import { sdk } from "../lib/sdk"

interface ReviewsDataTableProps {
  limit?: number
}

const ReviewsDataTable = ({
  limit = 15
}: ReviewsDataTableProps) => {
  const [pagination, setPagination] = useState<DataTablePaginationState>({
    pageSize: limit,
    pageIndex: 0
  })
  const offset = useMemo(() => {
    return pagination.pageIndex * limit
  }, [pagination])
  // Note: Better to create a hook for this if usage is recurring
  const { data, isLoading } = useQuery<GetReviewsResponse>({
    queryFn: () => sdk.client.fetch("/admin/reviews",{
      query: {
        limit,
        offset
      }
    }),
    queryKey: ["reviews", offset, limit]
  })
  const table = useDataTable({
    columns: reviewsDataTableColumns,
    data: data?.result || [],
    getRowId: (row) => row.id,
    rowCount: data?.total || 0,
    isLoading,
    pagination: {
      state: pagination,
      onPaginationChange: setPagination
    }
    // TODO: Add Search query handling
  })

  return (
    <DataTable instance={table}>
      <DataTable.Table />
      <DataTable.Pagination />
    </DataTable>
  )
}

export default ReviewsDataTable;