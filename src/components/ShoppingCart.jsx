import { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  toggleCart,
  removeFromCart,
  getTotalPrice,
  changeQuantity,
} from "../rtk/slices/shoppingCartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function ShoppingCart() {
  const activeShoppingCart = useSelector(
    (state) => state.shoppingCart.openShoppingCart
  );
  const cart = useSelector((state) => state.shoppingCart.cart);
  const totalPrice = useSelector((state) => state.shoppingCart.totalPrice);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTotalPrice());
  }, [cart, dispatch]);

  return (
    <>
      <Transition.Root show={activeShoppingCart} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => dispatch(toggleCart())}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 dark:bg-gray-800 bg-opacity-75 dark:bg-opacity-75 transition-opacity" />
          </Transition.Child>

          
          <div className="fixed inset-0 overflow-hidden ">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white dark:bg-gray-900 shadow-xl">
                      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium  dark:text-gray-400 text-gray-900">
                            Shopping cart
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => dispatch(toggleCart())}
                            >
                              <span className="absolute -inset-0.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="flow-root">
                            <ul
                              role="list"
                              className="-my-6 divide-y divide-gray-200"
                            >
                              {Object.values(cart).map((product, i) => (
                                <li key={i} className="flex py-6   !border-b !border-gray-100   dark:!border-gray-700">
                                  <div className="h-24 w-24 flex items-center flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
                                    <img
                                      src={product.images[0]}
                                      alt={product.title}
                                      className="max-h-full max-w-full m-auto   object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900 dark:text-gray-300">
                                        <h3>
                                          <a href={product.href}>
                                            {product.title}
                                          </a>
                                        </h3>
                                        <p className="ml-4">${product.price}</p>
                                      </div>
                                      {/* <p className="mt-1 text-sm text-gray-500">
                                        {product.color}
                                      </p> */}
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className="text-gray-500 dark:text-gray-300">
                                        Qty
                                        <input
                                          type="number"
                                          className="w-10 h-8 pl-2 border ml-2 dark:bg-gray-900  rounded-lg border-gray-200 dark:border-gray-600"
                                          min={0}
                                          value={product.quantity || ""}
                                          onChange={(e) => {
                                            dispatch(
                                              changeQuantity({
                                                id: product._id,
                                                quantity: +e.target.value,
                                              })
                                            );
                                          }}
                                          onBlur={(e) => {
                                            e.preventDefault();
                                            if (e.target.value < 1) {
                                              dispatch(
                                                removeFromCart(product._id)
                                              );
                                            }
                                          }}
                                        />
                                        {/* {product.quantity} */}
                                      </div>

                                      {/* remove button */}
                                      <div className="flex">
                                        <button
                                          type="button"
                                          className="font-medium text-sky-600 hover:text-sky-500 dark:text-sky-500"
                                          onClick={() =>
                                            dispatch(removeFromCart(product._id))
                                          }
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 dark:border-gray-600 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900 dark:text-gray-100">
                          <p>Subtotal</p>
                          <p>${totalPrice.toFixed(2)}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                          Shipping and taxes calculated at checkout.
                        </p>
                        <div className="mt-6">
                          <Link
                            onClick={() => {
                              dispatch(toggleCart());
                            }}
                            to="/checkout"
                            className="flex items-center justify-center rounded-md border border-transparent bg-sky-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-sky-600"
                          >
                            Checkout
                          </Link>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            or{" "}
                            <button
                              type="button"
                              className="font-medium text-sky-500 hover:text-sky-600"
                              onClick={() => dispatch(toggleCart())}
                            >
                              Continue Shopping
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
