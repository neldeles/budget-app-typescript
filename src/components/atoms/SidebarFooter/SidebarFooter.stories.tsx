import { Meta, Story } from "@storybook/react";
import { fakeUser } from "mocks/utils/generateFakeUser";
import { SidebarFooter } from ".";
import { TSidebarFooterProps } from "./SidebarFooter";

export default {
  title: "components/atoms/sidebar/SidebarFooter",
  component: SidebarFooter,
  parameters: {
    componentSubtitle: "To be used within Sidebar component only.",
    docs: {
      source: {
        type: "dynamic",
        excludeDecorators: true,
      },
    },
  },
} as Meta;

export const Default: Story<TSidebarFooterProps> = (args) => (
  <SidebarFooter {...args} />
);
Default.args = {
  user: fakeUser,
};
