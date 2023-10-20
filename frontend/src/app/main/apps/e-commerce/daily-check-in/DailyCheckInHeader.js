import { useDispatch } from "react-redux";
import { useFormContext } from "react-hook-form";
import { useTheme } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import DailyCheckInRepository from "../repositories/DailyCheckInRepository";
import { motion } from "framer-motion";
import Typography from "@mui/material/Typography";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import Button from "@mui/material/Button";
import React from "react";

function DailyCheckInHeader(props) {
  const dispatch = useDispatch();
  const methods = useFormContext();
  const { formState, watch, getValues, setValue } = methods;
  const { isValid, dirtyFields } = formState;
  const theme = useTheme();
  const navigate = useNavigate();

  const descriptionName =
    props.dailyCheckIn?.description || watch("description");
  const dailyCheckInId = props.dailyCheckInId;

  function handleSaveProduct() {
    const dailyCheckInDTO = {
      description: getValues("description"),
      dailyReward: getValues("dailyReward"),
      label: getValues("label"),
    };

    DailyCheckInRepository.update(dailyCheckInId, dailyCheckInDTO)
      .then((updatedDailyCheckInData) => {
        // Handle the updated product data
        console.log("Updated daily check in:", updatedDailyCheckInData);

        navigate("/my-coins");
      })
      .catch((error) => {
        // Handle any errors that occur during the update
        console.error("Error updating daily check in:", error);
      });
  }

  return (
    <div className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-32 px-24 md:px-32">
      <div className="flex flex-col items-center sm:items-start space-y-8 sm:space-y-0 w-full sm:max-w-full min-w-0">
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
        >
          <Typography
            className="flex items-center sm:mb-12"
            component={Link}
            role="button"
            to="/my-coins"
            color="inherit"
          >
            <FuseSvgIcon size={20}>
              {theme.direction === "ltr"
                ? "heroicons-outline:arrow-sm-left"
                : "heroicons-outline:arrow-sm-right"}
            </FuseSvgIcon>
            <span className="flex mx-4 font-medium">My Coins</span>
          </Typography>
        </motion.div>

        <div className="flex items-center max-w-full">
          <motion.div
            className="flex flex-col items-center sm:items-start min-w-0 mx-8 sm:mx-16"
            initial={{ x: -20 }}
            animate={{ x: 0, transition: { delay: 0.3 } }}
          >
            <Typography className="text-16 sm:text-20 truncate font-semibold">
              {descriptionName}
            </Typography>
            <Typography variant="caption" className="font-medium">
              Daily Check-in Detail
            </Typography>
          </motion.div>
        </div>
      </div>
      <motion.div
        className="flex"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
      >
        <Button
          className="whitespace-nowrap mx-4"
          variant="contained"
          color="secondary"
          // disabled={props.saveButton.disabled}
          onClick={handleSaveProduct}
        >
          Save
        </Button>
      </motion.div>
    </div>
  );
}

export default DailyCheckInHeader;
