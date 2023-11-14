import FusePageCarded from "@fuse/core/FusePageCarded";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import { getOrder, resetOrder, selectOrder } from "../store/orderSlice";
import OrderDetailsTab from "./tabs/OrderDetailsTab";
import ProductsTab from "./tabs/ProductsTab";
import OrderRepository from "../repositories/OrderRepository";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";

const schema = yup.object().shape({
  name: yup.string().required("You must select an order status"),
});

function Order(props) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useThemeMediaQuery((_theme) =>
    _theme.breakpoints.down("lg")
  );

  const routeParams = useParams();
  const { orderId } = routeParams;
  const [tabValue, setTabValue] = useState(0);
  const [noOrder, setNoOrder] = useState(false);
  const [order, setOrder] = useState();
  const user = JSON.parse(localStorage.getItem("user"));

  const methods = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const { reset, watch, control, onChange, formState } = methods;
  const form = watch();
  const { t } = useTranslation("app");

  useEffect(() => {
    OrderRepository.findOrderById(orderId).then(({ data }) => {
      if (!data) {
        setNoOrder(true);
      } else {
        setOrder({
          id: data.id.id,
          dateCreated: data.dateCreated,
          dateModified: data.dateModified,
          dateClosed: data.dateClosed,
          totalPrice: data.totalPrice,
          orderId: data.orderId,
          trackingNumber: data.trackingNumber,
          description: data.description,
          orderStatus: data.orderStatus,
          user: data.userDTO,
          orderedProducts: data.orderedProductDTOs,
          carrier: data.carrier,
          eta: data.eta,
        });
      }
    });
  }, [routeParams]);

  useEffect(() => {
    return () => {
      dispatch(resetOrder());
      setNoOrder(false);
    };
  }, [dispatch]);

  function handleTabChange(event, value) {
    setTabValue(value);
  }

  if (noOrder) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          {t("NO_SUCH_ORDER")}
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/orders"
          color="inherit"
        >
          {t("GO_TO_ORDERS_PAGE")}
        </Button>
      </motion.div>
    );
  }

  return (
    <FormProvider {...methods}>
      <FusePageCarded
        header={
          order && (
            <div className="flex flex-1 flex-col items-center sm:items-start py-32 px-24 md:px-32">
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
              >
                <Typography
                  className="flex items-center sm:mb-12"
                  component={Link}
                  role="button"
                  to="/orders"
                  color="inherit"
                >
                  <FuseSvgIcon size={20}>
                    {theme.direction === "ltr"
                      ? "heroicons-outline:arrow-sm-left"
                      : "heroicons-outline:arrow-sm-right"}
                  </FuseSvgIcon>
                  <span className="mx-4 font-medium">Orders</span>
                </Typography>
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
                className="flex flex-col items-center sm:items-start min-w-0 items-center sm:items-start"
              >
                <Typography className="text-20 truncate font-semibold">
                  {`${order.orderId}`}
                </Typography>
              </motion.div>
            </div>
          )
        }
        content={
          <>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor="secondary"
              textColor="secondary"
              variant="scrollable"
              scrollButtons="auto"
              classes={{ root: "w-full h-64 border-b-1" }}
            >
              <Tab className="h-64" label={t("ORDER_DETAILS")} />
              <Tab className="h-64" label={t("PRODUCTS")} />
              {/*<Tab className="h-64" label="Invoice" />*/}
            </Tabs>
            {order && (
              <div className="p-16 sm:p-24 w-full">
                {tabValue === 0 && (
                  <OrderDetailsTab order={order} user={user} />
                )}
                {tabValue === 1 && <ProductsTab order={order} />}
              </div>
            )}
          </>
        }
        scroll={isMobile ? "normal" : "page"}
      />
    </FormProvider>
  );
}

export default Order;
