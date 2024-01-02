import { useQuery } from "@tanstack/react-query";
import { getOrder } from "../../services/apiOrders";

export function useOrder(orderID) {
  const { isLoading, data: order } = useQuery({
    queryKey: ["order", orderID],
    queryFn: () => getOrder(orderID),
  });
  return { isLoading, order };
}
