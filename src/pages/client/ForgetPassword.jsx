import { useState } from "react";
import { styles } from "../../styles";
import Button from "../../ui/Button";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/config";
import toast from "react-hot-toast";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  function onSubmit(e) {
    e.preventDefault();
    if (!email) return;
    if (!emailReg.test(email)) {
      setError("Please Enter A Valid Email Address");
      return;
    } else {
      setError(null);
      sendPasswordResetEmail(auth, email)
        .then(() => {
          toast.success("Check Your Email");
          setEmail("");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
        });
    }
  }
  return (
    <div className={`${styles.container} py-10 h-screen `}>
      <h1 className="text-3xl md:text-4xl font-semibold text-center mb-32">
        Forget Password
      </h1>
      <form
        onSubmit={onSubmit}
        className="flex items-center flex-col justify-center"
      >
        <div>
          <label htmlFor="email">Enter Your Email</label>
          <input
            name="email"
            type="text"
            value={email}
            className=" py-3 border ring-1 ring-inset w-[30rem] mb-5 mt-2 block ring-gray-300 focus:ring-2 pl-5 focus:ring-inset focus:ring-primary  outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <p className="text-red text-xs">{error}</p>}
          <Button buttonType="admin">Reset Password</Button>
        </div>
      </form>
    </div>
  );
}

export default ForgetPassword;
