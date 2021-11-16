import { Meta, Story } from "@storybook/react";
import { fakeUser } from "mocks/utils/generateFakeUser";
import { BudgetDashboard } from ".";
import { TBudgetDashboardProps } from "./BudgetDashboard";

export default {
  title: "Components/Screens/BudgetDashboard",
  component: BudgetDashboard,
  parameters: {
    docs: {
      inlineStories: false,
      iframeHeight: 600,
    },
  },
} as Meta;

const Template: Story<TBudgetDashboardProps> = (args) => (
  <BudgetDashboard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  user: fakeUser,
};
