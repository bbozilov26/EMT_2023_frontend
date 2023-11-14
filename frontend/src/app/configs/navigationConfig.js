import i18next from "i18next";

import en from "./navigation-i18n/en";
import mk from "./navigation-i18n/mk";

i18next.addResourceBundle("en", "navigation", en);
i18next.addResourceBundle("mk", "navigation", mk);
i18next.addResourceBundle("en", "app", en);
i18next.addResourceBundle("mk", "app", mk);

const navigationConfig = [
  {
    id: "divider-1",
    type: "divider",
  },
  {
    type: "divider",
    id: "divider-2",
  },
];

export default navigationConfig;
