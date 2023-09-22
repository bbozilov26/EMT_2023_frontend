import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import withRouter from "@fuse/core/withRouter";
import FuseLoading from "@fuse/core/FuseLoading";
import { selectUser } from "app/store/userSlice";
import DailyCheckInCard from "./DailyCheckInCard";

function DailyCheckInsTable(props) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(fetchDailyCheckIns(user.id));
  }, [dispatch]);

  const dailyCheckIns = useSelector((state) => state.eCommerce.dailyCheckIns);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(dailyCheckIns);

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

  function handleClick(item) {
    props.navigate(`/products/${item.id}/${item.handle}`);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <FuseLoading />
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 w-full mx-auto px-24 pt-24 sm:p-40">
      <motion.div
        className="flex grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8 lg:gap-16 mt-32 sm:mt-40"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {data.map((dci) => {
          return (
            <motion.div variants={item} key={dci.id}>
              <DailyCheckInCard dci={dci} user={user} />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

export default withRouter(DailyCheckInsTable);
