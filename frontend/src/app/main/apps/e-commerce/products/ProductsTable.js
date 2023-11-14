import _ from "@lodash";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import withRouter from "@fuse/core/withRouter";
import FuseLoading from "@fuse/core/FuseLoading";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import {
  selectProductsSearchText,
  setProductsSearchText,
} from "../store/productsSlice";
import ProductCard from "./ProductCard";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Input from "@mui/material/Input";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { selectUser } from "app/store/userSlice";
import ProductRepository from "../repositories/ProductRepository";

function ProductsTable(props) {
  const dispatch = useDispatch();
  const searchText = useSelector(selectProductsSearchText);
  const user = useSelector(selectUser);

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [data, setData] = useState(products);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({
    direction: "asc",
    id: null,
  });
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { t } = useTranslation("app");

  const container = {
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    show: {
      opacity: 1,
      y: 0,
    },
  };

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
      id: "NFT",
      name: "NFT",
      label: t("NFT"),
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
    ProductRepository.findAll().then(({ data }) => {
      const productsData = data.map((el) => ({
        id: el.id.id,
        image: el.image,
        name: el.title,
        description: el.description,
        quantity: el.quantity,
        price: el.price,
        category: el.category,
      }));

      setProducts(productsData);
    });
    setLoading(false);
  }, []);

  useEffect(() => {
    if (searchText.length !== 0 && selectedCategory !== "all") {
      setData(
        _.filter(
          products,
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) &&
            item.category === selectedCategory
        )
      );
      setPage(0);
    } else if (searchText.length === 0 && selectedCategory !== "all") {
      setData(_.filter(products, (item) => item.category === selectedCategory));
      setPage(0);
    } else {
      setData(products);
    }
  }, [products, searchText, selectedCategory]);

  function handleRequestSort(event, property) {
    const id = property;
    let direction = "desc";

    if (order.id === property && order.direction === "desc") {
      direction = "asc";
    }

    setOrder({
      direction,
      id,
    });
  }

  function handleClick(item) {
    props.navigate(`/products/${item.id}/${item.handle}`);
  }

  function handleChangePage(event, value) {
    setPage(value);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  function handleSelectedCategory(event) {
    setSelectedCategory(event.target.value);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <FuseLoading />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col flex-1 w-full mx-auto px-24 pt-24 sm:p-40">
        <div className="flex flex-col w-full sm:w-auto sm:flex-row space-y-16 sm:space-y-0 flex-1 items-center justify-between">
          <div className="flex space-x-8">
            <FormControl className="flex w-full sm:w-136" variant="outlined">
              <InputLabel id="category-select-label">Category</InputLabel>
              <Select
                labelId="category-select-label"
                id="category-select"
                label="Category"
                value={selectedCategory}
                onChange={handleSelectedCategory}
              >
                <MenuItem value="all">
                  <em> All </em>
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem value={category.name} key={category.id}>
                    {category.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Paper
              component={motion.div}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
              className="flex items-center w-full sm:max-w-256 space-x-8 px-16 rounded-full border-1 shadow-0"
            >
              <FuseSvgIcon color="disabled">heroicons-solid:search</FuseSvgIcon>
              <Input
                placeholder="Search products"
                className="flex flex-1"
                disableUnderline
                fullWidth
                value={searchText}
                inputProps={{
                  "aria-label": "Search",
                }}
                onChange={(ev) => dispatch(setProductsSearchText(ev))}
              />
            </Paper>
          </div>

          {user.roleDTO?.label === "ROLE_SUPER_ADMIN" ||
          user.roleDTO?.label === "ROLE_ADMIN" ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
            >
              <Button
                className=""
                component={Link}
                to="/products/new"
                variant="contained"
                color="secondary"
                startIcon={<FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>}
              >
                Add
              </Button>
            </motion.div>
          ) : null}
        </div>

        <div className="mt-128"></div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.1 } }}
          className="flex flex-1 items-center justify-center h-full"
        >
          <Typography color="text.secondary" variant="h5">
            There are no products!
          </Typography>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 w-full mx-auto px-24 pt-24 sm:p-40">
      <div className="flex flex-col w-full sm:w-auto sm:flex-row space-y-16 sm:space-y-0 flex-1 items-center justify-between">
        <div className="flex space-x-8">
          <FormControl className="flex w-full sm:w-136" variant="outlined">
            <InputLabel id="category-select-label">{t("CATEGORY")}</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              label="Category"
              value={selectedCategory}
              onChange={handleSelectedCategory}
            >
              <MenuItem value="all">
                <em>{t("ALL")}</em>
              </MenuItem>
              {categories.map((category) => (
                <MenuItem value={category.name} key={category.id}>
                  {category.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Paper
            component={motion.div}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
            className="flex items-center w-full sm:max-w-256 space-x-8 px-16 rounded-full border-1 shadow-0"
          >
            <FuseSvgIcon color="disabled">heroicons-solid:search</FuseSvgIcon>
            <Input
              placeholder={t("SEARCH_PRODUCTS")}
              className="flex flex-1"
              disableUnderline
              fullWidth
              value={searchText}
              inputProps={{
                "aria-label": "Search",
              }}
              onChange={(ev) => dispatch(setProductsSearchText(ev))}
            />
          </Paper>
        </div>

        {user.roleDTO?.label === "ROLE_SUPER_ADMIN" ||
        user.roleDTO?.label === "ROLE_ADMIN" ? (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
          >
            <Button
              className=""
              component={Link}
              to="/products/new"
              variant="contained"
              color="secondary"
              startIcon={<FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>}
            >
              {t("ADD")}
            </Button>
          </motion.div>
        ) : null}
      </div>

      <motion.div
        className="flex grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8 lg:gap-16 mt-32 sm:mt-40"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {data.map((product) => {
          return (
            <motion.div variants={item} key={product.id}>
              <ProductCard product={product} user={user} />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

export default withRouter(ProductsTable);
