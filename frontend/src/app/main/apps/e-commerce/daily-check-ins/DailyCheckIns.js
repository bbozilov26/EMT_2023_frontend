import withReducer from "app/store/withReducer";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import reducer from "../store";
import FusePageSimple from "@fuse/core/FusePageSimple";
import DailyCheckInsHeader from "./DailyCheckInsHeader";
import DailyCheckInsTable from "./DailyCheckInsTable";

function DailyCheckIns() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <FusePageSimple
      header={<DailyCheckInsHeader />}
      content={<DailyCheckInsTable />}
      scroll={"page"}
    />
  );
}

export default withReducer("eCommerceApp", reducer)(DailyCheckIns);
