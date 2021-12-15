import { LoginForm } from ".";
import { Meta, ComponentStory } from "@storybook/react";
import { rest } from "msw";
import { within, userEvent } from "@storybook/testing-library";

export default {
  title: "Screens/LoginScreen/Components/LoginForm",
  component: LoginForm,
  decorators: [
    (Story) => (
      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8 min-h-screen bg-gray-50">
        <Story />
      </div>
    ),
  ],
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

const Template: ComponentStory<typeof LoginForm> = () => <LoginForm />;

export const MockedDefault = Template.bind({});
