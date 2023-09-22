import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Heart } from "react-feather";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { lighten } from "@mui/material/styles";
import ProductInfo from "./ProductInfo";
import { useSelector } from "react-redux";
import { selectUser } from "app/store/userSlice";
import React, { useState } from "react";

function ProductCard({ product }) {
  const user = useSelector(selectUser);

  const [isRed, setIsRed] = useState(false);

  const handleClick = () => {
    // Toggle the 'isRed' state when the button is clicked
    setIsRed(!isRed);
  };

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
        className="items-center py-8 px-16"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? lighten(theme.palette.background.default, 0.4)
              : lighten(theme.palette.background.default, 0.03),
          display: "flex",
          justifyContent: "center",
        }}
      >
        {user.role.toString() === "super admin" ||
        user.role.toString() === "admin" ? (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start", // Align to the far left
              }}
            >
              <Button
                to={`/products/delete/${product.id}`}
                component={Link}
                className="px-16 min-w-96"
                color="warning"
                variant="contained"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ marginRight: "0px" }}>
                  <FuseSvgIcon className="" size={20}>
                    material-solid:delete_forever
                  </FuseSvgIcon>
                </span>
                Remove
              </Button>
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end", // Align to the far right
              }}
            >
              <Button
                to={`/products/${product.id}`}
                component={Link}
                className="px-16 min-w-96"
                color="secondary"
                variant="contained"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ marginRight: "0px" }}>
                  <FuseSvgIcon className="" size={20}>
                    feather:edit
                  </FuseSvgIcon>
                </span>
                Edit
              </Button>
            </div>
          </>
        ) : (
          <>
            <div
              className={`px-16 min-w-24 ${
                isRed ? "text-red-500" : "text-secondary"
              }`} // Change text color
              onClick={handleClick}
              style={{
                display: "flex",
                alignItems: "center", // Center vertically
                justifyContent: "center", // Center horizontally
              }}
            >
              <Link to={`/products/wishlist/add/${product.id}`}>
                {isRed ? (
                  <IoHeart size={25} color="red" />
                ) : (
                  <IoHeartOutline size={25} />
                )}
              </Link>
            </div>
            <div
              style={{
                flex: 1, // Take up remaining space
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end", // Align to the far right
              }}
            >
              <Button
                to={`add/${product.id}/${user.id}`}
                component={Link}
                className="px-16 min-w-128"
                color="secondary"
                variant="contained"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ marginRight: "8px" }}>
                  <FuseSvgIcon className="" size={20}>
                    heroicons-solid:shopping-cart
                  </FuseSvgIcon>
                </span>
                Add to cart
              </Button>
            </div>
          </>
        )}
      </CardActions>
    </Card>
  );
}

export default ProductCard;
