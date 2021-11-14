import { ChartBarIcon } from "@heroicons/react/outline";

import NavigationMdx from "./Navigation.mdx";

// Components and Types
import { Navigation } from ".";
import { NavItem, TNavItemProps } from "components/atoms/navigation/NavItem";
import {
  NavItemSubmenu,
  TNavItemSubmenuProps,
} from "components/atoms/navigation/NavItemSubmenu";

// Stories
import * as NavItemStories from "components/atoms/navigation/NavItem/NavItem.stories";
import * as NavItemSubmenuStories from "components/atoms/navigation/NavItemSubmenu/NavItemSubmenu.stories";
import { Meta } from "@storybook/react";

export default {
  title: "components/molecules/sidebar/Navigation",
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
    <NavItemStories.Active {...(NavItemStories.Active.args as TNavItemProps)} />
    <NavItemStories.Inactive
      {...(NavItemStories.Inactive.args as TNavItemProps)}
      icon={ChartBarIcon}
      label="Reports"
    />
    <NavItemSubmenuStories.Inactive
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
    <NavItemStories.Inactive
      {...(NavItemStories.Inactive.args as TNavItemProps)}
    />
    <NavItemStories.Inactive
      {...(NavItemStories.Inactive.args as TNavItemProps)}
      icon={ChartBarIcon}
      label="Reports"
    />
    <NavItemSubmenuStories.WithButton
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
