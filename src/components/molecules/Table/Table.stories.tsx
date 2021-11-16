import { Meta, Story } from "@storybook/react";
import { Table } from ".";
import { TTableProps } from "./Table";

export default {
  title: "Components/Molecules/Table",
  component: Table,
  parameters: {
    componentSubtitle: "Primary table template component",
  },
} as Meta;

const Template: Story<TTableProps> = (args) => <Table {...args} />;

const data = [
  {
    col1: "Hello",
    col2: "World",
  },
  {
    col1: "react-table",
    col2: "rocks",
  },
  {
    col1: "whatever",
    col2: "you want",
  },
];

const columns = [
  {
    Header: "Column 1",
    accessor: "col1",
  },
  {
    Header: "Column 2",
    accessor: "col2",
  },
];

export const Default = Template.bind({});
Default.args = {
  tableName: "Some table name",
  columns: columns,
  data: data,
};
