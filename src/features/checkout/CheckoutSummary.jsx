import {
  deleteItem,
  selectCartItems,
  selectCartTotal,
} from "../../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { IoIosRemoveCircleOutline } from "react-icons/io";

function CheckoutSummary() {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  function handleDelete(e, id) {
    e.stopPropagation();
    dispatch(deleteItem(id));
  }
  const dispatch = useDispatch();
  return (
    <div className="min-w-[20rem]">
      <h2 className="text-2xl mb-5">Order Summary</h2>
      <div>
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center mt-4 cursor-pointer justify-between"
            onClick={() => window.open(`/product-details/${item.id}`, "_blank")}
          >
            <div className="flex items-center">
              <div>
                <img
                  src={item.main_image}
                  alt={item.name}
                  className="w-[50px] mr-3"
                />
              </div>
              <div>
                <h4>{item.name}</h4>
                <div className="flex justify-between gap-4 flex-wrap">
                  <span>Qty: {item.quantity}</span>
                  <span>Price: ${item.price}</span>
                  <span>Total: ${item.price * item.quantity}</span>
                </div>
              </div>
            </div>
            <IoIosRemoveCircleOutline
              color="red"
              size={18}
              className="ml-5 cursor-pointer"
              onClick={(e) => handleDelete(e, item.id)}
            />
          </div>
        ))}
      </div>
      <div className="mt-5">
        <h3 className="text-2xl flex justify-between font-extrabold">
          Order Total: <span>${cartTotal}</span>
        </h3>
      </div>
    </div>
  );
}

export default CheckoutSummary;
