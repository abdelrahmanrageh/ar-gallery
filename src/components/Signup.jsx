import { Link, useNavigate } from "react-router-dom";
import {  useEffect, useState } from "react";
import { setLoggedIn, setUser } from "../rtk/slices/userSlice";
import { useDispatch } from "react-redux";
import { squircle } from "ldrs";
squircle.register();

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // const [loggedIn, setLoggedIn] = useState(false);
  
  // useEffect(() => {
  //   authLogin();
  // }, []);

  // useEffect(() => {
  //   if (loggedIn) {
  //     navigate("/");
  //   }
  // }, [loggedIn, navigate]);
  
  // const authLogin = async () => {
  //   const res = await fetch("http://localhost:5000/users/auth", {
  //     method: "GET",
  //     credentials: "include",
  //     headers: {
  //       "Content-Type": "application/json",
  //     }
      
  //   });
  //   if (res.ok) {
  //     const user = await res.json();
  //     if (user.exp < Date.now() / 1000) {
  //       setLoggedIn(false);
  //     } else {
  //       setLoggedIn(true);
  //     }
  //   }
  // };
  

  const handleSubmit = async (e) => { 
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    if (!username || !email) {
      setError("Please fill all fields");
      return;
    }
    if (password !== confirmPassword) { 
      setError("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    try {
      const res = await fetch("https://ar-backend-0833.onrender.com/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, username }),
      });
      if (res.ok) {
        setSuccess("Account created successfully");
        // localStorage.setItem("emailForConfirmation", email);
        setError("");
        const user = await res.json();
        dispatch(setUser(user));
        dispatch(setLoggedIn(true));
        
        navigate("/confirm-email");
      }
      else if (res.status === 409) {
        setError("User already exists");
        setSuccess("");
      }
      
    }catch(err){
      setError(err.message);
      setSuccess("");
    }
    setLoading(false);
  }
  return (
    <section className="h-full">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen mt-10 lg:py-0">
        {/* <Link
          to="/"
          className="flex items-center l mb-4 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img className="w-12 h-12 mr-5" src={logo} alt="logo" />
          Welcome
        </Link> */}
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="username"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  id="confirm-password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              {error && (
                <p className="text-sm text-red-500 !mt-2 block dark:text-red-400">{error}</p>
              )}
              {success && (
                <p className="text-sm text-green-500 !mt-2 dark:text-green-400">
                  {success}
                </p>
              )}
              {/* <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required=""
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{" "}
                    <a
                      className="font-medium text-sky-600 hover:underline dark:text-sky-500"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div> */}
              <button
                type="button"
                disabled={loading}
                onClick={handleSubmit}
                className="w-full text-white bg-sky-500 hover:bg-sky-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800"
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
                    " Create an account"
                  )}
               
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-sky-600 hover:underline dark:text-sky-500"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
