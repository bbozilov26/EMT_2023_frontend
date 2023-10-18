import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
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
import OrderRepository from "../repositories/OrderRepository";

function ProductCard(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isRed, setIsRed] = useState(false);

  const handleClick = () => {
    // Toggle the 'isRed' state when the button is clicked
    setIsRed(!isRed);
  };

  const handleDeleteProduct = (productId) => {
    ProductRepository.delete(productId)
      .then(() => {
        // Handle successful removal (optional)
        console.log(`Product with ID ${productId} removed successfully.`);

        navigate("/products");
      })
      .catch((error) => {
        // Handle any errors that occur during removal (optional)
        console.error(`Error removing product with ID ${productId}:`, error);
      });
  };

  const handleAddProductToCart = (productId) => {
    OrderRepository.addToCart(productId, props.user.id.id).then(() =>
      window.location.reload()
    );
  };

  return (
    <Card className="flex flex-col max-w-xs max-h-full shadow">
      <div className="flex-grow">
        {props.product.image && props.product.image?.length > 0 ? (
          <img
            className="w-full h-full object-cover"
            src={`data:image/jpeg;base64,${props.product.image}`}
            alt={props.product.name}
          />
        ) : (
          <img
            className="w-full h-full object-cover"
            src="assets/images/apps/ecommerce/product-image-placeholder.png"
            alt={props.product.name}
          />
        )}
      </div>

      <CardContent className="flex flex-col flex-auto p-8">
        <ProductInfo product={props.product} className="" />
      </CardContent>
      {props.user.roleDTO?.label && (
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
          {props.user.roleDTO?.label === "ROLE_SUPER_ADMIN" ||
          props.user.roleDTO?.label === "ROLE_ADMIN" ? (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start", // Align to the far left
                }}
              >
                <Button
                  onClick={() => handleDeleteProduct(props.product.id)}
                  component={Link}
                  to={`/products/delete/${props.product.id}`}
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
                  component={Link}
                  to={`/products/${props.product.id}`}
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
            props.user.roleDTO?.label === "ROLE_CUSTOMER" && (
              <>
                <div
                  style={{
                    flex: 1, // Take up remaining space
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end", // Align to the far right
                  }}
                >
                  <Button
                    onClick={() => handleAddProductToCart(props.product.id)}
                    // to={`/add/${props.product.id}/${props.user.id}`}
                    // component={Link}
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
            )
          )}
        </CardActions>
      )}
    </Card>
  );
}

export default ProductCard;
