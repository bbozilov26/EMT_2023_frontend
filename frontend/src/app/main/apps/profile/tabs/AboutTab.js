import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { useNavigate } from "react-router-dom";

function AboutTab(props) {
  const [data, setData] = useState(props.user);
  const navigate = useNavigate();

  if (!data) {
    return null;
  }

  const container = {
    show: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };

  const handleMyOrdersCardClick = () => {
    navigate("/orders");
  };

  const handleMyCoinsCardClick = () => {
    navigate("/my-coins");
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full"
    >
      <div className="md:flex">
        <div className="flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32">
          <div style={{ display: "flex" }}>
            {data.creditBalance ? (
              <Card
                component={motion.div}
                variants={item}
                className="w-full mb-32"
                style={{ marginRight: "20px" }}
              >
                <div className="px-32 pt-24">
                  <Typography className="text-2xl font-semibold leading-tight">
                    User's Balance
                  </Typography>
                </div>

                <CardContent className="px-32 py-24">
                  <div className="mb-24">
                    <Typography className="font-semibold mb-4 text-15">
                      Credit Balance
                    </Typography>
                    <Typography
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <FuseSvgIcon className="" size={20}>
                        heroicons-outline:currency-euro
                      </FuseSvgIcon>
                      {data.creditBalance}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            ) : null}

            <Card
              component={motion.div}
              variants={item}
              className="w-full mb-32"
              style={{ marginRight: "20px", cursor: "pointer" }}
              onClick={handleMyOrdersCardClick}
            >
              <div className="px-32 pt-24">
                <Typography className="text-2xl font-semibold leading-tight">
                  {data.roleDTO?.label === "ROLE_CUSTOMER"
                    ? "My Orders"
                    : "All Orders"}
                </Typography>
              </div>

              <CardContent
                className="px-32 py-24"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div className="mb-24">
                  <FuseSvgIcon className="" size={40}>
                    heroicons-outline:shopping-cart
                  </FuseSvgIcon>
                </div>
              </CardContent>
            </Card>

            <Card
              component={motion.div}
              variants={item}
              className="w-full mb-32"
              style={{ cursor: "pointer" }}
              onClick={handleMyCoinsCardClick}
            >
              <div className="px-32 pt-24">
                <Typography className="text-2xl font-semibold leading-tight">
                  My Coins
                </Typography>
              </div>

              <CardContent
                className="px-32 py-24"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div className="mb-24">
                  <FuseSvgIcon className="" size={40}>
                    heroicons-outline:currency-euro
                  </FuseSvgIcon>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card component={motion.div} variants={item} className="w-full mb-32">
            <div className="px-32 pt-24">
              <Typography className="text-2xl font-semibold leading-tight">
                Contact
              </Typography>
            </div>

            <CardContent className="px-32 py-24">
              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  Address
                </Typography>
                <Typography>{data.personDTO?.address}</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  Tel.
                </Typography>

                <Typography>{data.personDTO?.phoneNumber}</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  Email
                </Typography>

                <Typography>{data.email}</Typography>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}

export default AboutTab;
