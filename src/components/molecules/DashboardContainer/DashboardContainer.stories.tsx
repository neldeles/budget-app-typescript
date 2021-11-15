import { Meta, Story } from "@storybook/react";
import { DashboardContainer } from ".";
import DashboardContainerMdx from "./DashboardContainer.mdx";

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

const Template: Story = (args) => <DashboardContainer {...args} />;

export const Default = Template.bind({});
Default.parameters = {
  docs: { iframeHeight: 600 },
};
