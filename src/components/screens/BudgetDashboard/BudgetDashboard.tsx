import { DashboardContainer } from "components/molecules/DashboardContainer";
import { Header } from "components/molecules/Header";
import { Table } from "components/molecules/Table";
import { TUser } from "types/global";

export type TBudgetDashboardProps = {
  user: TUser;
};

export function BudgetDashboard({ user }: TBudgetDashboardProps) {
  const columns = [
    {
      Header: "category",
      accessor: "category",
    },
    {
      Header: "budgeted",
      accessor: "budgeted",
    },
    {
      Header: "activity",
      accessor: "activity",
    },
    {
      Header: "available",
      accessor: "available",
    },
  ];

  const data = [
    {
      category: "test",
      budgeted: "this",
      activity: "out",
      available: "yeaaa",
    },
  ];

  return (
    <DashboardContainer
      header={<Header />}
      user={user}
      pageContent={<Table columns={columns} data={data} tableName="Hehehe" />}
    />
  );
}
