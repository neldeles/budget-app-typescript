import { Link } from ".";

export default {
  title: "components/atoms/Link",
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
};

const Template = (args) => <Link {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  children: "Some Link text over here",
};
