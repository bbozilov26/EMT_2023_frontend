import { motion } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import withRouter from "@fuse/core/withRouter";
import FuseLoading from "@fuse/core/FuseLoading";
import DailyCheckInCard from "./DailyCheckInCard";
import DailyCheckInRepository from "../repositories/DailyCheckInRepository";
import UserRepository from "../repositories/UserRepository";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import Typography from "@mui/material/Typography";

function DailyCheckInsTable(props) {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));

  const [loading, setLoading] = useState(true);
  const [userDailyCheckIns, setUserDailyCheckIns] = useState([]);
  const [startDate, setStartDate] = useState();

  useEffect(() => {
    // Fetch daily check-ins when the component mounts

    if (
      user.roleDTO?.label === "ROLE_SUPER_ADMIN" ||
      user.roleDTO?.label === "ROLE_ADMIN"
    ) {
      DailyCheckInRepository.findAll().then(({ data }) => {
        const dailyCheckInsData = data.map((el) => ({
          id: el.id.id,
          dailyReward: el.dailyReward,
          description: el.description,
          label: el.label,
        }));

        setUserDailyCheckIns(dailyCheckInsData);
      });
    } else {
      UserRepository.findAllDailyCheckInsByUser(user.id.id).then(({ data }) => {
        const dailyCheckInsData = data.map((el) => ({
          id: el.id.id,
          dailyCheckInId: el.dailyCheckInDTO.id.id,
          dailyReward: el.dailyCheckInDTO.dailyReward,
          description: el.dailyCheckInDTO.description,
          label: el.dailyCheckInDTO.label,
          claimed: el.claimed,
          dateModified: el.dateModified,
        }));
        setUserDailyCheckIns(dailyCheckInsData);

        setStartDate(new Date(dailyCheckInsData[0]?.dateModified));
      });
    }

    setLoading(false);
  }, [user?.id.id]);

  const container = {
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    show: {
      opacity: 1,
      y: 0,
    },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <FuseLoading />
      </div>
    );
  }

  if (userDailyCheckIns.length === 0) {
    return (
      <div className="flex flex-col flex-1 w-full mx-auto px-24 pt-24 sm:p-40">
        <div className="mt-128"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.1 } }}
          className="flex flex-1 items-center justify-center h-full"
        >
          <Typography color="text.secondary" variant="h5">
            There are no daily check ins for the given user!
          </Typography>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center ${
        user.roleDTO?.label === "ROLE_CUSTOMER"
          ? "justify-between"
          : "justify-center"
      }`}
    >
      {user.roleDTO?.label === "ROLE_CUSTOMER" ? (
        <div className="text-18 flex items-center ml-64">
          Your Balance:
          <FuseSvgIcon className="mr-2 ml-4">
            heroicons-outline:currency-euro
          </FuseSvgIcon>
          {user?.creditBalance ?? 0}
        </div>
      ) : null}
      <div className="mr-64">
        <Card>
          <CardContent>
            <div className="flex flex-col flex-1 w-full mx-auto px-16 pt-8 sm:p-16">
              <motion.div
                className="flex grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-8 lg:gap-16 mt-2 sm:mt-4"
                variants={container}
                initial="hidden"
                animate="show"
                style={{
                  justifyItems: "center", // Center items horizontally
                }}
              >
                {userDailyCheckIns.map((udci) => {
                  return (
                    <motion.div variants={item} key={udci.id}>
                      <DailyCheckInCard
                        udci={udci}
                        user={user}
                        startDate={startDate}
                      />
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default withRouter(DailyCheckInsTable);
