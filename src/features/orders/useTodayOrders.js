import { useQuery } from "@tanstack/react-query";
import { getTodayOrders } from "../../services/apiOrders";

export function useTodayOrders() {
  const { data: orders, isLoading } = useQuery({
    queryKey: ["todayOrders"],
    queryFn: getTodayOrders,
  });
  return { orders, isLoading };
}
