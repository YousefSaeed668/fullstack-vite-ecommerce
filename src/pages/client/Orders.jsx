import { useOrders } from "../../features/orders/useOrders";
import { styles } from "../../styles";
import OrderTable from "../../features/orders/OrderTable";
import Spinner from "../../ui/Spinner";
import { BsFillBoxFill } from "react-icons/bs";
import Empty from "../../ui/Empty";

function Orders() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { isLoading, orders } = useOrders(user.uid);
  if (isLoading) return <Spinner />;
  if (!orders?.length) return <Empty type="Orders" />;
  return (
    <div className={`${styles.container} py-10 min-h-screen`}>
      <h1 className="text-2xl md:text-4xl  font-semibold mb-4 flex text-pblack justify-center items-center gap-2">
        <BsFillBoxFill /> Your Orders
      </h1>
      <h3 className="text-xl md:text-2xl font-semibold mb-7">
        You Have Orderd : {orders.length}
      </h3>

      <OrderTable orders={orders} />
    </div>
  );
}

export default Orders;
