import { LoginForm } from ".";
import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/react";
import { rest } from "msw";

export default {
  title: "components/molecules/LoginForm",
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
      description: {
        component:
          "Populate email and password fields and submit. Button will turn into loading state.",
      },
    },
  },
} as Meta;

const withPreventDefault = (action: any) => (e: React.SyntheticEvent) => {
  e.preventDefault();
  // this won't ever be undefined because we have a default value for onSubmit
  return action!(e);
};

const Template: Story = () => <LoginForm />;

// TODO: Fix msw add-on issue once we get reply from Github issue
export const MockedDefault = Template.bind({});
// onSubmit: withPreventDefault(action("onSubmit")),
MockedDefault.parameters = {
  msw: [
    // Loading state
    rest.post("/auth/login", (req, res, ctx) => {
      return res(ctx.delay("infinite"));
    }),
  ],
};

export const MockedError = Template.bind({});
MockedError.parameters = {
  msw: [
    rest.post("/auth/login", (req, res, ctx) => {
      return res(
        ctx.status(400),
        ctx.json({ message: "Incorrect email and/or password. xxxxx" })
      );
    }),
  ],
  docs: {
    description: {
      story:
        "Populate email and password fields and submit to mock the error state.",
    },
  },
};
