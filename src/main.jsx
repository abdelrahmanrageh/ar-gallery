import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./rtk/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page.jsx";
import ProductPage from "./components/ProductPage.jsx";
// import ShoppingCart from "./components/ShoppingCart.jsx";
import Products from "./components/Products.jsx";
import Layout from "./Layout.jsx";
import Checkout from "./components/Checkout.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import ConfirmEmail from "./components/ConfirmEmail.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <App /> },
      { path: "error", element: <ErrorPage /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "confirm-email", element: <ConfirmEmail /> },
      { path: "products/:productId", element: <ProductPage /> },
      { path: "products", element: <Products /> },
      { path: "checkout", element: <Checkout /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
