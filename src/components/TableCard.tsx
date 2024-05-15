import { NearEarthObjects } from "@/util/types";
import { useState } from "react";
import { useComment } from "@/services/mutation";

interface TableCardProps {
  data: NearEarthObjects;
}

function TableCard({ data }: TableCardProps) {
  const [comment, setComment] = useState<string | undefined>();
  const createComment = useComment();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createComment.mutate(comment);
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      handleSubmit(e);
      console.log("pressed");
    }
  };
  return (
    <tr>
      <th>{data?.id}</th>
      <td>{data?.close_approach_data[0].close_approach_date}</td>
      <td>{data?.name}</td>
      <td>
        {data?.is_potentially_hazardous_asteroid ? "Hazardous" : "friendly"}
      </td>
      <td>
        {data?.estimated_diameter.meters.estimated_diameter_max.toFixed(2)}
      </td>
      <td>
        {parseInt(
          data?.close_approach_data[0].miss_distance.kilometers
        ).toFixed(2)}
      </td>
      <td>
        {parseInt(
          data?.close_approach_data[0].relative_velocity.kilometers_per_hour
        ).toFixed(2)}
      </td>
      <td>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="comment..."
            className="bg-transparent hover:border border-grey-500 rounded-lg p-1"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </form>
      </td>
    </tr>
  );
}

export default TableCard;
