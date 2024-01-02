import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signup as signupApi } from "../../services/apiAuth";

export function useSignup() {
  const navigate = useNavigate();
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      navigate("/login");
    },
  });
  return { signup, isLoading };
}
