import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Table } from "react-daisyui";
import { FaTrashAlt, FaEdit, FaInfoCircle } from "react-icons/fa";
import { deleteProduct } from "../services/apiProducts";
import Notiflix from "notiflix";
import ProductsForm from "../features/products/ProductsForm";

function DataTableRow({ index, product }) {
  const queryClient = useQueryClient();
  const { mutate: deleteProductApi } = useMutation({
    mutationFn: ({ id, imagesUrl }) => deleteProduct({ id, imagesUrl }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  function confirmDelete({ name, id, imagesUrl }) {
    Notiflix.Confirm.show(
      `Confirm Delete Product ?`,
      `Do You Really Want To Delete ${name.slice(0, 15) + "..."} ?`,
      "Yes",
      "No",
      function okCb() {
        deleteProductApi({ id, imagesUrl });
      },
      function cancelCb() {},
      {
        width: "420px",

        borderRadius: "8px",
        cssAnimation: "zoom",
        titleColor: "#0d6efd",
        messageColor: "#4b5563",
        okButtonBackground: "red",
      }
    );
  }

  return (
    <Table.Row>
      <div>{index + 1}</div>

      <div>
        <img
          src={product.main_image}
          className="w-14 h-14 m-auto object-cover"
          alt={product.name + "_image"}
        />
      </div>
      <div>
        <div className="text-sm">{product.name}</div>
      </div>
      <div>{product.product_category}</div>
      <div>
        <span
          className={`${
            product.Is_New.toString() === "true"
              ? "bg-[#97CAF7] "
              : "bg-[#F79797]"
          } w-10 text-center py-1 rounded-full block font-semibold text-white`}
        >
          {product.Is_New.toString() === "true" ? "Yes" : "No"}
        </span>
      </div>
      <div>${product.price}</div>
      <div className="flex items-center justify-between gap-2 text-lg">
        <FaInfoCircle
          className="cursor-pointer"
          onClick={() =>
            window.open(`/product-details/${product.id}`, "_blank")
          }
        />
        <ProductsForm type="edit" product={product}>
          <FaEdit className="text-primary cursor-pointer" />
        </ProductsForm>
        <FaTrashAlt
          color="red"
          className="cursor-pointer"
          onClick={() =>
            confirmDelete({
              id: product.id,
              name: product.name,
              imagesUrl: [product.main_image, ...product.images_gallery],
            })
          }
        />
      </div>
    </Table.Row>
  );
}

export default DataTableRow;
