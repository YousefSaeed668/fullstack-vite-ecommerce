import { FaInfoCircle, FaTrashAlt } from "react-icons/fa";
import ChangeProductQuantity from "../../ui/ChangeProductQuantity";
import { useDispatch } from "react-redux";
import { deleteItem } from "./cartSlice";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";

function CartTableRow({ item, type }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <tr>
      <td>
        <img src={item.main_image} className="w-[6rem]" alt={item.name} />
      </td>
      <td>{item.name}</td>
      <td className="font-semibold">${item.price}</td>
      {type === "cart" && (
        <td>
          <ChangeProductQuantity item={item} />
        </td>
      )}

      {(type === "orderDetails" || type === "adminOrderDetails") && (
        <td className="text-center">{item.quantity}</td>
      )}
      <td className="font-semibold">${item.price * item.quantity} </td>
      {type === "cart" && (
        <td>
          <div className="flex space-x-3 items-center">
            <FaTrashAlt
              color="red"
              className="cursor-pointer"
              onClick={() => dispatch(deleteItem(item.id))}
            />
            <FaInfoCircle
              color="grey-600"
              className="cursor-pointer"
              onClick={() =>
                window.open(`/product-details/${item.id}`, "_blank")
              }
            />
          </div>
        </td>
      )}
      {type === "orderDetails" && (
        <td>
          <Button
            buttonType="admin"
            onClick={() => navigate(`/product-details/${item.id}`)}
          >
            Review Product
          </Button>
        </td>
      )}
    </tr>
  );
}

export default CartTableRow;
