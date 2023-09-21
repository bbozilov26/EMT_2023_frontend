import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";

function AboutTab() {
  const [data, setData] = useState(null);
  const test = (x) => x + 1;

  useEffect(() => {
    axios.get("/api/profile/about").then((res) => {
      setData(res.data);
    });
  }, []);

  if (!data) {
    return null;
  }

  const { general, work, contact, groups, friends } = data;

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

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full"
    >
      <div className="md:flex">
        <div className="flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32">
          <Card component={motion.div} variants={item} className="w-full mb-32">
            <div className="px-32 pt-24">
              <Typography className="text-2xl font-semibold leading-tight">
                General Information
              </Typography>
            </div>

            <CardContent className="px-32 py-24">
              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  Gender
                </Typography>
                <Typography>{general.gender}</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  Birthday
                </Typography>
                <Typography>{general.birthday}</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  Locations
                </Typography>

                {general.locations.map((location) => (
                  <div className="flex items-center" key={location}>
                    <Typography>{location}</Typography>
                    <FuseSvgIcon className="mx-4" size={16} color="action">
                      heroicons-outline:location-marker
                    </FuseSvgIcon>
                  </div>
                ))}
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  About Me
                </Typography>
                <Typography>{general.about}</Typography>
              </div>
            </CardContent>
          </Card>

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
                <Typography>{contact.address}</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  Tel.
                </Typography>

                {contact.tel.map((tel) => (
                  <div className="flex items-center" key={tel}>
                    <Typography>{tel}</Typography>
                  </div>
                ))}
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  Website
                </Typography>

                {contact.websites.map((website) => (
                  <div className="flex items-center" key={website}>
                    <Typography>{website}</Typography>
                  </div>
                ))}
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">
                  Emails
                </Typography>

                {contact.emails.map((email) => (
                  <div className="flex items-center" key={email}>
                    <Typography>{email}</Typography>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col md:w-320">
          <Card component={motion.div} variants={item} className="w-full mb-32">
            <div className="flex items-center px-32 pt-24">
              <Typography className="flex flex-1 text-2xl font-semibold leading-tight">
                Friends
              </Typography>

              <Button className="-mx-8" size="small">
                See 454 more
              </Button>
            </div>

            <CardContent className="flex flex-wrap px-32">
              {friends.map((friend) => (
                <Avatar
                  key={friend.id}
                  className="w-64 h-64 rounded-12 m-4"
                  src={friend.avatar}
                  alt={friend.name}
                />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}

export default AboutTab;
