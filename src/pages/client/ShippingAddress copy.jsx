import { useForm } from "react-hook-form";
import { styles } from "../../styles";
import CheckoutSummary from "../../features/checkout/CheckoutSummary";
import ShippingForm from "../../ui/ShippingForm";
import { useUser } from "../../features/authentication/useUser";
import { useAddress } from "../../features/checkout/useAddress";
import { useParams } from "react-router-dom";

function ShippingAddress() {
  const { userID } = useParams();
  const { isLoading, address } = useAddress(userID);
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className={`${styles.container} py-10 flex gap-4`}>
      <ShippingForm userID={userID} address={address} />
      <CheckoutSummary />
      <div></div>
    </div>
  );
}

export default ShippingAddress;
