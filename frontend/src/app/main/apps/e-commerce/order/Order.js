import FusePageCarded from "@fuse/core/FusePageCarded";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import withReducer from "app/store/withReducer";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useDeepCompareEffect } from "@fuse/hooks";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import reducer from "../store";
import { getOrder, resetOrder, selectOrder } from "../store/orderSlice";
import InvoiceTab from "./tabs/InvoiceTab";
import OrderDetailsTab from "./tabs/OrderDetailsTab";
import ProductsTab from "./tabs/ProductsTab";
import OrderRepository from "../repositories/OrderRepository";

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
  const isCustomer = props.user.roleDTO?.label === "ROLE_CUSTOMER";

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
          There is no such order!
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/orders"
          color="inherit"
        >
          Go to Orders Page
        </Button>
      </motion.div>
    );
  }

  return (
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
                {`Order ${order.orderId}`}
              </Typography>
              <Typography variant="caption" className="font-medium">
                {`From ${order.user.personDTO?.firstName} ${order.user.personDTO?.lastName}`}
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
            <Tab className="h-64" label="Order Details" />
            <Tab className="h-64" label="Products" />
            {/*<Tab className="h-64" label="Invoice" />*/}
          </Tabs>
          {order && (
            <div className="p-16 sm:p-24 max-w-3xl w-full">
              {tabValue === 0 && (
                <OrderDetailsTab order={order} readOnly={isCustomer} />
              )}
              {tabValue === 1 && (
                <ProductsTab order={order} readOnly={isCustomer} />
              )}
              {/*{tabValue === 2 && (*/}
              {/*  <InvoiceTab order={order} readOnly={isCustomer} />*/}
              {/*)}*/}
            </div>
          )}
        </>
      }
      scroll={isMobile ? "normal" : "page"}
    />
  );
}

export default Order;
