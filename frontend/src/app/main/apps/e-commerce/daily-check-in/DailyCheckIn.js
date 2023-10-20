import { useEffect, useState } from "react";
import DailyCheckInRepository from "../repositories/DailyCheckInRepository";
import { useParams } from "react-router-dom";
import FuseLoading from "@fuse/core/FuseLoading";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FusePageCarded from "@fuse/core/FusePageCarded/FusePageCarded";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import BasicInfoTab from "../daily-check-in/tabs/BasicInfoTab";
import DailyCheckInHeader from "./DailyCheckInHeader";
import { useDispatch } from "react-redux";

const schema = yup.object().shape({
  dailyReward: yup
    .string()
    .required("You must enter a daily reward")
    .min(5, "The daily reward must be at least 5 coin(s)"),
});

function DailyCheckIn(props) {
  const dispatch = useDispatch();
  const routeParams = useParams();
  const { dailyCheckInId } = useParams();
  const [dailyCheckIn, setDailyCheckIn] = useState();
  const [noDailyCheckIn, setNoDailyCheckIn] = useState(false);
  const methods = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const { reset, watch, control, onChange, formState } = methods;
  const form = watch();
  const [tabValue, setTabValue] = useState(0);

  function handleTabChange(event, value) {
    setTabValue(value);
  }

  useEffect(() => {
    function updateDailyCheckInState() {
      DailyCheckInRepository.findById(dailyCheckInId).then(({ data }) => {
        setDailyCheckIn({
          id: data.id.id,
          dailyReward: data.dailyReward,
          label: data.label,
          description: data.description,
        });
      });
    }

    updateDailyCheckInState();
  }, [dailyCheckInId]);

  useEffect(() => {
    if (!dailyCheckIn) {
      return;
    }
    /**
     * Reset the form on daily check-in state changes
     */
    reset(dailyCheckIn);
  }, [dailyCheckIn, reset]);

  /**
   * Wait while dailyCheckIn data is loading and form is set
   */
  if (
    _.isEmpty(form) ||
    (dailyCheckIn && routeParams.dailyCheckInId !== dailyCheckIn.id)
  ) {
    return <FuseLoading />;
  }

  return (
    <FormProvider {...methods}>
      <FusePageCarded
        header={
          <DailyCheckInHeader
            dailyCheckInId={routeParams.dailyCheckInId}
            dailyCheckIn={dailyCheckIn}
            // saveButton={{
            //   disable: invalidForm,
            // }}
          />
        }
        content={
          <>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor="secondary"
              textColor="secondary"
              variant="scrollable"
              scrollButtons="auto"
              classes={{ root: "w-full h-64 border-b-1" }}
            >
              <Tab className="h-64" label="Basic Info" />
            </Tabs>
            <div className="p-16 sm:p-24 max-w-3xl">
              <div className={tabValue !== 0 ? "hidden" : ""}>
                <BasicInfoTab dailyCheckIn={dailyCheckIn} />
              </div>
            </div>
          </>
        }
        scroll={"page"}
      />
    </FormProvider>
  );
}

export default DailyCheckIn;
