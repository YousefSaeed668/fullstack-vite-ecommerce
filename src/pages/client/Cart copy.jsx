import { HiOutlineShoppingBag } from "react-icons/hi2";
import CartCheckout from "../../features/cart/CartCheckout";
import CartTable from "../../features/cart/CartTable";
import { styles } from "../../styles";
import { useUser } from "../../features/authentication/useUser";

function Cart() {
  const { user } = useUser();

  return (
    <>
      {!user && (
        <div
          id="cart_no_account"
          className=" bg-light-yellow text-center tracking-widest text-sm"
        >
          You Need to Signin to proceed to checkout
        </div>
      )}
      <div className={`${styles.container} py-10 `}>
        <h1 className="text-3xl justify-center font-semibold flex items-center space-x-8 mb-20">
          <HiOutlineShoppingBag size={40} /> Your Cart
        </h1>
        <div className="flex items-center gap-y-7 flex-wrap justify-center">
          <CartTable />
          <CartCheckout user={user} />
        </div>
      </div>
    </>
  );
}

export default Cart;
