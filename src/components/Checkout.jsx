import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cartImage from "../assets/cart.webp";
import emailjs from "@emailjs/browser";
import swal from "sweetalert";
import { clearCart } from "../rtk/slices/shoppingCartSlice";
import { Link, useNavigate } from "react-router-dom";

export default function Checkout() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    authLogin();
  }, []);

  useEffect(() => {
    if (!loggedIn) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

  const authLogin = async () => {
    const res = await fetch("http://localhost:5000/users/auth", {
      method: "GET",
      credentials: "include",
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
  
  const cart = useSelector((state) => state.shoppingCart.cart);
  const totalPrice = useSelector((state) => state.shoppingCart.totalPrice);
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const form = useRef(null);
  function sendOrder(e) {
    e.preventDefault();
    emailjs.sendForm("service_itc1xmn", "template_6wd437k", form.current, {
      publicKey: "6BcAHK70njlIj9mxw",
    });
    setTimeout(() => {
      swal("Order Sent", "Your Order has been placed successfully", "success");
      dispatch(dispatch(clearCart()));
      form.current.reset();
    }, 500);
  }
  return Object.keys(cart).length === 0 ? (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src={cartImage} alt="Empty Cart" className="sm:w-1/4 w-1/2" />
      <p className="sm:text-4xl font-semibold mt-5 text-3xl text-sky-400">
        Your Cart Is Empty
      </p>
      <p className="text-sky-300 text-xl mt-2">
        Let&apos;s add some{" "}
        <Link className="text-indigo-700" to={"/products"}>
          products
        </Link>{" "}
      </p>
    </div>
  ) : (
    <div className="isolate bg-white dark:bg-slate-900 px-6 py-24 sm:py-32 lg:px-8">
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight dark:text-teal-50 text-gray-900 sm:text-4xl">
          Confirm Order
        </h2>
        {/* <p className="mt-2 text-lg leading-8 text-gray-600">
                  Aute magna irure deserunt veniam aliqua magna enim voluptate.
                </p> */}
      </div>
      <form
        ref={form}
        onSubmit={sendOrder}
        action="#"
        method="POST"
        className="group mx-auto mt-16 max-w-xl sm:mt-20"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="first-name"
              className="block text-sm font-semibold leading-6 text-gray-900 dark:text-teal-50"
            >
              First name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                required
                className="block dark:bg-slate-800 dark:ring-slate-600 dark:text-teal-50 w-full rounded-md border-0 px-3.5 py-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="last-name"
              className="block text-sm font-semibold leading-6 text-gray-900 dark:text-teal-50"
            >
              Last name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="last-name"
                id="last-name"
                required
                autoComplete="family-name"
                className=" block w-full dark:bg-slate-800 dark:ring-slate-600 dark:text-teal-50 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="adress"
              className="block text-sm font-semibold leading-6 text-gray-900 dark:text-teal-50"
            >
              Address
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="address"
                id="adress"
                placeholder="Address"
                required
                autoComplete="address-line1"
                className="block w-full dark:bg-slate-800 dark:ring-slate-600 dark:text-teal-50 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
              />
              <div className="flex items-center justify-between ">
                <input
                  type="text"
                  name="city"
                  id="adress"
                  placeholder="City"
                  autoComplete="address-level1"
                  className="inline dark:bg-slate-800 dark:ring-slate-600 w-full dark:text-teal-50 px-4 mt-2 rounded-md border-0  py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                />
                <input
                  type="text"
                  name="building"
                  id="adress"
                  placeholder="Building"
                  required
                  autoComplete="address-level4"
                  className="inline w-full dark:bg-slate-800 dark:ring-slate-600 dark:text-teal-50 px-4 mx-2 mt-2 rounded-md border-0  py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                />
                <input
                  type="text"
                  name="apt"
                  id="adress"
                  placeholder="Apt"
                  autoComplete="address-level3"
                  className="inline w-full px-4 dark:bg-slate-800 dark:ring-slate-600 dark:text-teal-50  mt-2 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 dark:text-teal-50 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2.5">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="example@email.com"
                autoComplete="email"
                required
                className="block w-full dark:text-teal-50 dark:bg-slate-800 dark:ring-slate-600 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="phone-number"
              className="block text-sm font-semibold leading-6 dark:text-teal-50 text-gray-900"
            >
              Phone number
            </label>
            <div className="relative mt-2.5">
              <div className="absolute inset-y-0 left-0 flex dark:text-teal-50 items-center">
                <label htmlFor="country" className="sr-only">
                  Country
                </label>
              </div>
              <input
                type="tel"
                name="phone-number"
                id="phone-number"
                placeholder="01234567890"
                autoComplete="tel"
                required
                className="block w-full dark:text-teal-50 dark:bg-slate-800 dark:ring-slate-600 rounded-md border-0 px-3.5 py-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>

        <div className=" mt-8 p-6 rounded-lg dark:ring-slate-600 ring-gray-300 ring-1">
          <div>
            <div className="flex justify-between w-full my-2 dark:text-gray-400 leading-6 text-gray-900 px-3.5">
              <p className="inline">Subtotal</p>
              <p className="inline ">${+totalPrice.toFixed(2)}</p>
            </div>
          </div>
          <div>
            <div className="flex justify-between w-full my-2  dark:text-gray-400 leading-6 text-gray-900 px-3.5">
              <p className="inline">Shipping</p>
              <p className="inline ">$50</p>
            </div>
          </div>
          <div>
            <div className="flex justify-between w-full  dark:text-gray-200 leading-6 text-gray-900 px-3.5">
              <p className="inline">Total</p>
              <p className="inline ">${+totalPrice.toFixed(2) + 50} </p>
            </div>
          </div>

          <div className="mt-5">
            <button
              type="submit"
              className="block w-full rounded-md bg-sky-600 px-3.5 py-3 text-center text-lg font-semibold text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
            >
              <div className="flex justify-between w-full  dark:text-gray-200 leading-6 ">
                <p className="inline">Place Order</p>
                <p className="inline ">${+totalPrice.toFixed(2) + 50} </p>
              </div>
            </button>
          </div>
        </div>
        <input
          type="text"
          name="orderDetails"
          className="hidden"
          defaultValue={`
${Object.keys(cart)
  .map((key) => {
    return `product id: ${cart[key].id} x ${cart[key].quantity} || ${cart[key].title} \n`;
  })
  .join("")}
----------
Total:
$${totalPrice.toFixed(2)}
`}
        />
      </form>
    </div>
  );
}
