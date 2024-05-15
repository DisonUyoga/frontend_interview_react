import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postComment } from "./api";

export function useComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (comment: string | undefined) => postComment(comment),
    onSettled: async (_, error) => {
      if (error) {
        console.log("error");
      } else {
        await queryClient.invalidateQueries({ queryKey: ["asteroid"] });
      }
    },
  });
}
