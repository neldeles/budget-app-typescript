import { rest } from "msw";
import { fakeUser } from "mocks/utils/generateFakeUser";
import { LoginScreen } from ".";
import { Meta, ComponentStory } from "@storybook/react";
import { within, userEvent } from "@storybook/testing-library";

export default {
  title: "Screens/LoginScreen",
  component: LoginScreen,
  parameters: {
    // opt out of decorators rendering in code preview
    docs: {
      source: {
        type: "dynamic",
        excludeDecorators: true,
      },
    },
    actions: {
      handles: ["click button"],
    },
  },
} as Meta;

const Template: ComponentStory<typeof LoginScreen> = () => <LoginScreen />;

export const MockedDefault = Template.bind({});
MockedDefault.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const emailField = await canvas.findByLabelText(/email/i);
  await userEvent.type(emailField, "john.doe@email.com");

  const passwordField = await canvas.findByLabelText(/password/i);
  await userEvent.type(passwordField, "test123");
};

export const MockedLoading = Template.bind({});
MockedLoading.parameters = {
  msw: {
    handlers: [
      // Loading state
      rest.post("/auth/login", (req, res, ctx) => {
        return res(ctx.delay("infinite"));
      }),
    ],
  },
};
MockedLoading.play = async (context) => {
  const canvas = within(context.canvasElement);
  await MockedDefault.play!(context);
  await userEvent.click(
    await canvas.findByRole("button", { name: /sign in/i })
  );
};

export const MockedError = Template.bind({});
MockedError.parameters = {
  msw: {
    handlers: [
      rest.post("/auth/login", (req, res, ctx) => {
        return res(
          ctx.status(400),
          ctx.json({ message: "Incorrect email and/or password. xxxxx" })
        );
      }),
    ],
  },
};
MockedError.play = async (context) => {
  const canvas = within(context.canvasElement);
  await MockedDefault.play!(context);
  await userEvent.click(
    await canvas.findByRole("button", { name: /sign in/i })
  );
};
