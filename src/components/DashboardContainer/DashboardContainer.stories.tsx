import { Meta, Story } from "@storybook/react";
import { DashboardContainer } from ".";
import { TDashboardContainerProps } from "./DashboardContainer";
import { rest } from "msw";
import { fakeUser } from "mocks/utils/generateFakeUser";

const styles = {
  transform: "scale(1)",
  height: "100vh",
};

export default {
  title: "components/DashboardContainer",
  component: DashboardContainer,
  parameters: {
    componentSubtitle: "Primary container for the different dashboard pages",
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
  header: (
    <div className="px-4 sm:px-6 md:px-8 mx-auto max-w-7xl">
      <h1 className="text-2xl font-semibold text-gray-900">
        Some Dashboard Title
      </h1>
    </div>
  ),
  pageContent: (
    <div className="py-4">
      <div className="h-96 rounded-lg border-4 border-gray-200 border-dashed" />
    </div>
  ),
};
