import StatisticCard from "./StatisticCard";
import { LuDollarSign } from "react-icons/lu";
import { BsFillBoxFill } from "react-icons/bs";
import { CiShoppingTag } from "react-icons/ci";

function Statistics({ orders, count }) {
  const cartTotal = orders.reduce((total, order) => total + order.cartTotal, 0);

  return (
    <div>
      <h1 className="text-2xl md:text-3xl mt-6 font-semibold">Statistics</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
        <StatisticCard
          title="Total Orders"
          value={orders.length}
          color="#feeef1"
          icons={<BsFillBoxFill color="#6BB2E4" />}
        />
        <StatisticCard
          title="Total Sales"
          value={"$" + cartTotal}
          color="#fef2dc"
          icons={<LuDollarSign color="#6BB2E4" />}
        />
        <StatisticCard
          title="Total Products"
          value={count}
          color="#d9fae7"
          icons={<CiShoppingTag color="#6BB2E4" />}
        />
      </div>
    </div>
  );
}

export default Statistics;
