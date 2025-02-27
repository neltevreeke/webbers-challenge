import { createDataTableColumnHelper, DropdownMenu, IconButton } from "@medusajs/ui"
import { Review } from "../../modules/review/models/review"
import { formatDate } from "../../lib/formatDate"
import { EllipsisHorizontal, Pencil, Trash } from "@medusajs/icons"
import { Link } from "react-router-dom"
import Rating from "./Rating"

const columnHelper = createDataTableColumnHelper<Review>()

export const reviewsDataTableColumns = [
  columnHelper.accessor("created_at", {
    header: "Date added",
    cell: (row) => {
      const date = new Date(row.getValue())

      return formatDate(date)
    }
  }),
  columnHelper.accessor("is_published", {
    header: "State",
    cell: (row) => {
      const value = row.getValue()

      return value ? (
        <div className="flex items-center space-x-2">
          <div className="bg-green-500 rounded-full h-2 w-2" />
          <span>Published</span>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <div className="bg-red-500 rounded-full h-2 w-2" />
          <span>Unpublished</span>
        </div>
      )
    }
  }),
  columnHelper.accessor("email", {
    header: "Email"
  }),
  columnHelper.accessor("is_verified_customer", {
    header: "Verified customer",
    cell: (row) => {
      const value = row.getValue()

      return value ? (
        <div className="flex items-center space-x-2">
          <div className="bg-green-500 rounded-full h-2 w-2" />
          <span>Verified</span>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <div className="bg-red-500 rounded-full h-2 w-2" />
          <span>Unverified</span>
        </div>
      )
    }
  }),
  columnHelper.accessor("rating", {
    header: "Rating",
    cell: (row) => {
      const value = row.getValue()

      return (
        <Rating value={value} />
      )
    }
  }),
  columnHelper.accessor("locale", {
    header: "Locale"
  }),
  columnHelper.accessor("updated_at", {
    header: "Last updated",
    cell: (row) => {
      const date = new Date(row.getValue())
      const formattedDate = formatDate(date)
      const formattedTime = date.toLocaleTimeString("nl-NL", {
        hour: "2-digit",
        minute: "2-digit"
      })

      return `${formattedDate}, ${formattedTime}`
    }
  }),
  columnHelper.accessor("id", {
    header: undefined,
    cell: (row) => {
      const id = row.getValue()

      return (
        <div className="justify-end flex">
        <DropdownMenu>
          <DropdownMenu.Trigger asChild>
            <IconButton>
              <EllipsisHorizontal />
            </IconButton>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content align="end">
            <Link to={`/reviews/${id}`} className="gap-x-2">
              <DropdownMenu.Item className="gap-x-2">
                <Pencil className="text-ui-fg-subtle" />
                Edit
              </DropdownMenu.Item>
            </Link>
            <DropdownMenu.Separator />
            <DropdownMenu.Item className="gap-x-2 text-red-500" disabled>
              <Trash />
              Delete
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu>
        </div>
      )
    }
  })
]