import { Meta, Story } from "@storybook/react";
import { Sidebar } from ".";
import { TSidebarProps } from "./Sidebar";
import { rest } from "msw";
import { fakeUser } from "mocks/utils/generateFakeUser";

export default {
  title: "Components/Molecules/Sidebar",
  component: Sidebar,
} as Meta;

const Template: Story<TSidebarProps> = (args) => <Sidebar {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "Sidebar Title",
  footer: <Sidebar.Footer />,
};
Default.parameters = {
  msw: [
    rest.get("/auth/is-verify", (req, res, ctx) => {
      return res(ctx.json(fakeUser));
    }),
  ],
};
