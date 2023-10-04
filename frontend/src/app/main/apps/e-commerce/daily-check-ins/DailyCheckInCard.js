import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { Heart } from "react-feather";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { lighten } from "@mui/material/styles";
import React, { useState } from "react";
import DailyCheckInInfo from "./DailyCheckInInfo";
import { claimDailyCheckIn } from "../store/dailyCheckInsSlice";
import UserRepository from "../repositories/UserRepository";

function DailyCheckInCard(props) {
  const navigate = useNavigate();

  const isAdminOrSuperAdmin =
    props.user.roleDTO?.label === "ROLE_SUPER_ADMIN" ||
    props.user.roleDTO?.label === "ROLE_ADMIN";

  const currentDate = new Date();
  const startDate = new Date(props.startDate);
  const streak = props.user.streak;
  startDate.setDate(startDate.getDate() + streak);

  const isStreakDaysDifference =
    currentDate.toDateString() === startDate.toDateString();

  const canClaim = isStreakDaysDifference || props.udci.claimed;

  const handleClaimCheckIn = (checkInId) => {
    // Dispatch the claimDailyCheckIn thunk to claim a check-in
    UserRepository.claimDailyCheckIn({
      claimed: true,
      userId: props.user.id.id,
      userDailyCheckInId: checkInId,
    })
      .then(({ data }) => {
        console.log(
          `User daily check in with ID ${checkInId} claimed successfully.`
        );
        localStorage.setItem("user", JSON.stringify(data));
        window.location.reload();
      })
      .catch((error) => {
        // Handle any errors that occur during removal (optional)
        console.error(
          `Error claiming user daily check in with ID ${checkInId}:`,
          error
        );
      });
  };

  return (
    <Card className="flex flex-col max-w-xs max-h-full shadow">
      <div className="flex-grow">
        <FuseSvgIcon className="" size={20}>
          heroicons-outline:currency-euro
        </FuseSvgIcon>
      </div>

      <CardContent className="flex flex-col flex-auto p-8">
        <DailyCheckInInfo udci={props.udci} className="" />
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
          {isAdminOrSuperAdmin && (
            <Button
              component={Link}
              to={`/my-coins/${props.udci.id}`}
              className="px-16 min-w-128"
              color="secondary"
              variant="contained"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ marginRight: "0px" }}>
                <FuseSvgIcon className="" size={20}>
                  feather:edit
                </FuseSvgIcon>
              </span>
              Edit
            </Button>
          )}

          {canClaim && (
            <Button
              component={Link}
              to={`/my-coins`}
              className="px-16 min-w-128"
              color="secondary"
              variant="contained"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              disabled={props.udci.claimed}
              onClick={() => handleClaimCheckIn(props.udci.id)}
            >
              {!props.udci.claimed ? "Claim" : "Claimed!"}
            </Button>
          )}
        </div>
      </CardActions>
    </Card>
  );
}

export default DailyCheckInCard;
