import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../../services/apiOrders";

export function useOrders(id) {
  const userID = id ? id : "all";
  const { isLoading, data: orders } = useQuery({
    queryFn: () => getOrders(userID),
    queryKey: ["orders"],
  });
  return { isLoading, orders };
}
