import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setUserAddress as setUserAddressApi } from "../../services/apiAddress";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

export function useSetUserAddress(type) {
  const { userID } = useParams();
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const { isLoading, mutate: setUserAddress } = useMutation({
    mutationFn: setUserAddressApi,
    onSuccess: () => {
      queryClient.invalidateQueries("address");

      if (type === "update") {
        toast.success("Address updated successfully");
      }

      if (type === "shipping") {
        navigate(`/final-check-out/${userID}`);
      }
    },
  });
  return { isLoading, setUserAddress };
}
