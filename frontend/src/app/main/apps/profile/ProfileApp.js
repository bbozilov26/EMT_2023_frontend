import FusePageSimple from "@fuse/core/FusePageSimple";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useState } from "react";
import Box from "@mui/material/Box";
import AboutTab from "./tabs/AboutTab";
import PhotosVideosTab from "./tabs/PhotosVideosTab";
import TimelineTab from "./tabs/TimelineTab";
import useThemeMediaQuery from "../../../../@fuse/hooks/useThemeMediaQuery";
import { selectUser } from "app/store/userSlice";
import { useSelector } from "react-redux";

const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: theme.palette.divider,
    "& > .container": {
      maxWidth: "100%",
    },
  },
}));

function ProfileApp() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [selectedTab, setSelectedTab] = useState(1);

  function handleTabChange(event, value) {
    setSelectedTab(value);
  }

  return (
    <Root
      header={
        <div className="flex flex-col">
          <img
            className="h-160 lg:h-320 object-cover w-full"
            src="assets/images/pages/profile/cover.jpg"
            alt="Profile Cover"
          />

          <div className="flex flex-col flex-0 lg:flex-row items-center max-w-5xl w-full mx-auto px-32 lg:h-72">
            <div className="-mt-96 lg:-mt-88 rounded-full">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, transition: { delay: 0.1 } }}
              >
                <Avatar
                  sx={{ borderColor: "background.paper" }}
                  className="w-128 h-128 border-4"
                  src="assets/images/avatars/male-04.jpg"
                  alt="User avatar"
                />
              </motion.div>
            </div>

            <div className="flex flex-col items-center lg:items-start mt-16 lg:mt-0 lg:ml-32">
              <Typography className="text-lg font-bold leading-none">
                {user.personDTO?.firstName + " " + user.personDTO?.lastName}
              </Typography>
              <Typography color="text.secondary">
                {user.personDTO?.address?.split(", ")[3] +
                  ", " +
                  user.personDTO?.address?.split(", ")[4]}
              </Typography>
            </div>

            {/*<div className="flex flex-1 justify-end my-16 lg:my-0">*/}
            {/*  <Tabs*/}
            {/*    value={selectedTab}*/}
            {/*    onChange={handleTabChange}*/}
            {/*    indicatorColor="primary"*/}
            {/*    textColor="inherit"*/}
            {/*    variant="scrollable"*/}
            {/*    scrollButtons={false}*/}
            {/*    className="-mx-4 min-h-40"*/}
            {/*    classes={{*/}
            {/*      indicator: "flex justify-center bg-transparent w-full h-full",*/}
            {/*    }}*/}
            {/*    TabIndicatorProps={{*/}
            {/*      children: (*/}
            {/*        <Box*/}
            {/*          sx={{ bgcolor: "text.disabled" }}*/}
            {/*          className="w-full h-full rounded-full opacity-20"*/}
            {/*        />*/}
            {/*      ),*/}
            {/*    }}*/}
            {/*  >*/}
            {/*    <Tab*/}
            {/*      className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12 "*/}
            {/*      disableRipple*/}
            {/*      label="Edit profile"*/}
            {/*    />*/}
            {/*  </Tabs>*/}
            {/*</div>*/}
          </div>
        </div>
      }
      content={
        <div className="flex flex-auto justify-center w-full max-w-5xl mx-auto p-24 sm:p-32">
          <AboutTab user={user} />
        </div>
      }
      scroll={"page"}
    />
  );
}

export default ProfileApp;
