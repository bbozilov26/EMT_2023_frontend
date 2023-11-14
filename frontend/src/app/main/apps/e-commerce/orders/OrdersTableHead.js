import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import { useDispatch } from "react-redux";
import TableHead from "@mui/material/TableHead";
import { darken, lighten } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

function OrdersTableHead(props) {
  const { selectedOrderIds } = props;
  const numSelected = selectedOrderIds.length;

  const [selectedOrdersMenu, setSelectedOrdersMenu] = useState(null);

  const dispatch = useDispatch();
  const { t } = useTranslation("app");

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

  const rows = [
    {
      id: "id",
      align: "left",
      disablePadding: false,
      label: t("ORDER_ID"),
      sort: true,
    },
    {
      id: "reference",
      align: "left",
      disablePadding: false,
      label: t("TRACKING_NUMBER"),
      sort: true,
    },
    {
      id: "customer",
      align: "left",
      disablePadding: false,
      label: t("CUSTOMER"),
      sort: true,
    },
    {
      id: "total",
      align: "left",
      disablePadding: false,
      label: t("TOTAL"),
      sort: true,
    },
    {
      id: "status",
      align: "left",
      disablePadding: false,
      label: t("STATUS"),
      sort: true,
    },
    {
      id: "date",
      align: "left",
      disablePadding: false,
      label: t("DATE"),
      sort: true,
    },
    {
      id: "carrier",
      align: "left",
      disablePadding: false,
      label: t("CARRIER"),
      sort: true,
    },
    {
      id: "ETA",
      align: "left",
      disablePadding: false,
      label: t("ETA"),
      sort: true,
    },
  ];

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
