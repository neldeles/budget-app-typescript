import { NavItemSubmenu } from ".";
import { FolderIcon } from "@heroicons/react/outline";

import { Primary } from "components/atoms/Button/Button.stories";
import { Meta, Story } from "@storybook/react";
import { TNavItemSubmenu } from "./NavItemSubmenu";
import { TButtonProps } from "components/atoms/Button/Button";

export default {
  title: "components/atoms/navigation/NavItemSubmenu",
  component: NavItemSubmenu,
  decorators: [
    (Story) => (
      <div className="mb-4 w-1/2">
        <Story />
      </div>
    ),
  ],
  parameters: {
    componentSubtitle:
      "Individual navigation items to be used with the Navigation component",
    docs: {
      source: {
        type: "dynamic",
        excludeDecorators: true,
      },
    },
  },
} as Meta;

const Template: Story<TNavItemSubmenu> = (args) => <NavItemSubmenu {...args} />;

const Wrapper = ({ render }: { render: () => React.ReactNode }) => (
  <div className="mb-4 w-1/2">{render()}</div>
);

export const All = () => {
  return (
    <>
      <Wrapper
        render={() => (
          <NavItemSubmenu {...(Inactive.args as TNavItemSubmenu)} />
        )}
      />
      <Wrapper
        render={() => <NavItemSubmenu {...(Active.args as TNavItemSubmenu)} />}
      />
      <Wrapper
        render={() => (
          <NavItemSubmenu {...(WithButton.args as TNavItemSubmenu)} />
        )}
      />
    </>
  );
};

export const Inactive = Template.bind({});
Inactive.args = {
  label: "Inactive Subitem",
  icon: FolderIcon,
  navSubItems: [
    { label: "Wallet 1", href: "#", current: false },
    { label: "Wallet 2", href: "#", current: false },
  ],
};
Inactive.parameters = {
  docs: {
    description: {
      story:
        "Navigation item with sub-items. None of the sub-items are the current page of the web app.",
    },
  },
};

export const Active = Template.bind({});
Active.args = {
  ...Inactive.args,
  label: "Active Subitem",
  navSubItems: [
    { label: "Wallet 1", href: "#", current: true },
    { label: "Wallet 2", href: "#", current: false },
  ],
};
Active.parameters = {
  docs: {
    description: {
      story:
        "Navigation item with sub-items. A sub-item is the current page of the web app.",
    },
  },
};

const StyledButton = () => (
  <div className="flex justify-center">
    <Primary {...(Primary.args as TButtonProps)} width="3/4" />
  </div>
);

export const WithButton = Template.bind({});
WithButton.args = {
  ...Inactive.args,
  label: "With nested Button element",
  children: <StyledButton />,
};
WithButton.parameters = {
  docs: {
    description: {
      story:
        "If you need a button within the submenu, you can pass in HTML elements etc. (in this example a `Button` component) as a child.",
    },
  },
};
