import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/apiProducts";
import { useSearchParams } from "react-router-dom";
export function useProducts(category, type) {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const {
    isLoading,
    data: products,
    error,
  } = useQuery({
    queryKey: [
      "products",
      category || "all",
      categoryFilter,
      minPrice,
      maxPrice,
    ],
    queryFn: () =>
      getProducts({ category, type, categoryFilter, minPrice, maxPrice }),
  });

  return {
    isLoading,
    products,
    error,
  };
}
