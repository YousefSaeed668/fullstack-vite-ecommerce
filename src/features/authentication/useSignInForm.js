import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  signIn as signInApi,
  signInWithGoogle as signInWithGoogleApi,
} from "../../services/apiAuth";

export function useSignInForm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: signIn, isLoading } = useMutation({
    mutationFn: signInApi,
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    },
  });
  return { signIn, isLoading };
}

export function useSignInWithGoogle() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: signInWithGoogle, isLoading: isLoadingGoogle } = useMutation({
    mutationFn: signInWithGoogleApi,
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    },
  });
  return { signInWithGoogle, isLoadingGoogle };
}
