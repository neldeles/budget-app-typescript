import { Link } from ".";
import { BrowserRouter as Router } from "react-router-dom";

export default {
  title: "components/atoms/Link",
  component: Link,
  decorators: [
    (Story) => (
      <Router>
        <Story />
      </Router>
    ),
  ],
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
