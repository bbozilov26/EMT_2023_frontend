import i18next from "i18next";

import ar from "./navigation-i18n/ar";
import en from "./navigation-i18n/en";
import tr from "./navigation-i18n/tr";

i18next.addResourceBundle("en", "navigation", en);
i18next.addResourceBundle("tr", "navigation", tr);
i18next.addResourceBundle("ar", "navigation", ar);
i18next.addResourceBundle("en", "app", en);
i18next.addResourceBundle("tr", "app", tr);
i18next.addResourceBundle("ar", "app", ar);

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
