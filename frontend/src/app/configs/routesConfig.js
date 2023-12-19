import FuseUtils from "@fuse/utils";
import FuseLoading from "@fuse/core/FuseLoading";
import { Navigate } from "react-router-dom";
import settingsConfig from "app/configs/settingsConfig";
import userInterfaceConfigs from "../main/user-interface/UserInterfaceConfigs";
import SignInConfig from "../main/sign-in/SignInConfig";
import SignUpConfig from "../main/sign-up/SignUpConfig";
import SignOutConfig from "../main/sign-out/SignOutConfig";
import appsConfigs from "../main/apps/appsConfigs";
import pagesConfigs from "../main/pages/pagesConfigs";
import authRoleExamplesConfigs from "../main/auth/authRoleExamplesConfigs";
import DocumentationConfig from "../main/documentation/DocumentationConfig";
import ForgotPasswordConfig from "../main/forgot-password/ForgotPasswordConfig";
import ResetPasswordConfig from "../main/reset-password/ResetPasswordConfig";
import Products from "../main/apps/e-commerce/products/Products";

const routeConfigs = [
  ...appsConfigs,
  ...pagesConfigs,
  ...authRoleExamplesConfigs,
  ...userInterfaceConfigs,
  DocumentationConfig,
  SignOutConfig,
  SignInConfig,
  SignUpConfig,
  ForgotPasswordConfig,
  ResetPasswordConfig,
];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
  {
    path: "/products",
    element: <Products />,
    auth: settingsConfig.defaultAuth,
  },
  {
    path: "loading",
    element: <FuseLoading />,
  },
  {
    path: "*",
    element: <Navigate to="pages/error/404" />,
  },
];

export default routes;
