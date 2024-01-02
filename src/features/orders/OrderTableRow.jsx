import { useNavigate } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";

function OrderTableRow({ order, type }) {
  const navigate = useNavigate();
  return (
    <tr className="font-semibold">
      <td>{order.id}</td>
      <td>{order.orderDate}</td>
      <td>${order.cartTotal}</td>
      <td>
        <span
          className={`py-1.5 px-2 rounded-md text-white ${
            order.orderStatus === "Order Placed"
              ? " bg-[#1175AE]"
              : order.orderStatus === "Order Shipped"
              ? "bg-[#CA820C]"
              : "bg-[#487D0E]"
          }`}
        >
          {order.orderStatus}
        </span>
      </td>
      <td>
        {" "}
        <FaInfoCircle
          color="text-grey-600"
          className="cursor-pointer "
          onClick={() =>
            navigate(
              `${
                type !== "admin"
                  ? "/order-details/" + order.id
                  : "/admin/order-details/" + order.id
              }`
            )
          }
        />{" "}
      </td>
    </tr>
  );
}

export default OrderTableRow;
