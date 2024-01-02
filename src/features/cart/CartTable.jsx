import CartTableRow from "./CartTableRow";
function CartTable({ products, type, tableStyle }) {
  return (
    <div
      className={`overflow-auto ${tableStyle}  ${
        type === "orderDetails" ? "w-full" : " flex-grow-[2]"
      }`}
    >
      <table
        className={`${
          type === "orderDetails" || type === "adminOrderDetails"
            ? "w-full"
            : " "
        }`}
      >
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            {type !== "adminOrderDetails" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <CartTableRow key={item.id} type={type} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CartTable;
