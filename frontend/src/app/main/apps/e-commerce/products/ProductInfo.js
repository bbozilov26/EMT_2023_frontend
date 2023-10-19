import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import clsx from "clsx";
import ProductCategory from "./ProductCategory";
import { Image } from "@mui/icons-material";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useTranslation } from "react-i18next";

function ProductInfo({ product, className }) {
  const { t } = useTranslation("app");

  if (!product) {
    return null;
  }

  return (
    <div className={clsx("w-full", className)}>
      <Typography className="text-16 font-medium mb-2 truncate">
        {product.name}
      </Typography>

      <Typography
        className="text-13"
        color="text.secondary"
        style={{ display: "flex", alignItems: "center" }}
      >
        {t(product.category)}
      </Typography>

      <Typography
        className="text-13"
        color="text.secondary"
        style={{ display: "flex", alignItems: "center" }}
      >
        <FuseSvgIcon>heroicons-outline:currency-euro</FuseSvgIcon>
        {product.price}
      </Typography>
    </div>
  );
}

export default ProductInfo;
