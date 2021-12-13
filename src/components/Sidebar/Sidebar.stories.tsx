import { Meta, Story } from "@storybook/react";
import { Sidebar } from ".";
import { TSidebarProps } from "./Sidebar";
import { rest } from "msw";
import { fakeUser } from "mocks/utils/generateFakeUser";

export default {
  title: "components/Sidebar",
  component: Sidebar,
  decorators: [
    (Story) => (
      <div className="mb-4 w-1/2">
        <Story />
      </div>
    ),
  ],
} as Meta;

const wallets = [
  {
    id: 1,
    name: "Wallet 1",
  },
  {
    id: 2,
    name: "Wallet 2",
  },
];

const Template: Story<TSidebarProps> = (args) => <Sidebar {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "Sidebar Title",
  footer: <Sidebar.Footer />,
};
Default.parameters = {
  msw: {
    handlers: {
      wallets: rest.get("/wallets", (req, res, ctx) => {
        return res(ctx.json(wallets));
      }),
    },
  },
};
