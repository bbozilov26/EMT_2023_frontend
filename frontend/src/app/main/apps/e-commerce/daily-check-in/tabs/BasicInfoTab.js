import { Controller, useFormContext } from "react-hook-form";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

function BasicInfoTab(props) {
  const methods = useFormContext();
  const { control, formState, watch, setValue } = methods;
  const { errors } = formState;

  return (
    <>
      <div>
        <Controller
          name="description"
          control={control}
          defaultValue={props.dailyCheckIn?.description || ""}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16"
              id="description"
              label="Description"
              type="text"
              multiline
              rows={5}
              variant="outlined"
              fullWidth
              disabled={true}
            />
          )}
        />

        <Controller
          name="label"
          control={control}
          defaultValue={props.dailyCheckIn?.label || ""}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16"
              id="label"
              label="Label"
              type="text"
              multiline
              rows={5}
              variant="outlined"
              fullWidth
              disabled={true}
            />
          )}
        />

        <Controller
          name="dailyReward"
          control={control}
          defaultValue={props.dailyCheckIn?.dailyReward || ""}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16"
              label="Daily Reward"
              id="dailyReward"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FuseSvgIcon>heroicons-outline:currency-euro</FuseSvgIcon>
                  </InputAdornment>
                ),
              }}
              type="number"
              variant="outlined"
              fullWidth
              error={!!errors.name}
              required
              helperText={errors?.name?.message}
            />
          )}
        />
      </div>
    </>
  );
}

export default BasicInfoTab;
