import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { selectUser } from "app/store/userSlice";
import { useTranslation } from "react-i18next";

function UserMenu(props) {
  const user = JSON.parse(localStorage.getItem("user"));

  const [userMenu, setUserMenu] = useState(null);

  const { t } = useTranslation("app");

  const userMenuClick = (event) => {
    setUserMenu(event.currentTarget);
  };

  const userMenuClose = () => {
    setUserMenu(null);
  };

  return (
    <>
      <Button
        className="min-h-40 min-w-40 px-0 md:px-16 py-0 md:py-6"
        onClick={userMenuClick}
        color="inherit"
      >
        <div className="hidden md:flex flex-col mx-4 items-end">
          <Typography component="span" className="font-semibold flex">
            {user?.personDTO
              ? `${user?.personDTO?.firstName} ${user?.personDTO?.lastName}`
              : t("GUEST")}
          </Typography>
          <Typography
            className="text-11 font-medium capitalize"
            color="text.secondary"
          >
            {user?.roleDTO?.role.toString()}
            {!user?.roleDTO?.role && t("GUEST")}
          </Typography>
        </div>

        {user?.photoURL ? (
          <Avatar
            className="md:mx-4"
            alt="user photo"
            src={user?.data?.photoURL}
          />
        ) : (
          <Avatar className="md:mx-4">{user?.data?.displayName?.[0]}</Avatar>
        )}
      </Button>

      <Popover
        open={Boolean(userMenu)}
        anchorEl={userMenu}
        onClose={userMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        classes={{
          paper: "py-8",
        }}
      >
        {!user?.roleDTO ? (
          <>
            <MenuItem component={Link} to="/sign-in" role="button">
              <ListItemIcon className="min-w-40">
                <FuseSvgIcon>heroicons-outline:lock-closed</FuseSvgIcon>
              </ListItemIcon>
              <ListItemText primary={t("SIGN_IN")} />
            </MenuItem>
            <MenuItem component={Link} to="/sign-up" role="button">
              <ListItemIcon className="min-w-40">
                <FuseSvgIcon>heroicons-outline:user-add </FuseSvgIcon>
              </ListItemIcon>
              <ListItemText primary={t("SIGN_UP")} />
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem
              component={Link}
              to="/profile"
              onClick={userMenuClose}
              role="button"
            >
              <ListItemIcon className="min-w-40">
                <FuseSvgIcon>heroicons-outline:user-circle</FuseSvgIcon>
              </ListItemIcon>
              <ListItemText primary={t("MY_PROFILE")} />
            </MenuItem>
            {user?.roleDTO?.label === "ROLE_CUSTOMER" ? (
              <MenuItem
                component={Link}
                to="/orders"
                onClick={userMenuClose}
                role="button"
              >
                <ListItemIcon className="min-w-40">
                  <FuseSvgIcon>heroicons-outline:shopping-bag</FuseSvgIcon>
                </ListItemIcon>
                <ListItemText primary={t("MY_ORDERS")} />
              </MenuItem>
            ) : (
              <MenuItem
                component={Link}
                to="/orders"
                onClick={userMenuClose}
                role="button"
              >
                <ListItemIcon className="min-w-40">
                  <FuseSvgIcon>heroicons-outline:shopping-bag</FuseSvgIcon>
                </ListItemIcon>
                <ListItemText primary={t("ALL_ORDERS")} />
              </MenuItem>
            )}
            <MenuItem
              component={Link}
              to="/my-coins"
              onClick={userMenuClose}
              role="button"
            >
              <ListItemIcon className="min-w-40">
                <FuseSvgIcon>heroicons-outline:currency-euro</FuseSvgIcon>
              </ListItemIcon>
              <ListItemText primary={t("MY_COINS")} />
            </MenuItem>
            {/*<MenuItem*/}
            {/*  component={Link}*/}
            {/*  to="/apps/wishlist"*/}
            {/*  onClick={userMenuClose}*/}
            {/*  role="button"*/}
            {/*>*/}
            {/*  <ListItemIcon className="min-w-40">*/}
            {/*    <FuseSvgIcon>heroicons-outline:heart</FuseSvgIcon>*/}
            {/*  </ListItemIcon>*/}
            {/*  <ListItemText primary="Wish List" />*/}
            {/*</MenuItem>*/}
            <MenuItem
              component={NavLink}
              to="/sign-out"
              onClick={() => {
                userMenuClose();
              }}
            >
              <ListItemIcon className="min-w-40">
                <FuseSvgIcon>heroicons-outline:logout</FuseSvgIcon>
              </ListItemIcon>
              <ListItemText primary={t("SIGN_OUT")} />
            </MenuItem>
          </>
        )}
      </Popover>
    </>
  );
}

export default UserMenu;
