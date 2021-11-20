import { DashboardContainer } from "components/molecules/DashboardContainer";
import { Header } from "components/molecules/Header";
import { Table } from "components/molecules/Table";
import { TUser } from "types/global";

export type TBudgetScreenProps = {
  user: TUser;
};

export function BudgetScreen({ user }: TBudgetScreenProps) {
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
      // TODO: change to .map that returns a new Table component for each
      //  category group budget
      pageContent={<Table columns={columns} data={data} tableName="Hehehe" />}
    />
  );
}