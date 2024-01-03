import { useState } from "react";
import { styles } from "../../styles";
import Filter from "../../ui/Filter";
import { useProducts } from "../../features/products/useProducts";
import Card from "../../ui/Card";
import Spinner from "../../ui/Spinner";
import { FaFilter } from "react-icons/fa";
import Sort from "../../ui/Sort";
import useSort from "../../features/products/useSort";
import Pagination from "../../ui/Pagination";
import { FaSearch } from "react-icons/fa";

function Shop() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading, products } = useProducts();
  const { sortedProducts } = useSort(products);
  const [searchTerm, setSearchTerm] = useState("");
  const searchedProducts = sortedProducts?.filter(
    (product) =>
      product?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product?.product_description
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
  );
  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(20);
  // Get Current Products
  const indexOfLastProduct = currentPage * productsPerPage;

  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = searchedProducts?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  if (isLoading) return <Spinner />;
  return (
    <div className="flex ">
      <Filter isOpen={isOpen} />
      <div className={`${styles.container} py-10`}>
        <>
          <div className="flex justify-between items-center flex-wrap gap-y-4">
            <button
              className="flex items-center gap-2 text-base font-semibold"
              onClick={() => setIsOpen(!isOpen)}
            >
              <FaFilter /> Filter
            </button>
            <div className="relative w-[20rem]">
              <input
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                className=" py-2 border ring-1 h-full ring-inset w-full ring-gray-300 focus:ring-2 pl-5 focus:ring-inset focus:ring-primary  outline-none"
              />
              <FaSearch className="absolute top-1/2 -translate-y-1/2 right-2" />
            </div>
            <Sort />
          </div>
          <div>
            {currentProducts?.length === 0 ? (
              <h1 className="text-2xl md:text-3xl font-semibold text-center mt-64">
                No Products Found 🥲
              </h1>
            ) : (
              <div className="flex flex-wrap gap-5 mt-10 justify-center">
                {currentProducts?.map((product) => (
                  <Card key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
          <Pagination
            productsPerPage={productsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalProducts={sortedProducts?.length}
          />
        </>
      </div>
    </div>
  );
}

export default Shop;
