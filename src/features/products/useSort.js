import { useSearchParams } from "react-router-dom";

function useSort(products) {
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get("sort");

  let sortedProducts = [];
  if (sortBy === "latest" || !sortBy) sortedProducts = products;

  if (sortBy === "highest")
    sortedProducts = products?.slice()?.sort((a, b) => b.price - a.price);
  if (sortBy === "lowest")
    sortedProducts = products?.slice()?.sort((a, b) => a.price - b.price);
  if (sortBy === "a-z")
    sortedProducts = products
      ?.slice()
      ?.sort((a, b) => a.name.localeCompare(b.name));
  if (sortBy === "z-a")
    sortedProducts = products
      ?.slice()
      ?.sort((a, b) => b.name.localeCompare(a.name));

  return {
    sortedProducts,
  };
}

export default useSort;
