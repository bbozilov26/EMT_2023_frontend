import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GoogleMap from "google-map-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import OrdersStatus from "../OrdersStatus";
import { selectOrder } from "../../store/orderSlice";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import DialogActions from "@mui/material/DialogActions";
import OrderRepository from "../../repositories/OrderRepository";
import clsx from "clsx";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

function Marker(props) {
  return (
    <Tooltip title={props.text} placement="top">
      <FuseSvgIcon className="text-red">
        heroicons-outline:location-marker
      </FuseSvgIcon>
    </Tooltip>
  );
}

function OrderDetailsTab(props) {
  const order = props.order;
  const isCustomer = props.user.roleDTO?.label === "ROLE_CUSTOMER";
  const [map, setMap] = useState("shipping");
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(order.orderStatus || "");
  const methods = useFormContext();
  const { control, formState, watch, setValue, getValues } = methods;
  const { t } = useTranslation("app");

  const handleEditClick = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleSave = () => {
    const dto = {
      orderStatus: getValues("orderStatus"),
    };

    OrderRepository.updateOrder(order.id, dto)
      .then((data) => {
        // Handle the updated product data
        console.log("Updated order:", data);
        window.location.reload();
      })
      .catch((error) => {
        // Handle any errors that occur during the update
        console.error("Error updating order:", error);
      });
  };

  const orderStatuses = [
    {
      id: 1,
      name: "Order has been received",
      label: "RECEIVED",
      color: "bg-blue text-black",
    },
    {
      id: 2,
      name: "Shipped",
      label: "SHIPPED",
      color: "bg-green text-white",
    },
    {
      id: 3,
      name: "In transition",
      label: "IN_TRANSITION",
      color: "bg-orange text-white",
    },
    {
      id: 4,
      name: "Delivered",
      label: "DELIVERED",
      color: "bg-green-700 text-white",
    },
    {
      id: 5,
      name: "Cancelled",
      label: "CANCELLED",
      color: "bg-pink text-white",
    },
    {
      id: 6,
      name: "Refunded",
      label: "REFUNDED",
      color: "bg-red text-white",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-48">
      <div className="pb-48">
        <div className="pb-16 flex items-center">
          <FuseSvgIcon color="action">
            heroicons-outline:user-circle
          </FuseSvgIcon>
          <Typography className="h2 mx-12 font-medium" color="text.secondary">
            {t("CUSTOMER")}
          </Typography>
        </div>

        <div className="mb-24">
          <div className="table-responsive mb-48">
            <table className="simple">
              <thead>
                <tr>
                  <th>
                    <Typography className="font-semibold">
                      {t("CUSTOMER_NAME")}
                    </Typography>
                  </th>
                  <th>
                    <Typography className="font-semibold">
                      {t("EMAIL")}
                    </Typography>
                  </th>
                  <th>
                    <Typography className="font-semibold">
                      {t("PHONE_NUMBER")}
                    </Typography>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="flex items-center">
                      <Avatar src={order.user?.avatar} />
                      <Typography className="truncate mx-8">
                        {`${order.user.personDTO?.firstName} ${order.user.personDTO?.lastName}`}
                      </Typography>
                    </div>
                  </td>
                  <td>
                    <Typography className="truncate">
                      {order.user.email}
                    </Typography>
                  </td>
                  <td>
                    <Typography className="truncate">
                      {order.user.personDTO?.phoneNumber}
                    </Typography>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <Accordion
            className="border-0 shadow-0 overflow-hidden"
            expanded={map === "shipping"}
            onChange={() => setMap(map !== "shipping" ? "shipping" : false)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              classes={{ root: "border border-solid rounded-16 mb-16" }}
            >
              <Typography className="font-semibold">
                {t("SHIPPING_ADDRESS")}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className="flex flex-col md:flex-row -mx-8">
              <Typography className="w-full md:max-w-256 mb-16 md:mb-0 mx-8 text-16">
                {order.user.personDTO?.address}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>

      <div className="pb-48">
        <div className="flex items-center justify-between pb-16">
          <div className="flex items-center">
            <FuseSvgIcon color="action">heroicons-outline:clock</FuseSvgIcon>
            <Typography className="h2 mx-12 font-medium" color="text.secondary">
              {t("STATUS")}
            </Typography>
          </div>

          {!isCustomer ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditClick}
            >
              {t("EDIT")}
            </Button>
          ) : null}
        </div>

        <div className="table-responsive">
          <table className="simple">
            <thead>
              <tr>
                <th>
                  <Typography className="font-semibold">
                    {t("STATUS")}
                  </Typography>
                </th>
                <th>
                  <Typography className="font-semibold">
                    {t("UPDATED_ON")}
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr key={order.orderStatus}>
                <td>
                  <OrdersStatus name={order.orderStatus} />
                </td>
                <td>{order.dateModified}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={isDialogOpen} onClose={handleClose}>
        <DialogTitle>{t("CHANGE_ORDER_STATUS")}</DialogTitle>
        <DialogContent>
          <Controller
            name="orderStatus"
            control={control}
            defaultValue={
              order.orderStatus
                ? orderStatuses.find((o) => o.label === order.orderStatus).label
                : ""
            }
            render={({ field: { onChange, value } }) => (
              <FormControl variant="outlined" fullWidth className="mt-8 mb-16">
                <InputLabel htmlFor="order-status-select">
                  {t("SELECT_ORDER_STATUS")}
                </InputLabel>
                <Select
                  value={value || selectedStatus}
                  onChange={onChange}
                  label={t("SELECT_ORDER_STATUS")}
                  id="order-status-select"
                >
                  {orderStatuses.map((status) => (
                    <MenuItem key={status.label} value={status.label}>
                      {status.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {t("CANCEL")}
          </Button>
          <Button onClick={handleSave} color="primary">
            {t("SAVE")}
          </Button>
        </DialogActions>
      </Dialog>

      <div className="pb-48">
        <div className="pb-16 flex items-center">
          <FuseSvgIcon color="action">
            heroicons-outline:currency-euro
          </FuseSvgIcon>
          <Typography className="h2 mx-12 font-medium" color="text.secondary">
            {t("PAYMENT")}
          </Typography>
        </div>

        <div className="table-responsive">
          <table className="simple">
            <thead>
              <tr>
                <th>
                  <Typography className="font-semibold">
                    {t("AMOUNT")}
                  </Typography>
                </th>
                <th>
                  <Typography className="font-semibold">{t("DATE")}</Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span
                    className="truncate"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <FuseSvgIcon>heroicons-outline:currency-euro</FuseSvgIcon>
                    {order.totalPrice.toFixed(2)}
                  </span>
                </td>
                <td>
                  <span className="truncate">{order.dateCreated}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="pb-48">
        <div className="pb-16 flex items-center">
          <FuseSvgIcon color="action">heroicons-outline:truck</FuseSvgIcon>
          <Typography className="h2 mx-12 font-medium" color="text.secondary">
            {t("SHIPPING")}
          </Typography>
        </div>

        <div className="table-responsive">
          <table className="simple">
            <thead>
              <tr>
                <th>
                  <Typography className="font-semibold">
                    {t("ORDER_ID")}
                  </Typography>
                </th>
                <th>
                  <Typography className="font-semibold">
                    {t("TRACKING_NUMBER")}
                  </Typography>
                </th>
                <th>
                  <Typography className="font-semibold">
                    {t("CARRIER")}
                  </Typography>
                </th>
                <th>
                  <Typography className="font-semibold">{t("ETA")}</Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr key={order.dateModified}>
                <td>
                  <span className="truncate">{order.orderId}</span>
                </td>
                <td>
                  <span className="truncate">{order.trackingNumber}</span>
                </td>
                <td>
                  <span className="truncate">{order.carrier}</span>
                </td>
                <td>
                  <span className="truncate">{order.eta}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsTab;
