import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserProfile as updateUserProfileApi } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: updateUserProfile } = useMutation({
    mutationFn: updateUserProfileApi,
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
    },
  });

  return { isLoading, updateUserProfile };
}
