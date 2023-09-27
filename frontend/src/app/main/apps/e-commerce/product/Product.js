import FuseLoading from "@fuse/core/FuseLoading";
import FusePageCarded from "@fuse/core/FusePageCarded";
import { useDeepCompareEffect } from "@fuse/hooks";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import withReducer from "app/store/withReducer";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import _ from "@lodash";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import {
  getProduct,
  newProduct,
  resetProduct,
  selectProduct,
} from "../store/productSlice";
import reducer from "../store";
import ProductHeader from "./ProductHeader";
import BasicInfoTab from "./tabs/BasicInfoTab";
import ProductRepository from "../repositories/ProductRepository";
import { useTranslation } from "react-i18next";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  name: yup
    .string()
    .required("You must enter a product name")
    .min(5, "The product name must be at least 5 characters"),
});

function Product(props) {
  const dispatch = useDispatch();
  // const product = useSelector(selectProduct);
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const routeParams = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [product, setProduct] = useState();
  const [noProduct, setNoProduct] = useState(false);
  const methods = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const { reset, watch, control, onChange, formState } = methods;
  const form = watch();
  const { productId } = useParams();
  const { t } = useTranslation("app");
  const categories = [
    {
      id: "BOOKS",
      name: "BOOKS",
      label: t("BOOKS"),
    },
    {
      id: "MOVIES",
      name: "MOVIES",
      label: t("MOVIES"),
    },
    {
      id: "MUSIC",
      name: "MUSIC",
      label: t("MUSIC"),
    },
    {
      id: "PC_AND_EQUIPMENT",
      name: "PC_AND_EQUIPMENT",
      label: t("PC_AND_EQUIPMENT"),
    },
    {
      id: "ACCESSORIES",
      name: "ACCESSORIES",
      label: t("ACCESSORIES"),
    },
    {
      id: "MOBILE_PHONES",
      name: "MOBILE_PHONES",
      label: t("MOBILE_PHONES"),
    },
  ];

  useEffect(() => {
    function updateProductState() {
      if (productId === "new") {
        setProduct({
          name: "",
          description: "",
          category: "",
          image: null,
          price: "",
          quantity: "",
        });
        // setProduct(getProductFormElements(t, null));
      } else {
        /**
         * Get Product data
         */
        ProductRepository.findById(productId).then(({ data }) => {
          /**
           * If the requested product is not exist show message
           */
          if (!data) {
            setNoProduct(true);
            setNoProduct(false);
          } else {
            setProduct({
              id: data.id.id,
              image: data.image,
              name: data.title,
              description: data.description,
              quantity: data.quantity,
              price: data.price,
              category: categories.find((c) => c.id === data.category),
            });
            // setProductFormElements(getProductFormElements(t, product));
          }
        });
      }
    }

    updateProductState();
  }, [productId]);

  useEffect(() => {
    if (!product) {
      return;
    }
    /**
     * Reset the form on product state changes
     */
    reset(product);
  }, [product, reset]);

  useEffect(() => {
    return () => {
      /**
       * Reset Product on component unload
       */
      dispatch(resetProduct());
      setNoProduct(false);
    };
  }, [dispatch]);

  /**
   * Tab Change
   */
  function handleTabChange(event, value) {
    setTabValue(value);
  }

  /**
   * Show Message if the requested products is not exists
   */
  if (noProduct) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There is no such product!
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/products"
          color="inherit"
        >
          Go to Products Page
        </Button>
      </motion.div>
    );
  }

  /**
   * Wait while product data is loading and form is set
   */
  if (
    _.isEmpty(form) ||
    (product &&
      routeParams.productId !== product.id &&
      routeParams.productId !== "new")
  ) {
    return <FuseLoading />;
  }

  return (
    <FormProvider {...methods}>
      <FusePageCarded
        header={
          <ProductHeader
            productId={routeParams.productId}
            product={product}
            // saveButton={{
            //   disable: invalidForm,
            // }}
          />
        }
        content={
          <>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor="secondary"
              textColor="secondary"
              variant="scrollable"
              scrollButtons="auto"
              classes={{ root: "w-full h-64 border-b-1" }}
            >
              <Tab className="h-64" label="Basic Info" />
            </Tabs>
            <div className="p-16 sm:p-24 max-w-3xl">
              <div className={tabValue !== 0 ? "hidden" : ""}>
                <BasicInfoTab product={product} />
              </div>
            </div>
          </>
        }
        scroll={"page"}
      />
    </FormProvider>
  );
}

export default Product;
