import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Controller, useFormContext } from "react-hook-form";
import { lighten, styled } from "@mui/material/styles";
import { orange } from "@mui/material/colors";
import Box from "@mui/material/Box";
import FuseUtils from "@fuse/utils";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import clsx from "clsx";
import InputAdornment from "@mui/material/InputAdornment";
import { useTranslation } from "react-i18next";

const Root = styled("div")(({ theme }) => ({
  "& .productImageFeaturedStar": {
    position: "absolute",
    top: 0,
    right: 0,
    color: orange[400],
    opacity: 0,
  },

  "& .productImageUpload": {
    transitionProperty: "box-shadow",
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
  },

  "& .productImageItem": {
    transitionProperty: "box-shadow",
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
    "&:hover": {
      "& .productImageFeaturedStar": {
        opacity: 0.8,
      },
    },
    "&.featured": {
      pointerEvents: "none",
      boxShadow: theme.shadows[3],
      "& .productImageFeaturedStar": {
        opacity: 1,
      },
      "&:hover .productImageFeaturedStar": {
        opacity: 1,
      },
    },
  },
}));

function BasicInfoTab(props) {
  const methods = useFormContext();
  const { control, formState, watch } = methods;
  const { errors } = formState;

  const images = watch("images");

  const { t } = useTranslation("app");
  const categories = [
    {
      id: "BOOKS",
      name: "BOOKS",
      label: t("BOOKS"),
    },
    {
      id: "MOVIES",
      name: "MOVIES",
      label: t("MOVIES"),
    },
    {
      id: "MUSIC",
      name: "MUSIC",
      label: t("MUSIC"),
    },
    {
      id: "PC_AND_EQUIPMENT",
      name: "PC_AND_EQUIPMENT",
      label: t("PC_AND_EQUIPMENT"),
    },
    {
      id: "ACCESSORIES",
      name: "ACCESSORIES",
      label: t("ACCESSORIES"),
    },
    {
      id: "MOBILE_PHONES",
      name: "MOBILE_PHONES",
      label: t("MOBILE_PHONES"),
    },
  ];

  return (
    <Root>
      <div className="flex justify-center sm:justify-start flex-wrap -mx-16">
        <Controller
          name="images"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Box
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                    ? lighten(theme.palette.background.default, 0.4)
                    : lighten(theme.palette.background.default, 0.02),
              }}
              component="label"
              htmlFor="button-file"
              className="productImageUpload flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg"
            >
              <input
                accept="image/*"
                className="hidden"
                id="button-file"
                type="file"
                onChange={async (e) => {
                  function readFileAsync() {
                    return new Promise((resolve, reject) => {
                      const file = e.target.files[0];
                      if (!file) {
                        return;
                      }
                      const reader = new FileReader();

                      reader.onload = () => {
                        resolve({
                          id: FuseUtils.generateGUID(),
                          url: `data:${file.type};base64,${btoa(
                            reader.result
                          )}`,
                          type: "image",
                        });
                      };

                      reader.onerror = reject;

                      reader.readAsBinaryString(file);
                    });
                  }

                  const newImage = await readFileAsync();

                  onChange([newImage, ...value]);
                }}
              />
              <FuseSvgIcon size={32} color="action">
                heroicons-outline:upload
              </FuseSvgIcon>
            </Box>
          )}
        />
        <Controller
          name="featuredImageId"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) =>
            images.map((media) => (
              <div
                onClick={() => onChange(media.id)}
                onKeyDown={() => onChange(media.id)}
                role="button"
                tabIndex={0}
                className={clsx(
                  "productImageItem flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer outline-none shadow hover:shadow-lg",
                  media.id === value && "featured"
                )}
                key={media.id}
              >
                <FuseSvgIcon className="productImageFeaturedStar">
                  heroicons-solid:star
                </FuseSvgIcon>
                <img
                  className="max-w-none w-auto h-full"
                  src={media.url}
                  alt="product"
                />
              </div>
            ))
          }
        />
      </div>
      <div>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16"
              error={!!errors.name}
              required
              helperText={errors?.name?.message}
              label="Name"
              autoFocus
              id="name"
              variant="outlined"
              fullWidth
            />
          )}
        />

        <Controller
          name="description"
          control={control}
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
            />
          )}
        />

        <Controller
          name="category"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              className="mt-8 mb-16"
              freeSolo
              options={categories}
              value={value}
              onChange={(event, newValue) => {
                onChange(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select category"
                  label="Category"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          )}
        />

        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16"
              label="Price"
              id="price"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">coins</InputAdornment>
                ),
              }}
              type="number"
              variant="outlined"
              fullWidth
            />
          )}
        />

        <Controller
          name="quantity"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16"
              label="Quantity"
              id="quantity"
              type="number"
              variant="outlined"
              fullWidth
            />
          )}
        />
      </div>
    </Root>
  );
}

export default BasicInfoTab;
