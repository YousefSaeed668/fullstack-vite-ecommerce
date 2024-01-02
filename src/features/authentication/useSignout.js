import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signOut as signOutApi } from "../../services/apiAuth";

export function useSignout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading, mutate: signOut } = useMutation({
    mutationFn: signOutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      localStorage.removeItem("user");
      navigate("/login");
    },
  });
  return { signOut, isLoading };
}
