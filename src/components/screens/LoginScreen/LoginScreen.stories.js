import { LoginScreen } from ".";

import * as LoginFormStories from "components/molecules/LoginForm/LoginForm.stories";

export default {
  title: "components/screens/LoginScreen",
  component: LoginScreen,
  parameters: {
    // opt out of decorators rendering in code preview
    docs: {
      source: {
        type: "dynamic",
        excludeDecorators: true,
      },
    },
  },
};

const Template = (args) => <LoginScreen {...args} />;

export const Default = Template.bind({});
Default.args = {
  header: "Sign in to your account",
  loading: LoginFormStories.Default.args.loading,
};

export const Loading = Template.bind({});
Loading.args = {
  ...Default.args,
  loading: LoginFormStories.Loading.args.loading,
};
