import i18next from "i18next";
import DocumentationNavigation from "../main/documentation/DocumentationNavigation";

import ar from "./navigation-i18n/ar";
import en from "./navigation-i18n/en";
import tr from "./navigation-i18n/tr";
import authRoles from "../auth/authRoles";

i18next.addResourceBundle("en", "navigation", en);
i18next.addResourceBundle("tr", "navigation", tr);
i18next.addResourceBundle("ar", "navigation", ar);
i18next.addResourceBundle("en", "app", en);
i18next.addResourceBundle("tr", "app", tr);
i18next.addResourceBundle("ar", "app", ar);

const navigationConfig = [
  {
    id: "dashboards",
    title: "Dashboards",
    subtitle: "Unique dashboard designs",
    type: "group",
    icon: "heroicons-outline:home",
    translate: "DASHBOARDS",
    children: [
      {
        id: "dashboards.project",
        title: "Project",
        type: "item",
        icon: "heroicons-outline:clipboard-check",
        url: "/dashboards/project",
      },
      {
        id: "dashboards.analytics",
        title: "Analytics",
        type: "item",
        icon: "heroicons-outline:chart-pie",
        url: "/dashboards/analytics",
      },
      {
        id: "dashboards.finance",
        title: "Finance",
        type: "item",
        icon: "heroicons-outline:cash",
        url: "/dashboards/finance",
      },
    ],
  },
  {
    id: "apps",
    title: "Applications",
    subtitle: "Custom made application designs",
    type: "group",
    icon: "heroicons-outline:home",
    translate: "APPLICATIONS",
    children: [
      {
        id: "apps.file-manager",
        title: "File Manager",
        type: "item",
        icon: "heroicons-outline:cloud",
        url: "/apps/file-manager",
        end: true,
        translate: "FILE_MANAGER",
      },
    ],
  },
  {
    id: "pages",
    title: "Pages",
    subtitle: "Custom made page designs",
    type: "group",
    icon: "heroicons-outline:document",
    children: [
      {
        id: "pages.authentication",
        title: "Authentication",
        type: "collapse",
        icon: "heroicons-outline:lock-closed",
        children: [
          {
            id: "pages.authentication.sign-in",
            title: "Sign in",
            type: "collapse",
            children: [
              {
                id: "pages.authentication.sign-in.classic",
                title: "Classic",
                type: "item",
                url: "/pages/authentication/sign-in/classic",
              },
              {
                id: "pages.authentication.sign-in.modern",
                title: "Modern",
                type: "item",
                url: "/pages/authentication/sign-in/modern",
              },
              {
                id: "pages.authentication.sign-in.split-screen",
                title: "Split Screen",
                type: "item",
                url: "/pages/authentication/sign-in/split-screen",
              },
            ],
          },
          {
            id: "pages.authentication.sign-up",
            title: "Sign up",
            type: "collapse",
            children: [
              {
                id: "pages.authentication.sign-up.classic",
                title: "Classic",
                type: "item",
                url: "/pages/authentication/sign-up/classic",
              },
              {
                id: "pages.authentication.sign-up.modern",
                title: "Modern",
                type: "item",
                url: "/pages/authentication/sign-up/modern",
              },
              {
                id: "pages.authentication.sign-up.split-screen",
                title: "Split Screen",
                type: "item",
                url: "/pages/authentication/sign-up/split-screen",
              },
            ],
          },
          {
            id: "pages.authentication.sign-out",
            title: "Sign out",
            type: "collapse",
            children: [
              {
                id: "pages.authentication.sign-out.classic",
                title: "Classic",
                type: "item",
                url: "/pages/authentication/sign-out/classic",
              },
            ],
          },
          {
            id: "pages.authentication.forgot-password",
            title: "Forgot password",
            type: "collapse",
            children: [
              {
                id: "pages.authentication.forgot-password.classic",
                title: "Classic",
                type: "item",
                url: "/pages/authentication/forgot-password/classic",
              },
            ],
          },
          {
            id: "pages.authentication.reset-password",
            title: "Reset password",
            type: "collapse",
            children: [
              {
                id: "pages.authentication.reset-password.classic",
                title: "Classic",
                type: "item",
                url: "/pages/authentication/reset-password/classic",
              },
            ],
          },
          {
            id: "pages.authentication.confirmation-required",
            title: "Confirmation required",
            type: "collapse",
            children: [
              {
                id: "pages.authentication.confirmation-required.classic",
                title: "Classic",
                type: "item",
                url: "/pages/authentication/confirmation-required/classic",
              },
            ],
          },
        ],
      },
      {
        id: "pages.error",
        title: "Error",
        type: "collapse",
        icon: "heroicons-outline:exclamation-circle",
        children: [
          {
            id: "pages.error.404",
            title: "404",
            type: "item",
            url: "/pages/error/404",
          },
          {
            id: "pages.error.500",
            title: "500",
            type: "item",
            url: "/pages/error/500",
          },
        ],
      },
      {
        id: "pages.invoice",
        title: "Invoice",
        type: "collapse",
        icon: "heroicons-outline:calculator",
        children: [
          {
            id: "pages.invoice.printable",
            title: "Printable",
            type: "collapse",
            children: [
              {
                id: "pages.invoice.printable.compact",
                title: "Compact",
                type: "item",
                url: "/pages/invoice/printable/compact",
              },
              {
                id: "pages.invoice.printable.modern",
                title: "Modern",
                type: "item",
                url: "/pages/invoice/printable/modern",
              },
            ],
          },
        ],
      },
      {
        id: "pages.maintenance",
        title: "Maintenance",
        type: "item",
        icon: "heroicons-outline:exclamation",
        url: "/pages/maintenance",
      },
    ],
  },
  {
    id: "user-interface",
    title: "User Interface",
    subtitle: "Building blocks of the UI & UX",
    type: "group",
    icon: "heroicons-outline:collection",
    children: [
      {
        id: "user-interface.tailwindcss",
        title: "TailwindCSS",
        type: "item",
        icon: "heroicons-outline:sparkles",
        url: "/ui/tailwindcss",
      },
      {
        id: "user-interface.icons",
        title: "Icons",
        type: "collapse",
        icon: "heroicons-outline:lightning-bolt",
        children: [
          {
            id: "user-interface.icons.heroicons-outline",
            title: "Heroicons Outline",
            type: "item",
            url: "/ui/icons/heroicons/outline",
          },
          {
            id: "user-interface.icons.heroicons-solid",
            title: "Heroicons Solid",
            type: "item",
            url: "/ui/icons/heroicons/solid",
          },
          {
            id: "user-interface.icons.material-twotone",
            title: "Material Twotone",
            type: "item",
            url: "/ui/icons/material/twotone",
          },
          {
            id: "user-interface.icons.material-outline",
            title: "Material Outline",
            type: "item",
            url: "/ui/icons/material/outline",
          },
          {
            id: "user-interface.icons.material-solid",
            title: "Material Solid",
            type: "item",
            url: "/ui/icons/material/solid",
          },
          {
            id: "user-interface.icons.feather",
            title: "Feather",
            type: "item",
            url: "/ui/icons/feather",
          },
        ],
      },
      {
        id: "user-interface.page-layouts",
        title: "Page Layouts",
        type: "collapse",
        icon: "heroicons-outline:template",
        children: [
          {
            id: "user-interface.page-layouts.overview",
            title: "Overview",
            type: "item",
            url: "/ui/page-layouts/overview",
          },
          {
            id: "user-interface.page-layouts.carded",
            title: "Carded",
            type: "collapse",
            children: [
              {
                id: "user-interface.page-layouts.carded.full-width",
                title: "Full Width",
                type: "collapse",
                url: "/ui/page-layouts/carded/full-width",
                children: [
                  {
                    id: "user-interface.page-layouts.carded.full-width.overview",
                    title: "Full Width Overview",
                    type: "item",
                    url: "/ui/page-layouts/carded/full-width/overview",
                  },
                  {
                    id: "user-interface.page-layouts.carded.full-width.normal-scroll",
                    title: "Full Width Normal Scroll",
                    type: "item",
                    url: "/ui/page-layouts/carded/full-width/normal-scroll",
                  },
                  {
                    id: "user-interface.page-layouts.carded.full-width.page-scroll",
                    title: "Full Width Page Scroll",
                    type: "item",
                    url: "/ui/page-layouts/carded/full-width/page-scroll",
                  },
                  {
                    id: "user-interface.page-layouts.carded.full-width.content-scroll",
                    title: "Full Width Content Scroll",
                    type: "item",
                    url: "/ui/page-layouts/carded/full-width/content-scroll",
                  },
                ],
              },
              {
                id: "user-interface.page-layouts.carded.with-sidebars",
                title: "With Sidebars",
                type: "collapse",
                url: "/ui/page-layouts/carded/with-sidebars",
                children: [
                  {
                    id: "user-interface.page-layouts.carded.with-sidebars.overview",
                    title: "With Sidebars Overview",
                    type: "item",
                    url: "/ui/page-layouts/carded/with-sidebars/overview",
                  },
                  {
                    id: "user-interface.page-layouts.carded.with-sidebars.normal-scroll",
                    title: "With Sidebars Normal Scroll",
                    type: "item",
                    url: "/ui/page-layouts/carded/with-sidebars/normal-scroll",
                  },
                  {
                    id: "user-interface.page-layouts.carded.with-sidebars.page-scroll",
                    title: "With Sidebars Page Scroll",
                    type: "item",
                    url: "/ui/page-layouts/carded/with-sidebars/page-scroll",
                  },
                  {
                    id: "user-interface.page-layouts.carded.with-sidebars.content-scroll",
                    title: "With Sidebars Content Scroll",
                    type: "item",
                    url: "/ui/page-layouts/carded/with-sidebars/content-scroll",
                  },
                ],
              },
            ],
          },
          {
            id: "user-interface.page-layouts.simple",
            title: "Simple",
            type: "collapse",
            children: [
              {
                id: "user-interface.page-layouts.simple.full-width",
                title: "Full Width",
                type: "collapse",
                url: "/ui/page-layouts/simple/full-width",
                children: [
                  {
                    id: "user-interface.page-layouts.simple.full-width.overview",
                    title: "Full Width Overview",
                    type: "item",
                    url: "/ui/page-layouts/simple/full-width/overview",
                  },
                  {
                    id: "user-interface.page-layouts.simple.full-width.normal-scroll",
                    title: "Full Width Normal Scroll",
                    type: "item",
                    url: "/ui/page-layouts/simple/full-width/normal-scroll",
                  },
                  {
                    id: "user-interface.page-layouts.simple.full-width.page-scroll",
                    title: "Full Width Page Scroll",
                    type: "item",
                    url: "/ui/page-layouts/simple/full-width/page-scroll",
                  },
                  {
                    id: "user-interface.page-layouts.simple.full-width.content-scroll",
                    title: "Full Width Content Scroll",
                    type: "item",
                    url: "/ui/page-layouts/simple/full-width/content-scroll",
                  },
                ],
              },
              {
                id: "user-interface.page-layouts.simple.with-sidebars",
                title: "With Sidebars",
                type: "collapse",
                url: "/ui/page-layouts/simple/with-sidebars",
                children: [
                  {
                    id: "user-interface.page-layouts.simple.with-sidebars.overview",
                    title: "With Sidebars Overview",
                    type: "item",
                    url: "/ui/page-layouts/simple/with-sidebars/overview",
                  },
                  {
                    id: "user-interface.page-layouts.simple.with-sidebars.normal-scroll",
                    title: "With Sidebars Normal Scroll",
                    type: "item",
                    url: "/ui/page-layouts/simple/with-sidebars/normal-scroll",
                  },
                  {
                    id: "user-interface.page-layouts.simple.with-sidebars.page-scroll",
                    title: "With Sidebars Page Scroll",
                    type: "item",
                    url: "/ui/page-layouts/simple/with-sidebars/page-scroll",
                  },
                  {
                    id: "user-interface.page-layouts.simple.with-sidebars.content-scroll",
                    title: "With Sidebars Content Scroll",
                    type: "item",
                    url: "/ui/page-layouts/simple/with-sidebars/content-scroll",
                  },
                ],
              },
            ],
          },
          {
            id: "user-interface.page-layouts.empty",
            title: "Empty Page",
            type: "item",
            url: "/ui/page-layouts/empty",
          },
        ],
      },
      {
        id: "user-interface.typography",
        title: "Typography",
        type: "item",
        icon: "heroicons-outline:pencil",
        url: "/ui/typography",
      },
    ],
  },
  {
    id: "divider-1",
    type: "divider",
  },
  {
    type: "divider",
    id: "divider-2",
  },
  {
    id: "navigation-features",
    title: "Navigation features",
    subtitle: "Collapsable levels & badge styles",
    type: "group",
    icon: "heroicons-outline:menu",
    children: [
      {
        id: "navigation-features.level.0",
        title: "Level 0",
        icon: "heroicons-outline:check-circle",
        type: "collapse",
        children: [
          {
            id: "navigation-features.level.0.1",
            title: "Level 1",
            type: "collapse",
            children: [
              {
                id: "navigation-features.level.0.1.2",
                title: "Level 2",
                type: "collapse",
                children: [
                  {
                    id: "navigation-features.level.0.1.2.3",
                    title: "Level 3",
                    type: "collapse",
                    children: [
                      {
                        id: "navigation-features.level.0.1.2.3.4",
                        title: "Level 4",
                        type: "collapse",
                        children: [
                          {
                            id: "navigation-features.level.0.1.2.3.4.5",
                            title: "Level 5",
                            type: "collapse",
                            children: [
                              {
                                id: "navigation-features.level.0.1.2.3.4.5.6",
                                title: "Level 6",
                                type: "item",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "navigation-features2.level.0",
        title: "Level 0",
        subtitle: "With subtitle",
        icon: "heroicons-outline:check-circle",
        type: "collapse",
        children: [
          {
            id: "navigation-features2.level.0.1-1",
            title: "Level 1.1",
            type: "item",
          },
          {
            id: "navigation-features2.level.0.1-2",
            title: "Level 1.2",
            type: "item",
          },
        ],
      },
      {
        id: "navigation-features.active",
        title: "Active item",
        subtitle: "Manually marked as active",
        icon: "heroicons-outline:check-circle",
        type: "item",
        active: true,
      },
      {
        id: "navigation-features.disabled-collapse",
        title: "Disabled collapse",
        subtitle: "Some subtitle",
        icon: "heroicons-outline:check-circle",
        type: "collapse",
        disabled: true,
        children: [
          {
            id: "navigation-features.disabled-collapse.child",
            title: "You shouldn't be able to see this child",
            type: "item",
          },
        ],
      },
      {
        id: "navigation-features.disabled-item",
        title: "Disabled item",
        subtitle: "Some subtitle",
        icon: "heroicons-outline:check-circle",
        type: "item",
        disabled: true,
      },
      {
        id: "navigation-features.badge-style-oval",
        title: "Oval badge",
        icon: "heroicons-outline:tag",
        type: "item",
        badge: {
          title: "8",
          classes: "w-20 h-20 bg-teal-400 text-black rounded-full",
        },
      },
      {
        id: "navigation-features.badge-style-rectangle",
        title: "Rectangle badge",
        icon: "heroicons-outline:tag",
        type: "item",
        badge: {
          title: "Updated!",
          classes: "px-8 bg-teal-400 text-black rounded",
        },
      },
      {
        id: "navigation-features.badge-style-rounded",
        title: "Rounded badge",
        icon: "heroicons-outline:tag",
        type: "item",
        badge: {
          title: "NEW",
          classes: "px-10 bg-teal-400 text-black rounded-full",
        },
      },
      {
        id: "navigation-features.badge-style-simple",
        title: "Simple badge",
        icon: "heroicons-outline:tag",
        type: "item",
        badge: {
          title: "87 Unread",
          classes: "bg-transparent text-teal-500",
        },
      },
    ],
  },
];

export default navigationConfig;
