import DataTable from "../../ui/DataTable";
import ProductsForm from "../../features/products/ProductsForm";
import Button from "../../ui/Button";
import { FaPlus } from "react-icons/fa";

import Spinner from "../../ui/Spinner";
import { useProducts } from "../../features/products/useProducts";

function Products() {
  const { isLoading, products } = useProducts();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spinner color="text-primary" />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
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
        <DataTable products={products} />
      </div>
    );
  }
}

export default Products;
