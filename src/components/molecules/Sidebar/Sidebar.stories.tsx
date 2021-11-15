import { Meta, Story } from "@storybook/react";
import { Sidebar } from ".";

import { HomeIcon, ChartBarIcon, FolderIcon } from "@heroicons/react/outline";

// Components
import { Navigation } from "components/atoms/navigation/Navigation";
import { TSidebarProps } from "./Sidebar";

export default {
  title: "Components/Molecules/Sidebar",
  component: Sidebar,
} as Meta;

const items = [
  {
    label: "Budget",
    href: "#",
    current: true,
    icon: HomeIcon,
  },
  {
    label: "Reports",
    href: "#",
    current: false,
    icon: ChartBarIcon,
  },
];

const Template: Story<TSidebarProps> = (args) => <Sidebar {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "Sidebar Title",
  children: (
    <Navigation>
      {items.map((item) => (
        <Navigation.Item key={item.label} {...item} />
      ))}
      <Navigation.ItemSubMenu
        key="wallet"
        label="Wallets"
        icon={FolderIcon}
        navSubItems={[]}
      />
    </Navigation>
  ),
};
