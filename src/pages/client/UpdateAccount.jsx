import { styles } from "../../styles";
import Header from "../../ui/Header";
import Spinner from "../../ui/Spinner";
import UpdateUserDataForm from "../../ui/UpdateUserDataForm";
import UpdatePasswordForm from "../../ui/UpdatePasswordForm";
import { useUser } from "../../features/authentication/useUser";
import ShippingForm from "../../ui/ShippingForm";
import { useAddress } from "../../features/checkout/useAddress";

function UpdateAccount() {
  const { user, isLoading } = useUser();
  const userID = JSON.parse(localStorage.getItem("user")).uid;
  const { isLoading: isLoadingAddress, address } = useAddress(userID || "");
  if (isLoadingAddress || isLoading) return <Spinner />;
  return (
    <>
      <Header />
      <div className="bg-[#F9FAFB] min-h-screen">
        {isLoading ? (
          <Spinner />
        ) : (
          <div className={`${styles.container} py-10`}>
            <h1 className="text-2xl md:text-5xl font-bold text-pblack">
              Update Your Account
            </h1>
            <UpdateUserDataForm user={user} />
            <UpdatePasswordForm />
            <ShippingForm
              address={address}
              userID={userID || user.uid}
              type="update"
            />
          </div>
        )}
      </div>
    </>
  );
}

export default UpdateAccount;
