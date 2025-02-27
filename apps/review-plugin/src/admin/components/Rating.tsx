import { StarSolid } from "@medusajs/icons";

interface RatingProps {
  value: number;
}

const Rating = ({ value }: RatingProps) => {
  return (
    <div className="flex items-center space-x-1">
    <span>
      ({value})
    </span>
    <div className="flex space-x-1">
      {Array.from({ length: value }).map((_, index) => (
        <StarSolid key={`rating-icon-${index}`} color="yellow" />
      ))}
    </div>
  </div>
  )
}

export default Rating