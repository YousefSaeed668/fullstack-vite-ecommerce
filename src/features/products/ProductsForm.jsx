import { cloneElement, useState } from "react";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createProduct, updateProduct } from "../../services/apiProducts";
import toast from "react-hot-toast";

import Spinner from "../../ui/Spinner";

function ProductsForm({ children, type, product }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: product?.name,
      price: product?.price,
      product_description: product?.product_description,
    },
  });

  const queryClient = useQueryClient();

  const { mutate: createNewProduct } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      toast.success("New Product Successfully Created");
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      reset();
      setIsLoading(false);
    },
  });
  const { mutate: updateExistingProduct } = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      reset();
      setIsLoading(false);
    },
  });

  function onSubmit(data) {
    setIsLoading(true);

    if (type === "edit") {
      const newData = {
        ...data,
        main_image:
          data.main_image && data.main_image.length > 0
            ? data.main_image[0]
            : product.main_image,
        images_gallery:
          data.images_gallery.length > 0
            ? [...data.images_gallery]
            : [...product.images_gallery],
        old_main_image: product.main_image,
        old_images_gallery: product.images_gallery,
        id: product.id,
      };
      updateExistingProduct(newData);
      return;
    }
    createNewProduct({
      ...data,
      main_image: data.main_image[0],
      images_gallery: [...data.images_gallery],
    });
  }
  function onError(error) {
    console.log(error);
  }

  return (
    <>
      {cloneElement(children, {
        onClick: () => {
          setIsOpen(true);
        },
      })}
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-[300px] sm:w-[500px] p-6 rounded-lg ">
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="flex flex-col gap-4"
          >
            <TextField
              disabled={isLoading}
              id="product_name"
              label="Product Name"
              variant="outlined"
              {...register("name", {
                required: "This Field Is Required",
              })}
            />
            <label htmlFor="main_image">Product Main Image</label>

            <div className="flex items-center">
              <input
                type="file"
                className="hidden"
                id="file"
                accept="image/*"
                {...register("main_image", {
                  required: type === "edit" ? false : "This Field Is Required",
                })}
              />
              <label
                htmlFor="file"
                className={`${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }cursor-pointer bg-blue-500 text-center text-white px-4 py-2 w-full rounded`}
              >
                Choose Main Image
              </label>
              <span className="ml-2"></span>
            </div>
            <label htmlFor="images_gallery">Product Images Gallery</label>

            <div className="flex items-center">
              <input
                type="file"
                id="multiple_file"
                className="hidden"
                multiple
                accept="image/*"
                {...register("images_gallery", {
                  required: type === "edit" ? false : "This Field Is Required",
                })}
              />
              <label
                htmlFor="multiple_file"
                className={`${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }cursor-pointer bg-blue-500 text-center text-white px-4 py-2 w-full rounded`}
              >
                Choose Multiple Image
              </label>
              <span className="ml-2"></span>
            </div>

            <TextField
              type="number"
              inputProps={{ step: "any" }}
              id="product_pice"
              label="Product Price"
              variant="outlined"
              {...register("price", {
                required: "This Field Is Required",
              })}
            />
            <FormControl sx={{ m: 1, minWidth: 120 }} className="!m-0">
              <InputLabel
                id="demo-simple-select-standard-label"
                htmlFor="product_category"
              >
                Product Category
              </InputLabel>
              <Select
                disabled={isLoading}
                labelId="demo-simple-select-standard-label"
                id="product_category"
                label="Product Category"
                defaultValue={type === "edit" && product?.product_category}
                {...register("product_category", {
                  required: "Product Categroy Is Required",
                })}
              >
                <MenuItem value="smartphones">Smartphones</MenuItem>
                <MenuItem value="computers">Computers</MenuItem>
                <MenuItem value="men">Men Clothes</MenuItem>
                <MenuItem value="women">Women Clothes</MenuItem>
                <MenuItem value="kids">Kids Clothes</MenuItem>
              </Select>
            </FormControl>
            <div className="flex  justify-between gap-2">
              <FormControl sx={{ m: 1, minWidth: 120 }} className="!m-0">
                <InputLabel id="demo-simple-select-standard-label">
                  Is It New ?
                </InputLabel>
                <Select
                  disabled={isLoading}
                  labelId="demo-simple-select-standard-label"
                  defaultValue={type === "edit" && product?.Is_New}
                  id="demo-simple-select-standard"
                  label="Is It New ?"
                  {...register("Is_New", {
                    required: "Is New Is Required",
                  })}
                >
                  <MenuItem value={"true"}>Yes</MenuItem>
                  <MenuItem value={"false"}>No</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 120 }} className="!m-0">
                <InputLabel id="demo-simple-select-standard-label">
                  Best Seller ?
                </InputLabel>
                <Select
                  disabled={isLoading}
                  labelId="demo-simple-select-standard-label"
                  defaultValue={type === "edit" && product?.best_seller}
                  id="demo-simple-select-standard"
                  label="Best Seller ?"
                  {...register("best_seller", {
                    required: "Is New Is Required",
                  })}
                >
                  <MenuItem value={"true"}>Yes</MenuItem>
                  <MenuItem value={"false"}>No</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 120 }} className="!m-0">
                <InputLabel id="demo-simple-select-standard-label">
                  Most Wanted ?
                </InputLabel>
                <Select
                  disabled={isLoading}
                  labelId="demo-simple-select-standard-label"
                  defaultValue={type === "edit" && product?.most_wanted}
                  id="demo-simple-select-standard"
                  label="Most Wanted ?"
                  {...register("most_wanted", {
                    required: "Is New Is Required",
                  })}
                >
                  <MenuItem value={"true"}>Yes</MenuItem>
                  <MenuItem value={"false"}>No</MenuItem>
                </Select>
              </FormControl>
            </div>
            <textarea
              disabled={isLoading}
              className=" resize-none h-28 p-4 outline-none border rounded-md border-[##cccccc]"
              type="text"
              placeholder="Product Description"
              id="product_description"
              {...register("product_description", {
                required: "This Field Is Required",
              })}
            ></textarea>

            <Button type="submit" buttonType="admin" disabled={isLoading}>
              {isLoading ? (
                <Spinner size="mini" color="text-white" />
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default ProductsForm;
