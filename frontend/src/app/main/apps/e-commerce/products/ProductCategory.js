import { darken, lighten } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import { useSelector } from "react-redux";
import _ from "@lodash";
import { selectCategories } from "../../academy/store/categoriesSlice";

function ProductCategory({ slug }) {
  const categories = useSelector(selectCategories);

  const category = _.find(categories, { slug });

  return (
    <Chip
      className="font-semibold text-12"
      label={category?.title}
      size="small"
    />
  );
}

export default ProductCategory;
