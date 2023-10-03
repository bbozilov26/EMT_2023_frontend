import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import reducer from "../store";
import ProductsHeader from "./ProductsHeader";
import ProductsTable from "./ProductsTable";
import FusePageSimple from "@fuse/core/FusePageSimple";

function Products() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <FusePageSimple
      header={<ProductsHeader />}
      content={<ProductsTable />}
      scroll={"page"}
    />
  );
}

export default withReducer("eCommerceApp", reducer)(Products);
