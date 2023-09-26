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
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "app/store/userSlice";
import React, { useState } from "react";
import { removeProduct } from "../store/productSlice";
import ProductRepository from "../repositories/ProductRepository";
import {
  showErrorMessage,
  showSuccessMessage,
} from "app/store/fuse/messageSlice";

function ProductCard({ product }) {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [isRed, setIsRed] = useState(false);

  const handleClick = () => {
    // Toggle the 'isRed' state when the button is clicked
    setIsRed(!isRed);
  };

  const handleDeleteProduct = (productId) => {
    dispatch(removeProduct({ id: productId }))
      .unwrap()
      .then(() => {
        // Handle successful removal (optional)
        console.log(`Product with ID ${productId} removed successfully.`);
      })
      .catch((error) => {
        // Handle any errors that occur during removal (optional)
        console.error(`Error removing product with ID ${productId}:`, error);
      });
  };

  return (
    <Card className="flex flex-col max-w-xs max-h-full shadow">
      <div className="flex-grow">
        {product.image && product.image?.length > 0 ? (
          <img
            className="w-full h-full object-cover"
            src={`data:image/jpeg;base64,${product.image}`}
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
                onClick={() => handleDeleteProduct(product.id)}
                component={Link}
                to={`/products/delete/${product.id}`}
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
            {/*<div*/}
            {/*  className={`px-16 min-w-24 ${*/}
            {/*    isRed ? "text-red-500" : "text-secondary"*/}
            {/*  }`} // Change text color*/}
            {/*  onClick={handleClick}*/}
            {/*  style={{*/}
            {/*    display: "flex",*/}
            {/*    alignItems: "center", // Center vertically*/}
            {/*    justifyContent: "center", // Center horizontally*/}
            {/*  }}*/}
            {/*>*/}
            {/*  <Link to={`/products/wishlist/add/${product.id}`}>*/}
            {/*    {isRed ? (*/}
            {/*      <IoHeart size={25} color="red" />*/}
            {/*    ) : (*/}
            {/*      <IoHeartOutline size={25} />*/}
            {/*    )}*/}
            {/*  </Link>*/}
            {/*</div>*/}
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
