import Typography from "@mui/material/Typography";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import clsx from "clsx";
import React from "react";
import { useTranslation } from "react-i18next";

function DailyCheckInInfo({ udci, className }) {
  const { t } = useTranslation("app");

  if (!udci) {
    return null;
  }

  return (
    <div className={clsx("w-full", className)}>
      <Typography
        className="text-16 font-medium mb-2 truncate"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {t(udci.label)}
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
