import { Heading } from ".";
import { THeadingProps } from "./Heading";

import { Meta, Story } from "@storybook/react";

export default {
  title: "components/atoms/Heading/H2",
  component: Heading,
} as Meta;

export const H2Header: Story<THeadingProps> = (args) => <Heading {...args} />;
H2Header.args = {
  value: "H2 Heading",
  alignment: "left",
  size: "large",
  headingLevel: "h2",
};

H2Header.storyName = "H2 Header";
