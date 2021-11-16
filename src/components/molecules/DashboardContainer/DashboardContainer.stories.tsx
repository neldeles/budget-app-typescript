import { Meta, Story } from "@storybook/react";
import { DashboardContainer } from ".";
import { TDashboardContainerProps } from "./DashboardContainer";
import { fakeUser } from "mocks/utils/generateFakeUser";

const styles = {
  transform: "scale(1)",
  height: "100vh",
};

export default {
  title: "Components/Molecules/DashboardContainer",
  component: DashboardContainer,
  parameters: {
    componentSubtitle: "Container for the different dashboard pages",
    docs: {
      // page: DashboardContainerMdx,
      source: {
        type: "dynamic",
        excludeDecorators: true,
      },
    },
  },
  decorators: [(storyFn) => <div style={styles}>{storyFn()}</div>],
} as Meta;

const Template: Story<TDashboardContainerProps> = (args) => (
  <DashboardContainer {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: "Some Dashboard Title",
  user: fakeUser,
  pageContent: (
    <div className="py-4">
      <div className="h-96 rounded-lg border-4 border-gray-200 border-dashed" />
    </div>
  ),
};
// Default.parameters = {
//   docs: { iframeHeight: 600 },
// };
