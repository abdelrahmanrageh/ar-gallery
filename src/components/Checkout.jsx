// import { useState } from "react";
// import { RadioGroup } from "@headlessui/react";
import { TrashIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import {
  changeQuantity,
  clearCart,
  removeFromCart,
} from "../rtk/slices/shoppingCartSlice";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authLogin } from "../rtk/slices/userSlice";
import axios from "axios";
import SuccessAlert from "./SuccessAlert";
import cartImage from "../assets/cart.webp";

// const deliveryMethods = [
//   {
//     id: 1,
//     title: "Standard",
//     turnaround: "4–10 business days",
//     price: "$5.00",
//   },
//   { id: 2, title: "Express", turnaround: "2–5 business days", price: "$16.00" },
// ];
// const paymentMethods = [
//   { id: "credit-card", title: "Credit card" },
//   { id: "paypal", title: "PayPal" },
//   { id: "etransfer", title: "eTransfer" },
// ];

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

export default function Checkout() {
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isVerified = useSelector((state) => state.user.user.isVerified);
  const total = useSelector((state) => state.shoppingCart.totalPrice);
  const [country, setCountry] = useState("Egypt");
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user._id);
  const products = Object.values(
    useSelector((state) => state.shoppingCart.cart)
  );

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login?redirect=checkout");
    } else if (loggedIn && !isVerified) {
      dispatch(authLogin());
      navigate("/confirm-email");
    } else setLoading(false);
  }, [loggedIn, isVerified]);

  if (products.length === 0) {
    return (
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
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-r-2 border-b-2 border-sky-600" />
      </div>
    );
  }

  // const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(
  //   deliveryMethods[0]
  // );

  const addOrder = async (e) => {
    e.preventDefault();
    const fullAddress = `${e.target.address.value},\n ${e.target.city.value}, ${e.target.region.value}, ${e.target.country.value}, ${e.target["postal-code"].value}`;
    const res = await axios.post(
      "https://ar-backend-0833.onrender.com/orders/new",
      {
        products,
        total,
        country,
        address: fullAddress,
        userId,
        status: "pending",
      },
      {
        withCredentials: true,
      }
    );
    if (res.status === 200) {
      dispatch(clearCart());
    }
  };

  return (
    <div className=" mt-20">
      <SuccessAlert message="Your order has been placed successfully" />
      <main className="max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto lg:max-w-none">
          <h1 className="sr-only">Checkout</h1>

          <form
            onSubmit={addOrder}
            className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
          >
            <div>
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50">
                  Contact information
                </h2>

                <div className="mt-4">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700  dark:text-gray-300"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      required
                      type="email"
                      id="email-address"
                      name="email-address"
                      autoComplete="email"
                      className="block w-full p-2 dark:bg-gray-800  border dark:text-gray-200 dark:border-gray-600 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-10 border-t border-gray-200 dark:border-gray-500 pt-10">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-300">
                  Shipping information
                </h2>

                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div>
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      First name
                    </label>
                    <div className="mt-1">
                      <input
                        required
                        type="text"
                        id="first-name"
                        name="first-name"
                        autoComplete="given-name"
                        className="block w-full p-2 dark:bg-gray-800  border dark:text-gray-200 dark:border-gray-600 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Last name
                    </label>
                    <div className="mt-1">
                      <input
                        required
                        type="text"
                        id="last-name"
                        name="last-name"
                        autoComplete="family-name"
                        className="block w-full p-2 dark:bg-gray-800  border dark:text-gray-200 dark:border-gray-600 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Address
                    </label>
                    <div className="mt-1">
                      <input
                        required
                        type="text"
                        name="address"
                        id="address"
                        autoComplete="street-address"
                        className="block w-full p-2 dark:bg-gray-800  border dark:text-gray-200 dark:border-gray-600 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="apartment"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Apartment, suite, etc.
                    </label>
                    <div className="mt-1">
                      <input
                        required
                        type="text"
                        name="apartment"
                        id="apartment"
                        className="block w-full p-2 dark:bg-gray-800  border dark:text-gray-200 dark:border-gray-600 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Country
                    </label>
                    <div className="mt-1">
                      <select
                        id="country"
                        name="country"
                        onChange={(e) => setCountry(e.target.value)}
                        autoComplete="country-name"
                        className="block w-full p-2 border-gray-300 dark:bg-gray-800 dark:text-gray-200 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option>Egypt</option>
                        <option disabled>
                          United Arab Emirates (coming soon)
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      City
                    </label>
                    <div className="mt-1">
                      <input
                        required
                        type="text"
                        name="city"
                        id="city"
                        autoComplete="address-level2"
                        className="block w-full p-2 border-gray-300 dark:bg-gray-800 dark:text-gray-200 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="region"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      State / Province
                    </label>
                    <div className="mt-1">
                      <input
                        required
                        type="text"
                        name="region"
                        id="region"
                        autoComplete="address-level1"
                        className="block w-full p-2 dark:bg-gray-800  border dark:text-gray-200 dark:border-gray-600 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="postal-code"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Postal code
                    </label>
                    <div className="mt-1">
                      <input
                        required
                        type="text"
                        name="postal-code"
                        id="postal-code"
                        autoComplete="postal-code"
                        className="block w-full p-2 dark:bg-gray-800  border dark:text-gray-200 dark:border-gray-600 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Phone
                    </label>
                    <div className="mt-1">
                      <input
                        required
                        type="text"
                        name="phone"
                        id="phone"
                        autoComplete="tel"
                        className="block w-full p-2 dark:bg-gray-800 border dark:text-gray-200 dark:border-gray-600 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Method */}
              {/* <div className="mt-10 border-t border-gray-200 pt-10">
                <RadioGroup value={selectedDeliveryMethod} onChange={setSelectedDeliveryMethod}>
                  <RadioGroup.Label className="text-lg font-medium text-gray-900">Delivery method</RadioGroup.Label>

                  <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    {deliveryMethods.map((deliveryMethod) => (
                      <RadioGroup.Option
                        key={deliveryMethod.id}
                        value={deliveryMethod}
                        className={({ checked, active }) =>
                          classNames(
                            checked ? 'border-transparent' : 'border-gray-300',
                            active ? 'ring-2 ring-indigo-500' : '',
                            'relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none'
                          )
                        }
                      >
                        {({ checked, active }) => (
                          <>
                            <div className="flex-1 flex">
                              <div className="flex flex-col">
                                <RadioGroup.Label as="span" className="block text-sm font-medium text-gray-900">
                                  {deliveryMethod.title}
                                </RadioGroup.Label>
                                <RadioGroup.Description
                                  as="span"
                                  className="mt-1 flex items-center text-sm text-gray-500"
                                >
                                  {deliveryMethod.turnaround}
                                </RadioGroup.Description>
                                <RadioGroup.Description as="span" className="mt-6 text-sm font-medium text-gray-900">
                                  {deliveryMethod.price}
                                </RadioGroup.Description>
                              </div>
                            </div>
                            {checked ? (
                              <CheckCircleIcon className="h-5 w-5 text-indigo-600" aria-hidden="true" />
                              // <div className="flex-shrink-0 text-indigo-600">s</div>
                            ) : null}
                            <div
                              className={classNames(
                                active ? 'border' : 'border-2',
                                checked ? 'border-indigo-500' : 'border-transparent',
                                'absolute -inset-px rounded-lg pointer-events-none'
                              )}
                              aria-hidden="true"
                            />
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div> */}

              {/* Payment */}
              {/* <div className="mt-10 border-t border-gray-200 pt-10">
                <h2 className="text-lg font-medium text-gray-900">Payment</h2>

                <fieldset className="mt-4">
                  <legend className="sr-only">Payment type</legend>
                  <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                    {paymentMethods.map((paymentMethod, paymentMethodIdx) => (
                      <div key={paymentMethod.id} className="flex items-center">
                        {paymentMethodIdx === 0 ? (
                          <input required
                            id={paymentMethod.id}
                            name="payment-type"
                            type="radio"
                            defaultChecked
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                          />
                        ) : (
                          <input required
                            id={paymentMethod.id}
                            name="payment-type"
                            type="radio"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                          />
                        )}

                        <label htmlFor={paymentMethod.id} className="ml-3 block text-sm font-medium text-gray-700">
                          {paymentMethod.title}
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>

                <div className="mt-6 grid grid-cols-4 gap-y-6 gap-x-4">
                  <div className="col-span-4">
                    <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
                      Card number
                    </label>
                    <div className="mt-1">
                      <input required
                        type="text"
                        id="card-number"
                        name="card-number"
                        autoComplete="cc-number"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="col-span-4">
                    <label htmlFor="name-on-card" className="block text-sm font-medium text-gray-700">
                      Name on card
                    </label>
                    <div className="mt-1">
                      <input required
                        type="text"
                        id="name-on-card"
                        name="name-on-card"
                        autoComplete="cc-name"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="col-span-3">
                    <label htmlFor="expiration-date" className="block text-sm font-medium text-gray-700">
                      Expiration date (MM/YY)
                    </label>
                    <div className="mt-1">
                      <input required
                        type="text"
                        name="expiration-date"
                        id="expiration-date"
                        autoComplete="cc-exp"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
                      CVC
                    </label>
                    <div className="mt-1">
                      <input required
                        type="text"
                        name="cvc"
                        id="cvc"
                        autoComplete="csc"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div> */}
            </div>

            {/* Order summary */}
            <div className="mt-10 lg:mt-0">
              <h2 className="text-lg font-medium text-gray-900 dark:text-gray-200">
                Order summary
              </h2>

              <div className="mt-4 bg-white dark:bg-gray-800 border dark:border-gray-600 border-gray-200 rounded-lg shadow-sm">
                <h3 className="sr-only">Items in your cart</h3>
                <ul
                  role="list"
                  className="divide-y divide-gray-200 dark:divide-gray-700"
                >
                  {products.map((product) => (
                    <li key={product._id} className="flex py-6 px-4 sm:px-6">
                      <div className="flex-shrink-0">
                        <img
                          src={product.images[0]}
                          alt={product.imageAlt}
                          className="w-20 rounded-md"
                        />
                      </div>

                      <div className="ml-6 flex-1 flex flex-col">
                        <div className="flex">
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm">
                              <Link
                                to={`/products/${product._id}`}
                                className="font-medium text-gray-700 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100"
                              >
                                {product.title}
                              </Link>
                            </h4>
                            {/* <p className="mt-1 text-sm text-gray-500 dark:text-gray-200 ">
                              {product.size}
                            </p> */}
                          </div>

                          <div className="ml-4 flex-shrink-0 flow-root">
                            <button
                              type="button"
                              onClick={() => {
                                dispatch(removeFromCart(product._id));
                              }}
                              className="-m-2.5 bg-white dark:bg-gray-800 p-2.5 flex items-center justify-center text-gray-400 hover:text-gray-500"
                            >
                              <span className="sr-only">Remove</span>
                              <TrashIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>

                        <div className="flex-1 pt-2 flex items-end justify-between">
                          <p className="mt-1 text-sm font-medium text-gray-900 dark:text-gray-400">
                            {product.price}{" "}
                            {country === "Egypt" ? "EGP" : "AED"}
                          </p>

                          <div className="ml-4">
                            <label htmlFor="quantity" className="sr-only">
                              Quantity
                            </label>
                            <select
                              id="quantity"
                              name="quantity"
                              value={product.quantity}
                              onChange={(e) => {
                                dispatch(
                                  changeQuantity({
                                    id: product._id,
                                    quantity: +e.target.value,
                                  })
                                );
                              }}
                              className="rounded-md border border-gray-300 dark:bg-gray-800 p-0.5 dark:border-gray-600 dark:text-gray-200 text-base font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            >
                              <option value={1}>1</option>
                              <option value={2}>2</option>
                              <option value={3}>3</option>
                              <option value={4}>4</option>
                              <option value={5}>5</option>
                              <option value={6}>6</option>
                              <option value={7}>7</option>
                              <option value={8}>8</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <dl className="border-t border-gray-200 dark:border-gray-500 py-6 px-4 space-y-6 sm:px-6">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm dark:text-gray-300">Subtotal</dt>
                    <dd className="text-sm font-medium text-gray-900 dark:text-gray-300">
                      {total} {country === "Egypt" ? "EGP" : "AED"}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-sm dark:text-gray-300">Shipping</dt>
                    <dd className="text-sm font-medium text-gray-900 dark:text-gray-300">
                      80 {country === "Egypt" ? "EGP" : "AED"}
                    </dd>
                  </div>
                  {/* <div className="flex items-center justify-between">
                    <dt className="text-sm">Taxes</dt>
                    <dd className="text-sm font-medium text-gray-900">$5.52</dd>
                  </div> */}
                  <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-600 pt-6">
                    <dt className="text-base font-medium dark:text-gray-50">
                      Total
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-gray-50">
                      {+total + 80} {country === "Egypt" ? "EGP" : "AED"}
                    </dd>
                  </div>
                </dl>

                <div className="border-t border-gray-200 py-6 px-4 sm:px-6 dark:border-gray-500">
                  <button
                    type="submit"
                    className="w-full bg-sky-500 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                  >
                    Confirm order
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
