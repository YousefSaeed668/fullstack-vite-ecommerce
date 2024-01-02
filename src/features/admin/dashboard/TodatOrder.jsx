import { useNavigate } from "react-router-dom";
import Button from "../../../ui/Button";
import { useTodayOrders } from "../../orders/useTodayOrders";

function TodayOrders() {
  const { orders, isLoading } = useTodayOrders();
  const navigate = useNavigate();
  if (isLoading) return null;
  return (
    <div className="bg-white p-5 rounded-2xl mt-8">
      <h1 className="mb-6 text-2xl md:text-3xl font-semibold">Today Orders</h1>
      <div>
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex justify-between items-center mb-4"
          >
            <span
              className={`py-1.5 px-2 rounded-md text-white min-w-[9rem] text-center ${
                order.orderStatus === "Order Placed"
                  ? " bg-[#1175AE]"
                  : order.orderStatus === "Order Shipped"
                  ? "bg-[#CA820C]"
                  : "bg-[#487D0E]"
              }`}
            >
              {order.orderStatus}
            </span>
            <p className="font-semibold">{order.address.city}</p>
            <p className="font-semibold max-w-[4rem  ] min-w-[2rem]">
              ${order.cartTotal}
            </p>
            <Button
              buttonType="admin"
              onClick={() => navigate(`/admin/order-details/${order.id}`)}
            >
              Details
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodayOrders;
