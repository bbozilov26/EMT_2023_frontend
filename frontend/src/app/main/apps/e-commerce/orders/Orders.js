import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import reducer from "../store";
import OrdersHeader from "./OrdersHeader";
import OrdersTable from "./OrdersTable";
import { useSelector } from "react-redux";
import { selectUser } from "app/store/userSlice";

function Orders() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const user = useSelector(selectUser);

  return (
    <FusePageCarded
      header={<OrdersHeader />}
      content={<OrdersTable user={user} />}
      scroll={"page"}
    />
  );
}

export default withReducer("eCommerceApp", reducer)(Orders);
