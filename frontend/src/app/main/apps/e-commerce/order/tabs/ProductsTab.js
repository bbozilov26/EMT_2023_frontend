import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectOrder } from "../../store/orderSlice";

function ProductsTab(props) {
  const order = props.order;
  const isCustomer = props.isCustomer;

  return (
    <div className="table-responsive">
      <table className="simple">
        <thead>
          <tr>
            <th>
              <Typography className="font-semibold">Image</Typography>
            </th>
            <th>
              <Typography className="font-semibold">Name</Typography>
            </th>
            <th>
              <Typography className="font-semibold">Price</Typography>
            </th>
            <th>
              <Typography className="font-semibold">Quantity</Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          {order?.orderedProducts?.map((product) => (
            <tr key={product.id.id}>
              <td className="w-240">
                <img
                  className="w-full h-full object-cover"
                  src={`data:image/jpeg;base64,${product.image}`}
                  alt="product"
                />
              </td>
              <td>
                <Typography
                  component={Link}
                  to={`/products/${product.id.id}`}
                  className="truncate"
                  style={{
                    color: "inherit",
                    textDecoration: "underline",
                  }}
                >
                  {product.title}
                </Typography>
              </td>
              <td className="w-64 text-right">
                <span className="truncate">${product.price}</span>
              </td>
              <td className="w-64 text-right">
                <span className="truncate">{product.quantity}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsTab;
