import { Meta } from "@storybook/react";
import { Sidebar } from ".";

export default {
  title: "Components/Molecules/Sidebar",
  component: Sidebar,
} as Meta;

export const Default = () => <Sidebar title="Sidebar Title" />;
