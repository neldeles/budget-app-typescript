import { LoginForm } from ".";

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
    },
  },
};

const Template = (args) => <LoginForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  loading: false,
};

export const Loading = Template.bind({});
Loading.args = {
  ...Default.args,
  loading: true,
};
