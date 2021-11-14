import { NavItem, TNavItemProps } from ".";
import { HomeIcon } from "@heroicons/react/outline";
import { Meta, Story } from "@storybook/react";

export default {
  title: "components/atoms/navigation/NavItem",
  component: NavItem,
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

const Template: Story<TNavItemProps> = (args) => <NavItem {...args} />;

export const All = () => {
  return (
    <>
      <NavItem {...(Active.args as TNavItemProps)} />
      <NavItem {...(Inactive.args as TNavItemProps)} />
    </>
  );
};

export const Active = Template.bind({});
Active.args = {
  label: "Budget",
  href: "#href",
  current: true,
  icon: HomeIcon,
};

Active.parameters = {
  docs: {
    description: {
      story:
        "If a navigation item without sub-items is the current page of the web app.",
    },
  },
};

export const Inactive = Template.bind({});
Inactive.args = {
  ...Active.args,
  current: false,
};

Inactive.parameters = {
  docs: {
    description: {
      story:
        "Navigation item without sub-items. It is **_not_** the current page of the web app.",
    },
  },
};
