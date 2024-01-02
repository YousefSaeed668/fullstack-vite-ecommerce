import { useParams } from "react-router-dom";
import CartTable from "../../features/cart/CartTable";
import Spinner from "../../ui/Spinner";
import { useOrder } from "../../features/orders/useOrder";
import { styles } from "../../styles";
import { useState } from "react";
import Button from "../../ui/Button";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useUpdateOrder } from "../../features/orders/useUpdateOrder";

function AdminOrderDetails() {
  const orderID = useParams().orderID;
  const { order, isLoading } = useOrder(orderID);
  const [orderStatus, setOrderStatus] = useState("");
  const [isOrderStatusChanged, setIsOrderStatusChanged] = useState(false);
  const { updateOrderStatus } = useUpdateOrder(orderID);
  function handleOrderStatusChange(e) {
    setOrderStatus(e.target.value);
    setIsOrderStatusChanged(true);
  }
  function handleUpdateStatus() {
    setIsOrderStatusChanged(false);
    updateOrderStatus({ orderID, orderStatus });
  }
  if (isLoading) return <Spinner />;
  return (
    <div className={`${styles.container} py-10`}>
      <div className="flex justify-between mb-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold">Customer Data</h2>
          <p className="text-base mt-4 font-semibold">
            Full Name : {order.address.firstName} {order.address.lastName}
          </p>
          <p className="text-base mt-4 font-semibold">
            Email : {order.address.email}
          </p>
          <p className="text-base mt-4 font-semibold">
            City : {order.address.city}
          </p>
          <p className="text-base mt-4 font-semibold">
            Address Line 1 : {order.address.addressLine1}
          </p>
          {order.address.addressLine2 && (
            <p className="text-base mt-4 font-semibold">
              Address Line 1 : {order.address.addressLine2}
            </p>
          )}
          <p className="text-base mt-4 font-semibold">
            Phone Number : {order.address.mobilePhone}
          </p>
          <p className="text-base mt-4 font-semibold">
            Zip Code : {order.address.zipCode}
          </p>
        </div>
        <div className="mb-10">
          <h3 className="text-3xl md:text-4xl my-8 font-semibold">
            Order Details
          </h3>
          <p className="text-base mt-4 font-semibold">
            Order Date : {order.orderDate}
          </p>
          <p className="text-base mt-4 font-semibold">
            Order Status :{" "}
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
          </p>

          <p className="text-base mt-4 font-semibold">
            Total : ${order.cartTotal}
          </p>
        </div>
      </div>
      <div className="flex flex-row-reverse justify-between items-center mb-10">
        <FormControl sx={{ m: 1, minWidth: 120 }} className="flex-1 max-w-sm">
          <InputLabel
            id="demo-simple-select-standard-label"
            htmlFor="order_status"
          >
            Order Status
          </InputLabel>
          <Select
            disabled={isLoading}
            labelId="demo-simple-select-standard-label"
            id="order_status"
            label="Order Status"
            value={orderStatus || order?.orderStatus}
            defaultValue={order?.orderStatus}
            onChange={handleOrderStatusChange}
          >
            <MenuItem value="Order Placed">Order Placed</MenuItem>
            <MenuItem value="Order Shipped">Order Shipped</MenuItem>
            <MenuItem value="Order Delivered">Order Delivered</MenuItem>
          </Select>
        </FormControl>

        {isOrderStatusChanged && (
          <Button buttonType="admin" onClick={handleUpdateStatus}>
            Update Order Status
          </Button>
        )}
      </div>
      <h2 className="text-3xl md:text-4xl font-semibold mb-5">Order Content</h2>
      <CartTable
        type="adminOrderDetails"
        products={order.cartItem}
        tableStyle="bg-white p-4 rounded-md"
      />
    </div>
  );
}

export default AdminOrderDetails;
