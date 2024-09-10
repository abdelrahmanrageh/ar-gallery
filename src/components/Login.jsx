import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/ar.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authLogin } from "../rtk/slices/userSlice";
import { squircle } from "ldrs";
squircle.register();

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const params = new URLSearchParams(window.location.search);
  const [loading, setLoading] = useState(false);

  if (loggedIn) {
    dispatch(authLogin()); // Call the async action
  }

  useEffect(() => {
    if (loggedIn) dispatch(authLogin()); // Call the async action
  }, [dispatch, loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      if (params.get("redirect")) {
        navigate("/");
        navigate(params.get("redirect"));
      } else navigate("/");
    }
  }, [loggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !password) {
      setError("Please fill all fields");
      setLoading(false);
      return;
    }
    const res = await fetch("https://ar-backend-0833.onrender.com/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      dispatch(authLogin()); // Call the async action
      setError("");
      // authLogin();
    } else if (res.status === 401 || res.status === 400 || res.status === 404) {
      setError("Email or password is incorrect");
      setSuccess("");
    } else {
      setError("An error occurred");
      setSuccess("");
    }
    setLoading(false);
  };

  // useEffect(() => {
  //   console.log(email, password);
  // }, [email, password]);

  return (
    <>
      <section className="bg-gray-50 dark:bg-transparent">
        <div className="flex flex-col items-center justify-center h-screen px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link
            to="/"
            className="flex items-center l mb-4 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img className="w-12 h-12 mr-5" src={logo} alt="logo" />
            Welcome
          </Link>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor=""
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                {/* <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-sky-600 hover:underline dark:text-sky-500"
                  >
                    Forgot password?
                  </a>
                </div> */}
                {error && (
                  <p className="text-sm text-red-500 !mt-2 block dark:text-red-400">
                    {error}
                  </p>
                )}
                {success && (
                  <p className="text-sm text-green-500 !mt-2 dark:text-green-400">
                    {success}
                  </p>
                )}
                <button
                  type="button"
                  disabled={loading}
                  onClick={handleSubmit}
                  className={`${
                    loading && "opacity-50 pointer-events-none"
                  } w-full text-white bg-sky-500 hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800`}
                >
                 
                  {loading ? (
                    <l-squircle
                      size="25"
                      stroke="3"
                      stroke-length="0.15"
                      bg-opacity="0.1"
                      speed="0.9"
                      color="white"
                    ></l-squircle>
                  ) : (
                    "Sign in"
                  )}
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <Link
                    to="/signup"
                    className="font-medium text-sky-600 hover:underline dark:text-sky-500"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
