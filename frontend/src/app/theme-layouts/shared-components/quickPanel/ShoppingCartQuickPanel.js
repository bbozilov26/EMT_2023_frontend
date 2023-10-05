import FuseScrollbars from "@fuse/core/FuseScrollbars";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import withReducer from "app/store/withReducer";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectQuickPanelData } from "./store/dataSlice";
import reducer from "./store";
import { selectQuickPanelState, toggleQuickPanel } from "./store/stateSlice";
import OrderRepository from "../../../main/apps/e-commerce/repositories/OrderRepository";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";

const StyledSwipeableDrawer = styled(SwipeableDrawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    width: 750,
  },
}));

function ShoppingCartQuickPanel(props) {
  const dispatch = useDispatch();
  const state = useSelector(selectQuickPanelState);
  const user = JSON.parse(localStorage.getItem("user"));

  const [orderedProducts, setOrderedProducts] = useState([]);

  useEffect(() => {
    if (user.id.id) {
      OrderRepository.findAllOrderedProductsByUser(user.id.id).then(
        ({ data }) => setOrderedProducts(data)
      );
    }
  }, [user?.id.id]);

  return (
    <StyledSwipeableDrawer
      open={state}
      anchor="right"
      onOpen={(ev) => {}}
      onClose={(ev) => dispatch(toggleQuickPanel())}
      disableSwipeToOpen
    >
      <div style={{ maxHeight: "100%", overflowY: "auto" }}>
        <FuseScrollbars>
          <List>
            <ListSubheader
              component="div"
              style={{ fontSize: "24px", marginTop: "25px" }}
            >
              Shopping Cart
            </ListSubheader>

            {(orderedProducts && orderedProducts.length === 0) ||
            orderedProducts === undefined ? (
              <div
                className="empty-cart-message"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <p style={{ fontSize: "18px", marginTop: "350px" }}>
                  Your shopping cart is empty!
                </p>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {orderedProducts?.map((item) => (
                    <div key={item?.id.id} className="cart-item">
                      <img
                        className="w-256 sm:w-384 rounded"
                        src={`data:image/jpeg;base64,${item?.image}`}
                        alt={item?.title}
                      />
                      <div className="item-details">
                        <h3>{item?.title}</h3>
                        <p style={{ display: "flex", alignItems: "center" }}>
                          Price:{" "}
                          <FuseSvgIcon>
                            heroicons-outline:currency-euro
                          </FuseSvgIcon>
                          {item?.price}
                        </p>
                        <label>Quantity:</label>
                        <input
                          type="number"
                          value={item?.quantity}
                          onChange={(e) =>
                            item.quantity > parseInt(e.target.value, 10)
                              ? OrderRepository.removeFromCart(
                                  item?.id.id,
                                  user?.id.id
                                ).then(() => window.location.reload())
                              : OrderRepository.addToCart(
                                  item?.productDTO?.id.id,
                                  user?.id.id
                                ).then(() => window.location.reload())
                          }
                        />
                        <p style={{ display: "flex", alignItems: "center" }}>
                          Total Price:{" "}
                          <FuseSvgIcon>
                            heroicons-outline:currency-euro
                          </FuseSvgIcon>
                          {item?.price * item?.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Divider />

                <ListSubheader
                  component="div"
                  style={{
                    fontSize: "24px",
                    marginTop: "400px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Total:
                  {orderedProducts && orderedProducts.length > 0 && (
                    <>
                      <div className="divider"></div>

                      <div className="total-section">
                        <div
                          className="total-amount"
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <FuseSvgIcon>
                            heroicons-outline:currency-euro
                          </FuseSvgIcon>
                          {orderedProducts?.reduce(
                            (total, item) =>
                              total + item?.price * item?.quantity,
                            0
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </ListSubheader>
              </>
            )}
          </List>
        </FuseScrollbars>
      </div>
    </StyledSwipeableDrawer>
  );
}

export default withReducer("quickPanel", reducer)(memo(ShoppingCartQuickPanel));
