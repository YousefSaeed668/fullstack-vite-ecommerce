import DataTable from "../../ui/DataTable";
import ProductsForm from "../../features/products/ProductsForm";
import Button from "../../ui/Button";
import { FaPlus } from "react-icons/fa";

import Spinner from "../../ui/Spinner";
import { useProducts } from "../../features/products/useProducts";
import Sort from "../../ui/Sort";
import useSort from "../../features/products/useSort";

function Products() {
  const { isLoading, products } = useProducts();
  const { sortedProducts } = useSort(products);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spinner color="text-primary" />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col py-10">
        <div className="flex justify-between items-center px-16 mb-12">
          <Sort />
          <ProductsForm>
            <Button
              buttonType="admin"
              buttonStyle={"sm:w-60 lg:w-80 flex items-center"}
            >
              <FaPlus className="rotate-180" />
              <span>Add New Product</span>
            </Button>
          </ProductsForm>
        </div>
        <DataTable products={sortedProducts} />
      </div>
    );
  }
}

export default Products;
