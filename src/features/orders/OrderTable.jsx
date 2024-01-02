import OrderTableRow from "./OrderTableRow";

function OrderTable({ orders, type }) {
  return (
    <table className="w-full">
      <thead>
        <tr className="border-y border-primary">
          <td className="font-semibold">Order ID</td>
          <td className="font-semibold">Order Date</td>
          <td className="font-semibold">Order Total</td>
          <td className="font-semibold">Order Status</td>
        </tr>
      </thead>
      <tbody>
        {orders?.map((order) => (
          <OrderTableRow key={order.id} type={type} order={order} />
        ))}
      </tbody>
    </table>
  );
}

export default OrderTable;
