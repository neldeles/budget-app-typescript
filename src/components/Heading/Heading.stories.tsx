import { Heading } from ".";
import { THeadingProps } from "./Heading";

import { Meta, Story } from "@storybook/react";

export default {
  title: "components/Heading/Heading",
  component: Heading,
} as Meta;

export const Default: Story<THeadingProps> = (args) => <Heading {...args} />;
Default.args = {
  value: "Heading",
  alignment: "left",
  size: "large",
  as: "h2",
};
