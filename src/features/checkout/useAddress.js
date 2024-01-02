import { useQuery } from "@tanstack/react-query";
import { getUserAddress } from "../../services/apiAddress";

export function useAddress(id) {
  const { isLoading, data: address } = useQuery({
    queryKey: ["address"],
    queryFn: () => getUserAddress(id),
  });
  return { isLoading, address };
}
