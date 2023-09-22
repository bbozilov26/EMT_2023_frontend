import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import clsx from "clsx";
import { Image } from "@mui/icons-material";

function DailyCheckInInfo({ dci, className }) {
  return (
    <div className={clsx("w-full", className)}>
      <Typography className="text-16 font-medium mb-2 truncate">
        {dci.label}
      </Typography>

      <Typography className="text-13" color="text.secondary">
        <span>$</span>
        {dci.dailyReward}
      </Typography>
    </div>
  );
}

export default DailyCheckInInfo;
