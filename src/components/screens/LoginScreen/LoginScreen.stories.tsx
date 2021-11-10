import { LoginScreen } from ".";
import { Heading } from "components/atoms/Heading";
import { LoginForm } from "components/molecules/LoginForm";

// types
import { Meta, Story } from "@storybook/react";
import { TLoginScreenProps } from "./LoginScreen";

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
} as Meta;

const Template: Story<TLoginScreenProps> = (args) => <LoginScreen {...args} />;

export const Default = Template.bind({});
Default.args = {
  heading: (
    <Heading
      headingLevel="h2"
      size="large"
      alignment="center"
      value="Sign in to your account"
    />
  ),
  // @ts-ignore setUser does nothing
  form: <LoginForm loading={false} />,
};

// export const Loading = Template.bind({});
// Loading.args = {
//   ...Default.args,
//   loading: LoginFormStories.Loading.args.loading,
// };
