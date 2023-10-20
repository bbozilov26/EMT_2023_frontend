import Typography from "@mui/material/Typography";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import clsx from "clsx";
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
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FuseSvgIcon>heroicons-outline:currency-euro</FuseSvgIcon>
        {udci.dailyReward}
      </Typography>
    </div>
  );
}

export default DailyCheckInInfo;
