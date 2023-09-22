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
import { selectUser } from "app/store/userSlice";
import { fetchCartItems } from "app/theme-layouts/shared-components/quickPanel/store/shoppingCartSlice";

const StyledSwipeableDrawer = styled(SwipeableDrawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    width: 750,
  },
}));

function ShoppingCartQuickPanel(props) {
  const dispatch = useDispatch();
  const data = useSelector(selectQuickPanelData);
  const state = useSelector(selectQuickPanelState);
  const user = useSelector(selectUser);

  const handleQuantityChange = (itemId, newQuantity) => {
    // Convert newQuantity to a number (assuming it's a string)
    newQuantity = parseInt(newQuantity, 10);

    // Dispatch an action to update the quantity in the Redux store
    dispatch(updateCartItemQuantity(itemId, newQuantity));
  };

  useEffect(() => {
    dispatch(fetchCartItems(user.id));
  }, [dispatch]);

  const cartItems = useSelector((state) => state.cart?.cartItems);

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

            {(cartItems && cartItems.length === 0) ||
            cartItems === undefined ? (
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
                  {cartItems?.map((item) => (
                    <div key={item?.id} className="cart-item">
                      <img src={item?.image} alt={item?.name} />
                      <div className="item-details">
                        <h3>{item?.name}</h3>
                        <p>Price: ${item?.price}</p>
                        <label>Quantity:</label>
                        <input
                          type="number"
                          value={item?.quantity}
                          onChange={(e) =>
                            handleQuantityChange(item?.id, e.target.value)
                          }
                        />
                        <p>Total Price: ${item?.price * item?.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Divider />

                <ListSubheader
                  component="div"
                  style={{ fontSize: "24px", marginTop: "400px" }}
                >
                  Total:
                </ListSubheader>
                {cartItems && cartItems.length > 0 && (
                  <>
                    <div className="divider"></div>

                    <div className="total-section">
                      <div className="total-label">Total:</div>
                      <div className="total-amount">
                        $
                        {cartItems?.reduce(
                          (total, item) => total + item?.price * item?.quantity,
                          0
                        )}
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </List>
        </FuseScrollbars>
      </div>
    </StyledSwipeableDrawer>
  );
}

export default withReducer("quickPanel", reducer)(memo(ShoppingCartQuickPanel));
