import { useParams } from "react-router-dom";
import { useOrder } from "../../features/orders/useOrder";
import CartTable from "../../features/cart/CartTable";
import Spinner from "../../ui/Spinner";
import { styles } from "../../styles";

function OrderDetails() {
  const orderID = useParams().orderID;
  const { order, isLoading } = useOrder(orderID);

  if (isLoading) return <Spinner />;
  return (
    <div className={` py-10 bg-[#F9FAFB] min-h-screen`}>
      <div className={`${styles.container}`}>
        <h1 className="text-2xl md:text-4xl  font-semibold mb-6 flex text-pblack justify-center items-center gap-2">
          Order Details
        </h1>
        <CartTable
          type="orderDetails"
          products={order.cartItem}
          tableStyle="bg-white p-4 rounded-md"
        />
      </div>
    </div>
  );
}

export default OrderDetails;
