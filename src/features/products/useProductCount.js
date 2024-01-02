import { useQuery } from "@tanstack/react-query";
import { getProductsCount } from "../../services/apiProducts";

export function useProductCount() {
  const { isLoading, data: count } = useQuery({
    queryFn: getProductsCount,
    queryKey: ["productCount"],
  });
  return { isLoading, count };
}
