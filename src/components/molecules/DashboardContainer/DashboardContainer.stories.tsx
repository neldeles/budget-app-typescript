import { Meta, Story } from "@storybook/react";
import { DashboardContainer } from ".";
import { TDashboardContainerProps } from "./DashboardContainer";
import { Sidebar } from "../Sidebar";
import { fakeUser } from "mocks/utils/generateFakeUser";

export default {
  title: "Components/Molecules/DashboardContainer",
  component: DashboardContainer,
  parameters: {
    componentSubtitle: "Container for the different dashboard pages",
    docs: {
      // page: DashboardContainerMdx,
      inlineStories: false,
    },
  },
} as Meta;

const Template: Story<TDashboardContainerProps> = (args) => (
  <DashboardContainer {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: "Some Dashboard Title",
  sidebar: (
    <Sidebar title="Budget App" footer={<Sidebar.Footer user={fakeUser} />} />
  ),
  pageContent: (
    <div className="py-4">
      <div className="h-96 rounded-lg border-4 border-gray-200 border-dashed" />
    </div>
  ),
};
Default.parameters = {
  docs: { iframeHeight: 600 },
};
