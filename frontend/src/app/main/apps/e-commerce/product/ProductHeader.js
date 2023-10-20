import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import React, { useState } from "react";
import ProductRepository from "../repositories/ProductRepository";

function ProductHeader(props) {
  const dispatch = useDispatch();
  const methods = useFormContext();
  const { formState, watch, getValues, setValue } = methods;
  const { isValid, dirtyFields } = formState;
  const theme = useTheme();
  const navigate = useNavigate();

  const image = props.product?.image || watch("image");
  const name = props.product?.name || watch("name");
  const productId = props.productId;

  function handleSaveProduct() {
    const productDTO = {
      title: getValues("name"),
      description: getValues("description"),
      category: getValues("category").id,
      price: getValues("price"),
      quantity: getValues("quantity"),
      image: getValues("images")?.[0]?.url || null,
    };

    if (productId === "new") {
      // Create a new product
      ProductRepository.create(productDTO)
        .then((createdProductData) => {
          // Handle the newly created product data
          console.log("Newly created product:", createdProductData);
          navigate("/products");
        })
        .catch((error) => {
          // Handle any errors that occur during product creation
          console.error("Error creating product:", error);
        });
    } else {
      // Update an existing product
      ProductRepository.update(productId, productDTO)
        .then((updatedProductData) => {
          // Handle the updated product data
          console.log("Updated product:", updatedProductData);

          navigate("/products");
        })
        .catch((error) => {
          // Handle any errors that occur during the update
          console.error("Error updating product:", error);
        });
    }
  }

  function handleRemoveProduct(id) {
    ProductRepository.delete(id).then(() => {
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
            {image && image?.length > 0 ? (
              <img
                className="w-32 sm:w-48 rounded"
                src={`data:image/jpeg;base64,${image}`}
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
            onClick={() => handleRemoveProduct(props.productId)}
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
          // disabled={props.saveButton.disabled}
          onClick={handleSaveProduct}
        >
          Save
        </Button>
      </motion.div>
    </div>
  );
}

export default ProductHeader;
