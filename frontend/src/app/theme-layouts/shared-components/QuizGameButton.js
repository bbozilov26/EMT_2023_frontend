import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import IconButton from "@mui/material/IconButton";
import Icon from "@mdi/react";
import { mdiController } from "@mdi/js";

function QuizGameButton() {
  return (
    <IconButton
      component={Link}
      to="/quiz"
      role="button"
      className="w-40 h-40"
      size="large"
    >
      <FuseSvgIcon>heroicons-outline:puzzle</FuseSvgIcon>
    </IconButton>
  );
}

export default QuizGameButton;
