import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Box } from "@mui/system";
import TableHead from "@mui/material/TableHead";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { darken, lighten } from "@mui/material/styles";
import { removeOrders } from "../store/ordersSlice";

const rows = [
  {
    id: "id",
    align: "left",
    disablePadding: false,
    label: "Order ID",
    sort: true,
  },
  {
    id: "reference",
    align: "left",
    disablePadding: false,
    label: "Tracking Number",
    sort: true,
  },
  {
    id: "customer",
    align: "left",
    disablePadding: false,
    label: "Customer",
    sort: true,
  },
  {
    id: "total",
    align: "right",
    disablePadding: false,
    label: "Total",
    sort: true,
  },
  {
    id: "status",
    align: "left",
    disablePadding: false,
    label: "Status",
    sort: true,
  },
  {
    id: "date",
    align: "left",
    disablePadding: false,
    label: "Date",
    sort: true,
  },
  {
    id: "carrier",
    align: "left",
    disablePadding: false,
    label: "Carrier",
    sort: false,
  },
  {
    id: "ETA",
    align: "left",
    disablePadding: false,
    label: "ETA",
    sort: true,
  },
];

function OrdersTableHead(props) {
  const { selectedOrderIds } = props;
  const numSelected = selectedOrderIds.length;

  const [selectedOrdersMenu, setSelectedOrdersMenu] = useState(null);

  const dispatch = useDispatch();

  const createSortHandler = (property) => (event) => {
    props.onRequestSort(event, property);
  };

  function openSelectedOrdersMenu(event) {
    setSelectedOrdersMenu(event.currentTarget);
  }

  function closeSelectedOrdersMenu() {
    setSelectedOrdersMenu(null);
  }

  // const {onSelectAllClick, order, orderBy, numSelected, rowCount} = props;

  return (
    <TableHead>
      <TableRow className="h-48 sm:h-64">
        {rows.map((row) => {
          return (
            <TableCell
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                    ? lighten(theme.palette.background.default, 0.4)
                    : lighten(theme.palette.background.default, 0.02),
              }}
              className="p-4 md:p-16"
              key={row.id}
              align={row.align}
              padding={row.disablePadding ? "none" : "normal"}
              sortDirection={
                props.order.id === row.id ? props.order.direction : false
              }
            >
              {row.sort && (
                <Tooltip
                  title="Sort"
                  placement={
                    row.align === "right" ? "bottom-end" : "bottom-start"
                  }
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={props.order.id === row.id}
                    direction={props.order.direction}
                    onClick={createSortHandler(row.id)}
                    className="font-semibold"
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              )}
            </TableCell>
          );
        }, this)}
      </TableRow>
    </TableHead>
  );
}

export default OrdersTableHead;
