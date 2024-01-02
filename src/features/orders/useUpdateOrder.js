import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrderStatus as updateOrderStatusApi } from "../../services/apiOrders";
import toast from "react-hot-toast";

export function useUpdateOrder(orderID) {
  const queryClient = useQueryClient();
  const { isLoading, mutate: updateOrderStatus } = useMutation({
    mutationFn: updateOrderStatusApi,
    onSuccess: () => {
      toast.success("Order status updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["order", orderID],
      });
    },
  });
  return { isLoading, updateOrderStatus };
}
