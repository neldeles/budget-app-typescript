import { rest } from "msw";
import { fakeUser } from "mocks/utils/generateFakeUser";
import { LoginScreen } from ".";
import { Story } from "@storybook/react";

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

export const Default: Story = () => <LoginScreen />;
Default.parameters = {
  msw: [
    rest.get("/auth/is-verify", (req, res, ctx) => {
      return res(ctx.json(fakeUser));
    }),
  ],
};
