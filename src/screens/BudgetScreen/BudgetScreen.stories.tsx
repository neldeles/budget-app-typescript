import { Meta, ComponentStory } from "@storybook/react";
import { BudgetScreen } from ".";
import { rest } from "msw";
import { fakeUser } from "mocks/utils/generateFakeUser";
import { TCategoryGroups } from "services/categoryGroupService";
import { within, userEvent, screen } from "@storybook/testing-library";

export default {
  title: "Screens/BudgetScreen",
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
        id: "1",
        name: "John Doe",
        user_id: "123445",
        created_at: new Date(),
        deleted_at: null,
      },
    ];
    return res(ctx.json(userCategoryGroups));
  }),
];

const category = [
  rest.get("/category", (req, res, ctx) => {
    const category = [
      {
        id: 1,
        name: "Food",
        user_id: "12345",
        deleted_at: null,
      },
    ];
    return res(ctx.json(category));
  }),
];

const Template: ComponentStory<typeof BudgetScreen> = () => <BudgetScreen />;

export const Default = Template.bind({});
Default.parameters = {
  msw: { handlers: [...auth, ...categoryGroup] },
};

export const Error = Template.bind({});
Error.parameters = {
  msw: {
    handlers: [
      ...auth,
      rest.get("/categoryGroups", (req, res, ctx) => {
        return res(ctx.status(403));
      }),
    ],
  },
};

export const CreateCategory = Template.bind({});
// TODO: # Make auth/is-verify a global handler
CreateCategory.parameters = {
  msw: { handlers: [...auth, ...categoryGroup, ...category] },
};
CreateCategory.play = async (context) => {
  const canvas = within(context.canvasElement);
  await userEvent.click(
    await canvas.findByRole("button", { name: /add category/i })
  );
};
