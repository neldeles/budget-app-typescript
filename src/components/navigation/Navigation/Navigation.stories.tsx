import { ChartBarIcon } from "@heroicons/react/outline";

import NavigationMdx from "./Navigation.mdx";

// Components and Types
import { Navigation } from ".";
import { NavItem, TNavItemProps } from "components/navigation/NavItem";
import {
  NavItemSubmenu,
  TNavItemSubmenuProps,
} from "components/navigation/NavItemSubmenu";

// Stories
import * as NavItemStories from "components/navigation/NavItem/NavItem.stories";
import * as NavItemSubmenuStories from "components/navigation/NavItemSubmenu/NavItemSubmenu.stories";
import { Meta } from "@storybook/react";

export default {
  title: "components/navigation/Navigation",
  component: Navigation,
  subcomponents: { NavItem, NavItemSubmenu },
  parameters: {
    componentSubtitle:
      "To be used with the NavigationItem and NavigationItemWithSubitem components",
    docs: {
      page: NavigationMdx,
      source: {
        excludeDecorators: true,
        type: "dynamic",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-1/2">
        <Story />
      </div>
    ),
  ],
} as Meta;

export const SimpleNav = () => (
  <Navigation>
    <Navigation.Item {...(NavItemStories.Active.args as TNavItemProps)} />
    <Navigation.Item
      {...(NavItemStories.Inactive.args as TNavItemProps)}
      icon={ChartBarIcon}
      label="Reports"
    />
    <Navigation.ItemSubMenu
      {...(NavItemSubmenuStories.Inactive.args as TNavItemSubmenuProps)}
    />
  </Navigation>
);
SimpleNav.parameters = {
  docs: {
    description: {
      story:
        "Example nav with a Button component passed to the subitem navigation",
    },
  },
};

export const NavWithButton = () => (
  <Navigation>
    <Navigation.Item {...(NavItemStories.Inactive.args as TNavItemProps)} />
    <Navigation.Item
      {...(NavItemStories.Inactive.args as TNavItemProps)}
      icon={ChartBarIcon}
      label="Reports"
    />
    <Navigation.ItemSubMenu
      {...(NavItemSubmenuStories.WithButton.args as TNavItemSubmenuProps)}
    />
  </Navigation>
);

NavWithButton.parameters = {
  docs: {
    description: {
      story:
        "Example nav with a Button component passed to the submenu navigation",
    },
  },
};
