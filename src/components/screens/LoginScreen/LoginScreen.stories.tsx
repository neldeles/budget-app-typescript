import { LoginScreen } from ".";

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

export const Default = () => <LoginScreen />;
