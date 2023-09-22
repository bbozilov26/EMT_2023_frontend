import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

const Root = styled("div")(({ theme }) => ({
  "& > .logo-icon": {
    transition: theme.transitions.create(["width", "height"], {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
  "& > .badge": {
    transition: theme.transitions.create("opacity", {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
}));

function Logo() {
  return (
    <Root className="flex items-center">
      <Link to="/products" className="flex items-center">
        <img
          className="logo-icon w-64 h-64"
          src="assets/images/logo/logo.svg"
          alt="logo"
        />
      </Link>
      <div className="ml-8">
        <span className="text-48">
          <i>EMT</i>
        </span>
      </div>
    </Root>
  );
}

export default Logo;
