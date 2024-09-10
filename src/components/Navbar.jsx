import { Disclosure, Menu, Transition } from "@headlessui/react";
// import { Bars3Icon } from "@heroicons/react/24/outline";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../rtk/slices/shoppingCartSlice";
import logo from "../assets/logo.png";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { setSearchValue } from "../rtk/slices/productsSlice";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import { clearUser, setLoggedIn } from "../rtk/slices/userSlice";
import { IoMdPerson } from "react-icons/io";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.shoppingCart.cart);
  let cartLength = Object.keys(cart).length;
  const searchInputRef = useRef(null);
  const [darkMode, setDarkMode] = useState(
    window.localStorage.darkMode === "true" ? true : false
  );
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const user = useSelector((state) => state.user.user);
  // useEffect(() => {
  //   authLogin();
  // }, []);

  // useEffect(() => {
  //   if (loggedIn) {
  //     navigate("/");
  //   }
  // }, [loggedIn, navigate]);

  // const authLogin = async () => {
  //   const res = await fetch("https://ar-backend-0833.onrender.com/users/auth", {
  //     method: "GET",
  //     credentials: "include",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
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

  const logout = async () => {
    await fetch("https://ar-backend-0833.onrender.com/users/logout", {
      method: "POST",
      credentials: "include",
      // headers: {
      //   "Content-Type": "application/json",
      // },
    }).then((res) => {
      if (res.ok) {
        dispatch(setLoggedIn(false));
        dispatch(clearUser());
        localStorage.removeItem("user");
        navigate("/");
      }
    });
  };

  const linkLocation = useLocation();
  const navigation = [
    { name: "Home", href: "/", current: linkLocation.pathname === "/" },
    {
      name: "Products",
      href: "/products",
      current: linkLocation.pathname === "/products",
    },
  ];

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      window.localStorage.darkMode = "true";
    } else {
      document.body.classList.remove("dark");
      window.localStorage.darkMode = "false";
    }
  }, [darkMode]);
  return (
    <>
      <Disclosure
        as="nav"
        className=" fixed w-full top-0 z-40 bg-slate-950 transition"
      >
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
              <div className="relative flex h-20 items-center justify-between ">
                {/* Mobile menu button*/}
                <div className="flex flex-1 items-center ">
                  <div className="flex items-center sm:hidden">
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-lg mr-2 p-2 text-gray-400 hover:bg-gray-700 hover:text-white  ">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                          />
                        </svg>
                      )}
                    </Disclosure.Button>
                  </div>

                  <div
                    className="flex flex-shrink-0 items-center"
                    onClick={() => {
                      dispatch(setSearchValue(""));
                      searchInputRef.current.value = "";
                      window.scrollTo(0, 0);
                    }}
                  >
                    <Link to="/">
                      <img
                        className="h-10 w-auto"
                        src={logo}
                        alt="Ar Gallery"
                      />
                    </Link>
                  </div>
                  {/* menu */}
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                          onClick={() => {
                            dispatch(setSearchValue(""));
                            searchInputRef.current.value = "";
                            window.scrollTo(0, 0);
                          }}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* search bar */}
                <div>
                  <div className="relative  rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-gray-500 sm:text-sm">
                        <IoSearch />
                      </span>
                    </div>
                    <form
                      action=""
                      onSubmit={(e) => {
                        e.preventDefault();
                        dispatch(setSearchValue(searchInputRef.current.value));
                        navigate("/products");
                        searchInputRef.current.blur();
                        setTimeout(() => window.scrollTo(0, 0), 100);
                      }}
                    >
                      <input
                        type="text"
                        name="price"
                        id="price"
                        className="block max-w-24  bg-gray-800 ring-gray-600 sm:max-w-full lg:mr-0 rounded-md border-0 py-1.5 pl-7 pr-2 text-gray-300 ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                        placeholder="Search"
                        autoComplete="off"
                        spellCheck="false"
                        ref={searchInputRef}
                      />
                    </form>
                  </div>
                </div>

                {/* dark mode */}
                {darkMode && (
                  <MdLightMode
                    onClick={() => setDarkMode(!darkMode)}
                    className="w-9 h-9 mx-1 p-1.5 text-gray-400 hover:text-gray-100 cursor-pointer transition hover:bg-gray-700 rounded-lg"
                  />
                )}

                {!darkMode && (
                  <MdDarkMode
                    onClick={() => setDarkMode(!darkMode)}
                    className=" w-9 h-9 mx-1 p-1.5 text-gray-400 hover:text-gray-100 cursor-pointer transition hover:bg-gray-700 rounded-lg"
                  />
                )}

                <div className="inset-y-0 flex justify-start   pr-2 sm:static sm:inset-auto ml-0 sm:pr-0 ">
                  {/* Cart */}
                  <button
                    type="button"
                    onClick={() => dispatch(toggleCart())}
                    className="flex relative mt-[2px]  "
                  >
                    {/* <FaCartShopping /> */}
                    <FaCartShopping
                      className="h-6 w-6 flex-shrink-0 text-gray-400  hover:text-gray-200 transition"
                      aria-hidden="true"
                    />
                    <Transition
                      show={cartLength > 0}
                      enter="transition-all duration-500"
                      enterFrom="opacity-0 px-0"
                      enterTo="opacity-100 px-1"
                      leave="transition-all duration-500"
                    >
                      <p className="text-gray-400 px-1">{cartLength}</p>
                    </Transition>
                  </button>

                  {/* Profile dropdown */}
                  <div>
                    <Menu
                      as="div"
                      className="relative ml-3 hover:text-gray-100"
                    >
                      <div>
                        <Menu.Button className="relative flex rounded-full  bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <IoMdPerson className="text-gray-400 hover:text-gray-100 border border-gray-400 p-1 h-7 w-7 rounded-full" />
                        </Menu.Button>
                      </div>
                      <Transition
                        // as {fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg- dark:bg-gray-800 bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {loggedIn ? (
                            <>
                              <Menu.Item>
                                <div className="px-4 py-3 border-b" role="none">
                                  <p
                                    className="text-sm text-gray-900 dark:text-white"
                                    role="none"
                                  >
                                    {user
                                      ? "Welcome, " + user.username
                                      : "Guest"}
                                  </p>
                                  <p
                                    className="text-xs font-medium text-gray-500 truncate dark:text-gray-400"
                                    role="none"
                                  >
                                    {user && user.email}
                                  </p>
                                </div>
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={() => {
                                      logout();
                                      // dispatch(setLoggedIn(false));
                                    }}
                                    type="button"
                                    className={classNames(
                                      active
                                        ? "bg-gray-100 dark:bg-gray-700"
                                        : "",
                                      "block w-full text-start px-4 py-2 text-sm text-gray-700 dark:text-gray-200"
                                    )}
                                  >
                                    Sign out
                                  </button>
                                )}
                              </Menu.Item>
                            </>
                          ) : (
                            <>
                              <Menu.Item>
                                {({ active }) => (
                                  <Link
                                    to="/login"
                                    className={classNames(
                                      active
                                        ? "bg-gray-100 dark:bg-gray-700"
                                        : "",
                                      "block w-full text-start px-4 py-2 text-sm text-gray-700 dark:text-gray-200"
                                    )}
                                  >
                                    Login
                                  </Link>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <Link
                                    to="/signup"
                                    className={classNames(
                                      active
                                        ? "bg-gray-100 dark:bg-gray-700"
                                        : "",
                                      "block w-full text-start px-4 py-2 text-sm text-gray-700 dark:text-gray-200"
                                    )}
                                  >
                                    Sign up
                                  </Link>
                                )}
                              </Menu.Item>
                            </>
                          )}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden z-50 bg-slate-900">
              <div className="space-y-1 px-2 pb-3 pt-2 w-full">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    className={classNames(
                      item.current
                        ? "bg-gray-700 text-white w-full "
                        : "text-gray-300 hover:bg-gray-700 hover:text-white w-full",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    <Link className="block w-full" to={item.href}>
                      {item.name}
                    </Link>
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}
export default Navbar;
