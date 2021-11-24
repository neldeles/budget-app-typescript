import { Meta, Story } from "@storybook/react";
import { BudgetScreen } from ".";

export default {
  title: "Components/Screens/BudgetDashboard",
  component: BudgetScreen,
  parameters: {
    docs: {
      inlineStories: false,
      iframeHeight: 600,
    },
  },
} as Meta;

const Template = () => <BudgetScreen />;

export const Default = Template.bind({});
