import { H2 } from ".";

export default {
  title: "components/atoms/Heading/H2",
  component: H2,
};

export const H2Header = (args) => <H2 {...args} />;
H2Header.args = {
  value: "H2 Heading",
};

H2Header.storyName = "H2 Header";
