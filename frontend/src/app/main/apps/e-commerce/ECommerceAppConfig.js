import { lazy } from "react";
import { Navigate } from "react-router-dom";
import DailyCheckIns from "./daily-check-ins/DailyCheckIns";
import QuizGame from "./quiz/QuizGame";
import DailyCheckIn from "./daily-check-in/DailyCheckIn";

const Product = lazy(() => import("./product/Product"));
const Products = lazy(() => import("./products/Products"));
const Order = lazy(() => import("./order/Order"));
const Orders = lazy(() => import("./orders/Orders"));

const ECommerceAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "/products",
      element: <Products />,
    },
    {
      path: "/products/:productId",
      element: <Product />,
    },
    {
      path: "/orders",
      element: <Orders />,
    },
    {
      path: "/orders/:orderId",
      element: <Order />,
    },
    {
      path: "",
      element: <Navigate to="products" />,
    },
    {
      path: "/my-coins",
      element: <DailyCheckIns />,
    },
    {
      path: "/my-coins/:dailyCheckInId",
      element: <DailyCheckIn />,
    },
    {
      path: "/quiz",
      element: <QuizGame />,
    },
  ],
};

export default ECommerceAppConfig;
