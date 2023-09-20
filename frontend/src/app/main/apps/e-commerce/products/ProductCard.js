import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { lighten } from "@mui/material/styles";
import ProductInfo from "./ProductInfo";

function ProductCard({ product }) {
  return (
    <Card className="flex flex-col max-w-xs max-h-full shadow">
      <div className="flex-grow">
        {product.images.length > 0 && product.featuredImageId ? (
          <img
            className="w-full h-full object-cover"
            src={_.find(product.images, { id: product.featuredImageId }).url}
            alt={product.name}
          />
        ) : (
          <img
            className="w-full h-full object-cover"
            src="assets/images/apps/ecommerce/product-image-placeholder.png"
            alt={product.name}
          />
        )}
      </div>

      <CardContent className="flex flex-col flex-auto p-8">
        <ProductInfo product={product} className="" />
      </CardContent>
      <CardActions
        className="items-center justify-end py-8 px-16"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? lighten(theme.palette.background.default, 0.4)
              : lighten(theme.palette.background.default, 0.03),
        }}
      >
        <Button
          to={`/apps/e-commerce/products/${product.id}`}
          component={Link}
          className="px-16 min-w-128"
          color="secondary"
          variant="contained"
          sx={{
            display: "flex",
            alignItems: "center", // Center vertically
            justifyContent: "center", // Center horizontally
          }}
        >
          <span style={{ marginRight: "8px" }}>
            <FuseSvgIcon className="" size={20}>
              heroicons-solid:shopping-cart
            </FuseSvgIcon>
          </span>
          Buy
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
