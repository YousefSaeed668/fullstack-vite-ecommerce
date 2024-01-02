import { useOrders } from "../../features/orders/useOrders";
import { styles } from "../../styles";
import OrderTable from "../../features/orders/OrderTable";
import Spinner from "../../ui/Spinner";

function Orders() {
  const { isLoading, orders } = useOrders();
  if (isLoading) return <Spinner />;
  return (
    <div className={`${styles.container} py-10`}>
      <OrderTable orders={orders} type="admin" />
    </div>
  );
}

export default Orders;
