import FuseScrollbars from "@fuse/core/FuseScrollbars";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import withReducer from "app/store/withReducer";
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import reducer from "./store";
import { selectQuickPanelState, toggleQuickPanel } from "./store/stateSlice";
import OrderRepository from "../../../main/apps/e-commerce/repositories/OrderRepository";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { showMessage } from "app/store/fuse/messageSlice";

const StyledSwipeableDrawer = styled(SwipeableDrawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    width: 750,
  },
}));

function ShoppingCartQuickPanel(props) {
  const dispatch = useDispatch();
  const state = useSelector(selectQuickPanelState);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [orderedProducts, setOrderedProducts] = useState([]);

  useEffect(() => {
    if (user?.id.id) {
      OrderRepository.findAllOrderedProductsByUser(user.id.id).then(
        ({ data }) => setOrderedProducts(data)
      );
    }
  }, [user?.id.id]);

  const pass = (message) => {
    if (message) {
      dispatch(showMessage({ message }));
    }
  };

  const carriers = ["DHL", "Standard Shipping", "UPS", "FedEx", "USPS"];

  const handleBuyProducts = (orderedProducts) => {
    const dto = {
      orderedProductIds: orderedProducts.map((op) => op.id.id),
      totalPrice: orderedProducts?.reduce(
        (total, item) => total + item?.price * item?.quantity,
        0
      ),
      description: "",
      orderStatus: "RECEIVED",
      userId: user?.id.id,
      carrier: carriers[Math.floor(Math.random() * carriers.length)],
      eta: Math.floor(Math.random() * (21 - 7 + 1)) + 7,
    };
    console.log("dto", dto);
    OrderRepository.createOrder(dto)
      .then(({ data }) => {
        navigate(`/orders/${data.id.id}`);
        localStorage.setItem("user", JSON.stringify(data.userDTO));
        window.location.reload();
      })
      .catch((error) => {
        if (error.response && error.response.status === 500) {
          // Handle InsufficientCreditException
          pass("You do not have sufficient credit to make this purchase.");
        } else {
          // Handle other errors
          pass("An error occurred while processing your request.");
        }
      });
  };

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

                      <div
                        style={{
                          flex: 1, // Take up remaining space
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-end", // Align to the far right
                        }}
                      >
                        <Button
                          onClick={() => handleBuyProducts(orderedProducts)}
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
                          disabled={orderedProducts?.length === 0}
                        >
                          <span style={{ marginRight: "8px" }}>
                            <FuseSvgIcon className="" size={20}>
                              heroicons-solid:shopping-cart
                            </FuseSvgIcon>
                          </span>
                          Buy now
                        </Button>
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
