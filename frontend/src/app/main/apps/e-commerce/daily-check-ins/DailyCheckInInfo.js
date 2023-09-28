import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import clsx from "clsx";
import { Image } from "@mui/icons-material";
import React from "react";

function DailyCheckInInfo({ udci, className }) {
  if (!udci) {
    return null;
  }

  return (
    <div className={clsx("w-full", className)}>
      <Typography className="text-16 font-medium mb-2 truncate">
        {udci.description}
      </Typography>

      <Typography
        className="text-13"
        color="text.secondary"
        style={{ display: "flex", alignItems: "center" }}
      >
        <FuseSvgIcon>heroicons-outline:currency-euro</FuseSvgIcon>
        {udci.dailyReward}
      </Typography>
    </div>
  );
}

export default DailyCheckInInfo;
