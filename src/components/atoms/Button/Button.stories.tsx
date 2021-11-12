import { Button } from ".";
import { TButtonProps } from "./Button";
import { Meta, Story } from "@storybook/react";

export default {
  title: "components/atoms/Button",
  component: Button,
  parameters: {
    componentSubtitle: "Primary UI component for user interaction.",
    docs: {
      source: {
        type: "dynamic",
        excludeDecorators: true,
      },
    },
  },
  args: {
    label: "Button",
  },
} as Meta;

const Template: Story<TButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: "Button",
  loading: false,
};

export const Secondary = Template.bind({});
Secondary.args = {
  ...Primary.args,
  variant: "secondary",
};

Secondary.parameters = {
  docs: {
    description: {
      story:
        "Usually used in conjunction with a primary button so as not to draw attention away from the primary button. Use on the buttons beside the primary.",
    },
  },
};

export const Success = Template.bind({});
Success.args = {
  ...Primary.args,
  variant: "success",
};

Success.parameters = {
  docs: {
    description: {
      story:
        "Use to highlight the most important actions in any experience. Don’t use more than one primary button in a section or screen to avoid overwhelming users.",
    },
  },
};

export const Danger = Template.bind({});
Danger.args = {
  ...Primary.args,
  variant: "danger",
};

Danger.parameters = {
  docs: {
    description: {
      story:
        "Use when the action will delete data or be otherwise difficult to recover from. Destructive buttons should trigger a confirmation dialog before the action is completed. Be thoughtful about using destructive buttons because they can feel stressful for the user.",
    },
  },
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  ...Primary.args,
  width: "full",
};

export const IsLoading = Template.bind({});
IsLoading.args = {
  ...Primary.args,
  loading: true,
};
