import { NavItemSubmenu } from ".";
import { FolderIcon } from "@heroicons/react/outline";

import { Primary } from "components/Button/Button.stories";
import { Meta, Story } from "@storybook/react";
import { TNavItemSubmenuProps } from "./NavItemSubmenu";
import { TButtonProps } from "components/Button/Button";
import { userEvent, within } from "@storybook/testing-library";
import { getByRole } from "@storybook/testing-library";

export default {
  title: "components/navigation/NavItemSubmenu",
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

const Template: Story<TNavItemSubmenuProps> = (args) => (
  <NavItemSubmenu {...args} />
);

const Wrapper = ({ render }: { render: () => React.ReactNode }) => (
  <div className="mb-4 w-1/2">{render()}</div>
);

export const All = () => {
  return (
    <>
      <Wrapper
        render={() => (
          <NavItemSubmenu {...(Inactive.args as TNavItemSubmenuProps)} />
        )}
      />
      <Wrapper
        render={() => (
          <NavItemSubmenu {...(Active.args as TNavItemSubmenuProps)} />
        )}
      />
      <Wrapper
        render={() => (
          <NavItemSubmenu {...(WithButton.args as TNavItemSubmenuProps)} />
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
    { id: 1, label: "Wallet 1", to: "/1" },
    { id: 2, label: "Wallet 2", to: "/2" },
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
    { id: 3, label: "Wallet 1", to: "/3" },
    { id: 4, label: "Wallet 2", to: "/4" },
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
Active.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(
    await canvas.getByRole("button", { name: Active.args!.label })
  );
  await userEvent.click(
    await canvas.getByRole("link", { name: Active.args!.navSubItems![0].label })
  );
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
