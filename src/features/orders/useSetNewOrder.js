import { useMutation } from "@tanstack/react-query";
import { setNewOrder as setNewOrderApi } from "../../services/apiOrders";

export function useSetNewOrder() {
  const { isLoading, mutate: setNewOrder } = useMutation({
    mutationFn: setNewOrderApi,
  });
  return { isLoading, setNewOrder };
}
