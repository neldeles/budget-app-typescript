import { Meta, Story } from "@storybook/react";
import { BudgetScreen } from ".";
import { rest } from "msw";
import { fakeUser } from "mocks/utils/generateFakeUser";
import { TCategoryGroups } from "services/categoryGroupService";

export default {
  title: "Components/Screens/BudgetScreen",
  component: BudgetScreen,
  parameters: {
    docs: {
      inlineStories: false,
      iframeHeight: 600,
    },
  },
} as Meta;

const auth = [
  rest.get("/auth/is-verify", (req, res, ctx) => {
    return res(ctx.json(fakeUser));
  }),
];

const categoryGroup = [
  rest.get("/categoryGroups", (req, res, ctx) => {
    const userCategoryGroups: TCategoryGroups = [
      {
        id: 1,
        name: "John Doe",
        user_id: "123445",
      },
    ];
    return res(ctx.json(userCategoryGroups));
  }),
];

const Template: Story = () => <BudgetScreen />;

export const Default = Template.bind({});
Default.parameters = {
  // msw: [...auth, ...categoryGroup],
  msw: [
    rest.get("/auth/is-verify", (req, res, ctx) => {
      return res(ctx.json(fakeUser));
    }),
    ...categoryGroup,
  ],
};
