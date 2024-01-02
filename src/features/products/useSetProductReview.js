import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setReview as setReviewApi } from "../../services/apiProducts";

export function useSetProductReview(id) {
  const queryClient = useQueryClient();
  const { isLoading, mutate: setProductReview } = useMutation({
    mutationFn: setReviewApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["product", id]);
    },
  });

  return { isLoading, setProductReview };
}
