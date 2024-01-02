import Chart from "../../features/admin/dashboard/Chars";
import Statistics from "../../features/admin/dashboard/Statistics";
import TodayOrders from "../../features/admin/dashboard/TodatOrder";
import { useOrders } from "../../features/orders/useOrders";
import { useProductCount } from "../../features/products/useProductCount";
import { styles } from "../../styles";
import Spinner from "../../ui/Spinner";

function Dashboard() {
  const { isLoading, orders } = useOrders();
  const { isLoading: isLoadingProducts, count } = useProductCount();
  if (isLoading || isLoadingProducts) return <Spinner />;
  return (
    <div className={`${styles.container} py-10`}>
      <h1 className="text-3xl font-bold md:text-4xl">Dashboard</h1>
      <Statistics orders={orders} count={count} />
      <div className=" ">
        <Chart orders={orders} />
        <TodayOrders />
      </div>
    </div>
  );
}
export default Dashboard;
