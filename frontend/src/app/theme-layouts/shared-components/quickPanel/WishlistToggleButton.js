import IconButton from "@mui/material/IconButton";
import { useDispatch } from "react-redux";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { toggleQuickPanel } from "./store/stateSlice";

function WishlistToggleButton(props) {
  const dispatch = useDispatch();

  return (
    <>
      <IconButton
        className="w-40 h-40"
        onClick={(ev) => dispatch(toggleQuickPanel())}
        size="large"
      >
        {props.children[0]}
      </IconButton>
    </>
  );
}

WishlistToggleButton.defaultProps = {
  children: [<FuseSvgIcon>heroicons-outline:heart</FuseSvgIcon>],
};

export default WishlistToggleButton;
