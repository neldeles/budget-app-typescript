import { H2 } from ".";
import { H2Props } from "./Heading";

import { Meta, Story } from "@storybook/react";

export default {
  title: "components/atoms/Heading/H2",
  component: H2,
} as Meta;

export const H2Header: Story<H2Props> = (args) => <H2 {...args} />;
H2Header.args = {
  value: "H2 Heading",
  alignment: "left",
};

H2Header.storyName = "H2 Header";
