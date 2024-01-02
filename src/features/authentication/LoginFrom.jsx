import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../ui/Header";
import { useSignInForm, useSignInWithGoogle } from "./useSignInForm";
import { useState } from "react";

function LoginFrom() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useSignInForm();
  const { signInWithGoogle } = useSignInWithGoogle();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  function handleSubmit(e) {
    e.preventDefault();

    if (!emailReg.test(email)) {
      setError((error) => {
        return {
          email: "Please Enter A Valid Email Address",
          password: error?.password,
        };
      });
      return;
    }
    if (password.length < 8) {
      setError((error) => {
        return {
          email: error?.email,
          password: "Password Must Be At Least 8 Characters",
        };
      });
      return;
    }
    setError(null);
    signIn({ email, password });
  }

  if (user)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-center text-4xl font-bold mb-12 text-pblack">
          Your Already Signed In{" "}
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-10 bg-primary text-white flex justify-center gap-3 font-semibold items-center py-3"
        >
          Go To Home
        </button>
      </div>
    );
  return (
    <div>
      <Header />
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 pl-5 focus:ring-inset focus:ring-primary  outline-none sm:text-sm sm:leading-6"
                />
                {error?.email && (
                  <p className="text-red text-xs">
                    Please Enter A Valid Email Address
                  </p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    to="/forget-password"
                    className="font-semibold text-primary "
                  >
                    Forgot password ?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 pl-5 focus:ring-2 focus:ring-inset focus:ring-primary outline-none  sm:text-sm sm:leading-6"
                />
                {error?.password && (
                  <p className="text-red text-xs">{error?.password}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-pblack px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  "
              >
                Sign in
              </button>
              <p className="text-center text-3xl font-bold text-orange my-9">
                OR
              </p>
              <button
                type="button"
                className="w-full bg-primary text-white flex justify-center gap-3 font-semibold items-center py-3"
                onClick={signInWithGoogle}
              >
                {" "}
                <FaGoogle color="#fff" size={24} />
                Login With Google
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?
            <Link
              to="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              {" "}
              Sign up now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginFrom;
