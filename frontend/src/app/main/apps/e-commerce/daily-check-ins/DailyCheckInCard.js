import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Heart } from "react-feather";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { lighten } from "@mui/material/styles";
import React, { useState } from "react";
import DailyCheckInInfo from "./DailyCheckInInfo";
import { claimDailyCheckIn } from "../store/dailyCheckInsSlice";

function DailyCheckInCard(props) {
  const handleClaimCheckIn = (checkInId) => {
    // Dispatch the claimDailyCheckIn thunk to claim a check-in
    dispatch(
      claimDailyCheckIn({
        claimed: true,
        userId: props.user.id,
        dailyCheckInId: checkInId,
      })
    );
  };

  return (
    <Card className="flex flex-col max-w-xs max-h-full shadow">
      <div className="flex-grow">
        <FuseSvgIcon className="" size={20}>
          heroicons-outline:currency-euro
        </FuseSvgIcon>
      </div>

      <CardContent className="flex flex-col flex-auto p-8">
        <DailyCheckInInfo dci={props.dci} className="" />
      </CardContent>
      <CardActions
        className="items-center py-8 px-16"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? lighten(theme.palette.background.default, 0.4)
              : lighten(theme.palette.background.default, 0.03),
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            // flex: 1, // Take up remaining space
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-center",
          }}
        >
          <Button
            component={Link}
            className="px-16 min-w-128"
            color="secondary"
            variant="contained"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            disabled={props.dci.claimed}
            onClick={handleClaimCheckIn(props.dci.id)}
          >
            Claim
          </Button>
        </div>
      </CardActions>
    </Card>
  );
}

export default DailyCheckInCard;
