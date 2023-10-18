import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GoogleMap from "google-map-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import OrdersStatus from "../OrdersStatus";
import { selectOrder } from "../../store/orderSlice";

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
  const isCustomer = props.isCustomer;
  const [map, setMap] = useState("shipping");

  return (
    <div>
      <div className="pb-48">
        <div className="pb-16 flex items-center">
          <FuseSvgIcon color="action">
            heroicons-outline:user-circle
          </FuseSvgIcon>
          <Typography className="h2 mx-12 font-medium" color="text.secondary">
            Customer
          </Typography>
        </div>

        <div className="mb-24">
          <div className="table-responsive mb-48">
            <table className="simple">
              <thead>
                <tr>
                  <th>
                    <Typography className="font-semibold">Name</Typography>
                  </th>
                  <th>
                    <Typography className="font-semibold">Email</Typography>
                  </th>
                  <th>
                    <Typography className="font-semibold">Phone</Typography>
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
                Shipping Address
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
        <div className="pb-16 flex items-center">
          <FuseSvgIcon color="action">heroicons-outline:clock</FuseSvgIcon>
          <Typography className="h2 mx-12 font-medium" color="text.secondary">
            Order Status
          </Typography>
        </div>

        <div className="table-responsive">
          <table className="simple">
            <thead>
              <tr>
                <th>
                  <Typography className="font-semibold">Status</Typography>
                </th>
                <th>
                  <Typography className="font-semibold">Updated On</Typography>
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

      <div className="pb-48">
        <div className="pb-16 flex items-center">
          <FuseSvgIcon color="action">
            heroicons-outline:currency-dollar
          </FuseSvgIcon>
          <Typography className="h2 mx-12 font-medium" color="text.secondary">
            Payment
          </Typography>
        </div>

        <div className="table-responsive">
          <table className="simple">
            <thead>
              <tr>
                <th>
                  <Typography className="font-semibold">Amount</Typography>
                </th>
                <th>
                  <Typography className="font-semibold">Date</Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span className="truncate">{order.totalPrice}</span>
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
            Shipping
          </Typography>
        </div>

        <div className="table-responsive">
          <table className="simple">
            <thead>
              <tr>
                <th>
                  <Typography className="font-semibold">Order ID</Typography>
                </th>
                <th>
                  <Typography className="font-semibold">
                    Tracking Code
                  </Typography>
                </th>
                <th>
                  <Typography className="font-semibold">Carrier</Typography>
                </th>
                <th>
                  <Typography className="font-semibold">
                    Estimated Date of Arrival
                  </Typography>
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
                  <span className="truncate">{order.ETA}</span>
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
