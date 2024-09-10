import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authLogin } from "../rtk/slices/userSlice";

function ConfirmEmail() {
  const moveFocus = (e) => {
    if (e.target.value.length === 1) {
      e.target.nextElementSibling.focus();
    }
    if (e.key === "Backspace") {
      e.target.previousElementSibling.focus();
    }
  };

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const verifyEmail = async (token) => {
    setError("");
    const email = user.email;
    const res = await fetch("https://ar-backend-0833.onrender.com/users/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, verificationToken: token }),
    });
    if (res.ok) {
      setError("");
      setSuccess("Account created successfully");
      window.localStorage.removeItem("emailForConfirmation");
      navigate("/login");
    } else {
      setError("Invalid or expired code");
      setSuccess("");
    }
  };

  useEffect(() => {
    dispatch(authLogin());
    if (user.isVerified || !user.email || !loggedIn) navigate("/");
    else setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-r-2 border-b-2 border-sky-600" />
      </div>
    );
  }

  const setTokenFromForm = (e) => {
    e.preventDefault();
    const token =
      e.target.first.value +
      e.target.second.value +
      e.target.third.value +
      e.target.fourth.value +
      e.target.fifth.value +
      e.target.sixth.value;

    verifyEmail(token);
  };

  return (
    <>
      {/* <section className="h-full">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen mt-10 lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl dark:text-white">
                Enter the code sent to your email
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="username"
                    className="block sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    confirmation code
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="username"
                    required=""
                  />
                </div>

                <button
                  type="button"
                  className="w-full text-white bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800"
                >
                  Create an account
                </button>
              </form>
            </div>
          </div>
        </div>
      </section> */}
      <div className=" min-h-screen flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-600 shadow p-4 sm:p-8 mx-4 max-w-lg">
          <svg
            className="w-6  h-6 mb-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M1.94631 9.31555C1.42377 9.14137 1.41965 8.86034 1.95706 8.6812L21.0433 2.31913C21.5717 2.14297 21.8748 2.43878 21.7268 2.95706L16.2736 22.0433C16.1226 22.5718 15.8179 22.5901 15.5946 22.0877L12.0002 14.0002L18.0002 6.00017L10.0002 12.0002L1.94631 9.31555Z"></path>
          </svg>
          <h1 className="font-bold text-2xl text-gray-800 dark:text-gray-100 mb-1">
            Check your email
          </h1>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            We{"'"}ve sent a code to {user.email}
          </p>
          <div className="mt-6">
            <form onSubmit={setTokenFromForm}>
              <div className="flex items-center justify-center md:gap-4">
                <input
                  type="text"
                  placeholder="1"
                  name="first"
                  onChange={moveFocus}
                  maxLength={1}
                  min="1"
                  minLength={1}
                  max="1"
                  required
                  className="md:w-12 w-10 h-16  border dark:bg-gray-800 dark:border-gray-600 rounded-lg md:p-4 text-center mx-auto hover:border-blue-200 focus:outline-none focus:ring focus:ring-blue-400 placeholder:font-medium font-bold md:text-xl text-blue-900 dark:text-blue-400 "
                />
                <input
                  type="text"
                  placeholder="2"
                  name="second"
                  maxLength={1}
                  onChange={moveFocus}
                  min="1"
                  minLength={1}
                  max="1"
                  required
                  className="md:w-12 w-10 h-16  border dark:bg-gray-800 dark:border-gray-600 rounded-lg md:p-4 text-center mx-auto hover:border-blue-200 focus:outline-none focus:ring focus:ring-blue-400 placeholder:font-medium font-bold md:text-xl text-blue-900 dark:text-blue-400 "
                />
                <input
                  type="text"
                  placeholder="3"
                  name="third"
                  onChange={moveFocus}
                  maxLength={1}
                  min="1"
                  minLength={1}
                  max="1"
                  required
                  className="md:w-12 w-10 h-16  border dark:bg-gray-800 dark:border-gray-600 rounded-lg md:p-4 text-center mx-auto hover:border-blue-200 focus:outline-none focus:ring focus:ring-blue-400 placeholder:font-medium font-bold md:text-xl text-blue-900 dark:text-blue-400 "
                />
                <input
                  type="text"
                  placeholder="4"
                  name="fourth"
                  onChange={moveFocus}
                  maxLength={1}
                  min="1"
                  minLength={1}
                  max="1"
                  required
                  className="md:w-12 w-10 h-16  border dark:bg-gray-800 dark:border-gray-600 rounded-lg md:p-4 text-center mx-auto hover:border-blue-200 focus:outline-none focus:ring focus:ring-blue-400 placeholder:font-medium font-bold md:text-xl text-blue-900 dark:text-blue-400 "
                />
                <input
                  type="text"
                  placeholder="5"
                  name="fifth"
                  onChange={moveFocus}
                  maxLength={1}
                  min="1"
                  minLength={1}
                  max="1"
                  required
                  className="md:w-12 w-10 h-16  border dark:bg-gray-800 dark:border-gray-600 rounded-lg md:p-4 text-center mx-auto hover:border-blue-200 focus:outline-none focus:ring focus:ring-blue-400 placeholder:font-medium font-bold md:text-xl text-blue-900 dark:text-blue-400 "
                />
                <input
                  type="text"
                  placeholder="6"
                  name="sixth"
                  onChange={(e) => {
                    // moveFocus(e);
                    if (e.target.value.length === 1) {
                      e.target.blur();
                    }
                    document.getElementById("verify").focus();
                  }}
                  maxLength={1}
                  min="1"
                  minLength={1}
                  max="1"
                  // required
                  className="md:w-12 w-10 h-16  border dark:bg-gray-800 dark:border-gray-600 rounded-lg md:p-4 text-center mx-auto hover:border-blue-200 focus:outline-none focus:ring focus:ring-blue-400 placeholder:font-medium font-bold md:text-xl text-blue-900 dark:text-blue-400 "
                />
              </div>
              {error && (
                <p className="dark:text-red-400 text-red-500 ml-1 text-xs mt-2">
                  {error}
                </p>
              )}
              {success && (
                <p className="text-green-500 text-xs mt-2">{success}</p>
              )}
              <div className="flex flex-col-reverse gap-2 md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2 justify-between mx-auto w-full mt-6 mb-4">
                <button
                  type="reset"
                  id="cancel"
                  className="w-full py-2.5 px-4 font-semibold border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-100 text-sm rounded-lg hover:text-gray-900 dark:hover:text-gray-50 hover:border-gray-400 dark:hover:border-gray-500"
                >
                  Cancel
                </button>
                <button
                  id="verify"
                  type="submit"
                  className="w-full py-2.5 bg-sky-500 px-4 font-semibold text-gray-50 text-sm rounded-lg hover:bg-sky-400 hover:text-white"
                >
                  Verify
                </button>
              </div>
            </form>
          </div>
          <small className="text-center block text-xs text-gray-600 dark:text-gray-400 font-medium">
            Didn{"'"}t get a code?{" "}
            <a
              href=""
              className="underline font-semibold text-gray-900 dark:text-gray-300 hover:text-sky-600"
            >
              Click to resend
            </a>
          </small>
        </div>
      </div>
    </>
  );
}

export default ConfirmEmail;
