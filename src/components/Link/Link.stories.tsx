import { Link } from ".";
import { LinkProps } from "react-router-dom";
import { Meta, Story } from "@storybook/react";

export default {
  title: "components/Link",
  component: Link,
  parameters: {
    componentSubtitle: "Placeholder subtitle",
    docs: {
      source: {
        type: "dynamic",
        excludeDecorators: true,
      },
    },
  },
} as Meta;

const Template: Story<LinkProps> = (args) => <Link {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  children: "Some Link text over here",
  to: "someLink",
};
