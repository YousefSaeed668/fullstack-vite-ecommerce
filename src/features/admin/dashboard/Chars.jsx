import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function Chart({ orders }) {
  const colors = {
    totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
    extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
    text: "#374151",
    background: "#fff",
  };
  let data = [];
  if (orders) {
    data = orders.map((order) => {
      return {
        name: order.orderStatus,
        total: order.cartTotal,
        date: order.orderDate,
      };
    });
  }
  if (!orders) return null;

  return (
    <div className="mt-12">
      <ResponsiveContainer height={300} width={"100%"}>
        <AreaChart data={data}>
          <XAxis
            dataKey="date"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />

          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey="total"
            type="monotone"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="Total Sales"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;
