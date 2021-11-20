import { Meta, Story } from "@storybook/react";
import { fakeUser } from "mocks/utils/generateFakeUser";
import { BudgetScreen } from ".";
import { TBudgetScreenProps } from "./BudgetScreen";

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

const Template: Story<TBudgetScreenProps> = (args) => (
  <BudgetScreen {...args} />
);

export const Default = Template.bind({});
Default.args = {
  user: fakeUser,
};
