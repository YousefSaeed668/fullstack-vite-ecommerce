import { useState } from "react";
import { useUpdateUser } from "../features/authentication/useUpdateUser";

function UpdateUserData({ user }) {
  const [email] = useState(user?.email);
  const [name, setName] = useState(user?.displayName);
  const [file, setFile] = useState(null);
  const { updateUserProfile } = useUpdateUser();

  function handleUpdateData(e) {
    e.preventDefault();
    updateUserProfile({ name, file });
  }

  return (
    <div className="bg-white p-8 rounded-md mt-12">
      <h2 className="text-xl font-semibold mb-5">Update User Data</h2>
      <div>
        <form onSubmit={handleUpdateData}>
          <div className="py-4   md:flex gap-16 items-center">
            <label
              className="block min-w-[10rem] mb-3 md:mb-0 font-medium"
              htmlFor="email"
            >
              Email address
            </label>

            <input
              value={email}
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="border-2 border-gray-300 bg-slate-200 p-2 rounded-md w-full cursor-not-allowed  max-w-[24rem]"
              disabled
            />
          </div>
          <div className="border-y py-4  md:flex gap-16 items-center">
            <label
              className=" min-w-[10rem] block mb-3 md:mb-0 font-medium"
              htmlFor="name"
            >
              Full Name
            </label>

            <input
              className="border-2 border-gray-300 p-2 rounded-md w-full max-w-[24rem]"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              name="name"
              type="text"
              autoComplete="name"
            />
          </div>
          <div className="border-b py-4  md:flex gap-16 items-center">
            <label
              className="block mb-3 md:mb-0 min-w-[10rem] font-medium"
              htmlFor="main_image"
            >
              Avatar Image
            </label>

            <div className="flex items-center">
              <input
                type="file"
                className="hidden"
                id="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <label
                htmlFor="file"
                className=" bg-primary text-center  text-white px-4 py-2 w-full rounded"
              >
                Choose Main Image
              </label>
              <span className="ml-2"></span>
            </div>
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

export default UpdateUserData;
