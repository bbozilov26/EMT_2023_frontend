import Button from "@mui/material/Button";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Popover from "@mui/material/Popover";
import { useState } from "react";
import { Link } from "react-router-dom";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";

function HelpCenterMenu(props) {
  const [helpCenterMenu, setHelpCenterMenu] = useState(null);

  const helpCenterMenuClick = (event) => {
    setHelpCenterMenu(event.currentTarget);
  };

  const helpCenterMenuClose = () => {
    setHelpCenterMenu(null);
  };

  return (
    <>
      <Button
        className="min-h-40 min-w-40 px-0 md:px-16 py-0 md:py-6"
        onClick={helpCenterMenuClick}
        color="inherit"
      >
        Help
      </Button>

      <Popover
        open={Boolean(helpCenterMenu)}
        anchorEl={helpCenterMenu}
        onClose={helpCenterMenuClose}
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
        <>
          <MenuItem
            component={Link}
            to="/apps/help-center"
            onClick={helpCenterMenuClose}
            role="button"
          >
            {/*<ListItemIcon className="min-w-40">*/}
            {/*  <FuseSvgIcon>heroicons-outline:lifebuoy</FuseSvgIcon>*/}
            {/*</ListItemIcon>*/}
            <ListItemText primary="Home" />
          </MenuItem>

          <MenuItem
            component={Link}
            to="/apps/help-center/faqs"
            onClick={helpCenterMenuClose}
            role="button"
          >
            {/*<ListItemIcon className="min-w-40">*/}
            {/*  <FuseSvgIcon>heroicons-outline:question-mark-circle</FuseSvgIcon>*/}
            {/*</ListItemIcon>*/}
            <ListItemText primary="FAQs" />
          </MenuItem>

          <MenuItem
            component={Link}
            to="/apps/help-center/guides"
            onClick={helpCenterMenuClose}
            role="button"
          >
            {/*<ListItemIcon className="min-w-40">*/}
            {/*  <FuseSvgIcon>heroicons-outline:currency-euro</FuseSvgIcon>*/}
            {/*</ListItemIcon>*/}
            <ListItemText primary="Guides" />
          </MenuItem>

          <MenuItem
            component={Link}
            to="/apps/help-center/support"
            onClick={helpCenterMenuClose}
            role="button"
          >
            {/*<ListItemIcon className="min-w-40">*/}
            {/*  <FuseSvgIcon>heroicons-outline:heart</FuseSvgIcon>*/}
            {/*</ListItemIcon>*/}
            <ListItemText primary="Support" />
          </MenuItem>
        </>
      </Popover>
    </>
  );
}

export default HelpCenterMenu;
