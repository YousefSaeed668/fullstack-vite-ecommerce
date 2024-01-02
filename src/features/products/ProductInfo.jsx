import { HiOutlineShoppingBag } from "react-icons/hi2";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  increaseItemQuantity,
  selectCartItems,
} from "../cart/cartSlice";
import ChangeProductQuantity from "../../ui/ChangeProductQuantity";

function ProductInfo({ product }) {
  const cartItems = useSelector(selectCartItems);
  const isInCart = cartItems.find((item) => item.id === product.id);
  const dispatch = useDispatch();

  function checkProduct(product) {
    const item = cartItems.find((item) => item.id === product.id);
    if (item) {
      dispatch(increaseItemQuantity(item.id));
    } else {
      dispatch(addToCart(product));
    }
  }
  return (
    <div className="">
      <p className="text-xs font-bold text-primary">
        {product.product_category.toUpperCase()} CLOTHES COLLECTION
      </p>
      <h2 className="text-xl mt-3 text-pblack font-bold sm:text-2xl md:text-3xl">
        {product.name}
      </h2>
      <p className="text-lg my-5 text-pblack font-semibold sm:text-xl md:text-2xl">
        ${product.price}
      </p>
      <h4 className="text-lg mb-5 text-pblack font-bold sm:text-2xl md:text-3xl">
        Product Details
      </h4>
      <p className="text-sm text-grey-600 sm:text-base md:text-lg">
        {product.product_description}
      </p>
      {isInCart && (
        <div className="my-5 flex justify-center sm:block sm:ml-12">
          <ChangeProductQuantity item={isInCart} />
        </div>
      )}
      <Button
        buttonType="details"
        buttonStyle="mt-2 flex gap-2 m-auto sm:m-0 items-center"
        onClick={() => checkProduct(product)}
      >
        <HiOutlineShoppingBag /> ADD TO CART
      </Button>
    </div>
  );
}

export default ProductInfo;
