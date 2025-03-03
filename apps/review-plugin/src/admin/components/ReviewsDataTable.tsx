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
  const [search, setSearch] = useState<string>("")
  const offset = useMemo(() => {
    return pagination.pageIndex * limit
  }, [pagination])
  // Note: Better to create a hook for this if usage is recurring
  const { data } = useQuery<GetReviewsResponse>({
    queryFn: () => sdk.client.fetch("/admin/reviews",{
      query: {
        limit,
        offset,
        search
      }
    }),
    queryKey: ["reviews", offset, limit, search]
  })
  const table = useDataTable({
    columns: reviewsDataTableColumns,
    data: data?.result || [],
    getRowId: (row) => row.id,
    rowCount: data?.total || 0,
    pagination: {
      state: pagination,
      onPaginationChange: setPagination
    },
    search: {
      state: search,
      onSearchChange: setSearch,
    }
  })

  return (
    <DataTable instance={table}>
      <div className="w-[200px] mb-4 ml-auto">
        <DataTable.Search placeholder="Search" />
      </div>
      <DataTable.Table />
      <DataTable.Pagination />
    </DataTable>
  )
}

export default ReviewsDataTable;