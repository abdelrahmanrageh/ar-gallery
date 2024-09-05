import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/ar.png";
import { useEffect, useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    authLogin();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

  const authLogin = async () => {
    const res = await fetch("https://ar-backend-0833.onrender.com/users/auth", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      }
      
    });
    if (res.ok) {
      const user = await res.json();
      if (user.exp < Date.now() / 1000) {
        setLoggedIn(false);
      } else {
        setLoggedIn(true);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("https://ar-backend-0833.onrender.com/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      setSuccess("Logged in successfully");
      setError("");
      authLogin();
    } else if (res.status === 401) {
      setError("Invalid credentials");
      setSuccess("");
    } else {
      setError("An error occurred");
      setSuccess("");
    }
  };

  // useEffect(() => {
  //   console.log(email, password);
  // }, [email, password]);

  const fetchUserData = async () => {
    fetch("https://ar-backend-0833.onrender.com/users/user/66d6133c5d71b839b95467e3", {
      method: "GET",
      credentials: "include",
    }).then((res) => {
      console.log(res.json());
    });
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 ">
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
                <div className="flex items-center justify-between">
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
                </div>
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
                  onClick={handleSubmit}
                  className="w-full text-white bg-sky-500 hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800"
                >
                  Sign in
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
      <button onClick={fetchUserData}>try</button>
    </>
  );
}

export default Login;
