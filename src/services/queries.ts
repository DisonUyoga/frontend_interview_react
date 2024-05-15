import { useQuery } from "@tanstack/react-query";
import { getAsteroid } from "./api";

export function useAsteroids(
  start_date: string | null,
  end_date: string | null
) {
  return useQuery({
    queryKey: ["asteroid", { start_date, end_date }],
    queryFn: () => getAsteroid(start_date, end_date),
  });
}
