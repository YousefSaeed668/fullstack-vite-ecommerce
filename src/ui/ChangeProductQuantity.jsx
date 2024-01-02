import { useDispatch } from "react-redux";
import {
  decreaseItemQuantity,
  increaseItemQuantity,
} from "../features/cart/cartSlice";

function ChangeProductQuantity({ item }) {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center space-x-2">
      <button
        className="bg-light-yellow text-pblack px-2"
        onClick={() => dispatch(decreaseItemQuantity(item.id))}
      >
        -
      </button>
      <span className="font-bold text-2xl text-pblack">{item.quantity}</span>
      <button
        className="bg-light-yellow text-pblack px-2"
        onClick={() => dispatch(increaseItemQuantity(item.id))}
      >
        +
      </button>
    </div>
  );
}

export default ChangeProductQuantity;
