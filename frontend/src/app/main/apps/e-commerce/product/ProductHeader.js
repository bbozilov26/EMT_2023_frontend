import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import _ from "@lodash";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import {
  createProduct,
  removeProduct,
  updateProduct,
} from "../store/productSlice";

function ProductHeader(props) {
  const dispatch = useDispatch();
  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields } = formState;
  const featuredImageId = watch("featuredImageId");
  const images = watch("images");
  const name = watch("name");
  const theme = useTheme();
  const navigate = useNavigate();

  function handleSaveProduct() {
    const productId = props.productId;

    const productDTO = {
      title: getValues("name"),
      description: getValues("description"),
      category: getValues("category").id,
      price: getValues("price"),
      quantity: getValues("quantity"),
      image: getValues("images").find(
        (image) => image.id === getValues("featuredImageId")
      ),
    };

    if (productId === "new") {
      // Create a new product
      dispatch(createProduct({ productDTO: productDTO }))
        .unwrap()
        .then((createdProductData) => {
          // Handle the newly created product data
          console.log("Newly created product:", createdProductData);
        })
        .catch((error) => {
          // Handle any errors that occur during product creation
          console.error("Error creating product:", error);
        });
    } else {
      // Update an existing product
      dispatch(updateProduct({ id: productId, productDTO: productDTO }))
        .unwrap()
        .then((updatedProductData) => {
          // Handle the updated product data
          console.log("Updated product:", updatedProductData);
        })
        .catch((error) => {
          // Handle any errors that occur during the update
          console.error("Error updating product:", error);
        });
    }
  }

  function handleRemoveProduct() {
    dispatch(removeProduct()).then(() => {
      navigate("/products");
    });
  }

  return (
    <div className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-32 px-24 md:px-32">
      <div className="flex flex-col items-center sm:items-start space-y-8 sm:space-y-0 w-full sm:max-w-full min-w-0">
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
        >
          <Typography
            className="flex items-center sm:mb-12"
            component={Link}
            role="button"
            to="/products"
            color="inherit"
          >
            <FuseSvgIcon size={20}>
              {theme.direction === "ltr"
                ? "heroicons-outline:arrow-sm-left"
                : "heroicons-outline:arrow-sm-right"}
            </FuseSvgIcon>
            <span className="flex mx-4 font-medium">Products</span>
          </Typography>
        </motion.div>

        <div className="flex items-center max-w-full">
          <motion.div
            className="hidden sm:flex"
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { delay: 0.3 } }}
          >
            {images.length > 0 && featuredImageId ? (
              <img
                className="w-32 sm:w-48 rounded"
                src={_.find(images, { id: featuredImageId }).url}
                alt={name}
              />
            ) : (
              <img
                className="w-32 sm:w-48 rounded"
                src="assets/images/apps/ecommerce/product-image-placeholder.png"
                alt={name}
              />
            )}
          </motion.div>
          <motion.div
            className="flex flex-col items-center sm:items-start min-w-0 mx-8 sm:mx-16"
            initial={{ x: -20 }}
            animate={{ x: 0, transition: { delay: 0.3 } }}
          >
            <Typography className="text-16 sm:text-20 truncate font-semibold">
              {name || "New Product"}
            </Typography>
            <Typography variant="caption" className="font-medium">
              Product Detail
            </Typography>
          </motion.div>
        </div>
      </div>
      <motion.div
        className="flex"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
      >
        {props.productId !== "new" ? (
          <Button
            className="whitespace-nowrap mx-4"
            variant="contained"
            color="secondary"
            onClick={handleRemoveProduct}
            startIcon={
              <FuseSvgIcon className="hidden sm:flex">
                heroicons-outline:trash
              </FuseSvgIcon>
            }
          >
            Remove
          </Button>
        ) : null}

        <Button
          className="whitespace-nowrap mx-4"
          variant="contained"
          color="secondary"
          disabled={_.isEmpty(dirtyFields) || !isValid}
          onClick={handleSaveProduct}
        >
          Save
        </Button>
      </motion.div>
    </div>
  );
}

export default ProductHeader;
