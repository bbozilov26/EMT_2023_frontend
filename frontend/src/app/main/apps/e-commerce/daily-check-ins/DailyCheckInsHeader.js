import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";

function DailyCheckInsHeader(props) {
  return (
    <div className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 flex-1 w-full items-center justify-between py-32 px-24 md:px-32">
      <Typography
        component={motion.span}
        initial={{ x: -20 }}
        animate={{ x: 0, transition: { delay: 0.2 } }}
        delay={300}
        className="text-24 md:text-32 font-extrabold tracking-tight"
      >
        Coins, collect, shop and save
      </Typography>
    </div>
  );
}

export default DailyCheckInsHeader;
