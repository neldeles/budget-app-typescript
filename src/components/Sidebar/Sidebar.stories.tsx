import { Meta, Story } from "@storybook/react";
import { Sidebar } from ".";
import { TSidebarProps } from "./Sidebar";

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

const Template: Story<TSidebarProps> = (args) => <Sidebar {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "Sidebar Title",
  footer: <Sidebar.Footer />,
};
