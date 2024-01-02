import { useState } from "react";
import { useUpdateUser } from "../features/authentication/useUpdateUser";

function UpdateUserDataForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { updateUserProfile } = useUpdateUser();
  function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password do not match");
      return;
    }
    updateUserProfile(password);
  }
  return (
    <div className="bg-white p-8 rounded-md mt-12">
      <h2 className="text-xl font-semibold mb-5">Update Password</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="py-4   md:flex gap-16 items-center">
            <label
              className="block min-w-[16rem] mb-3 md:mb-0 font-medium"
              htmlFor="email"
            >
              New Password (min 8 characters)
            </label>

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              name="password"
              type="password"
              autoComplete="password"
              className="border-2 border-gray-300 p-2 rounded-md w-full max-w-[24rem]"
              required
            />
          </div>
          <div className="border-y py-4  md:flex gap-16 items-center">
            <label
              className=" min-w-[16rem] block mb-3 md:mb-0 font-medium"
              htmlFor="confirmpassword"
            >
              Confirm Password
            </label>

            <input
              className="border-2 border-gray-300 p-2 rounded-md w-full max-w-[24rem]"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              id="confirmpassword"
              name="confirmpassword"
              type="password"
              autoComplete="confirmpassword"
              required
            />
          </div>

          <div className=" flex gap-4 justify-end items-center mt-5">
            <button
              type="submit"
              className="bg-primary text-white py-2 px-4 font-semibold rounded-md"
            >
              Update
            </button>
            <button
              type="reset"
              className=" bg-gray-300 py-2 px-4 font-semibold rounded-md "
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateUserDataForm;
