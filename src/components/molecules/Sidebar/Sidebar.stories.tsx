import { Meta, Story } from "@storybook/react";
import { Sidebar } from ".";
import { TSidebarProps } from "./Sidebar";

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
