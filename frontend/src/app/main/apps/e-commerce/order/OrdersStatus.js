import _ from "@lodash";
import clsx from "clsx";

export const orderStatuses = [
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

function OrdersStatus(props) {
  return (
    <div
      className={clsx(
        "inline text-12 font-semibold py-4 px-12 rounded-full truncate",
        _.find(orderStatuses, { label: props.name }).color
      )}
    >
      {_.find(orderStatuses, { label: props.name }).name}
    </div>
  );
}

export default OrdersStatus;
