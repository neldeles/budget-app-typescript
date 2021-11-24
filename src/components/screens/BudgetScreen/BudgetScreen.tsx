import { DashboardContainer } from "components/molecules/DashboardContainer";
import { Header } from "components/molecules/Header";
import { Table } from "components/molecules/Table";
import { TUser } from "types/global";
import * as categoryGroupService from "services/categoryGroupService";
import { generateAuthConfig } from "utils/generateAuthConfig";
import { useQuery } from "react-query";

export type TBudgetScreenProps = {
  user: TUser;
};

const noTables = (
  <div className="py-4" aria-label="No Tables">
    <div className="h-96 rounded-lg border-4 border-gray-200 border-dashed" />
  </div>
);

export function BudgetScreen() {
  const categoryGroups = useQuery(
    "categoryGroup",
    () => categoryGroupService.getAll(generateAuthConfig()),
    {
      initialData: [],
    }
  );
  // TODO: fetch all categories of user
  // TODO: Populate each `category_group` table w its corresponding `category` rows (matching `category_group.id`)
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

  // TODO: because we have set initialData, refetch errors will be treated
  // like background errors. Should setup toast error notifications for this.
  if (categoryGroups.error instanceof Error) {
    return <h1>Error: {categoryGroups.error.message}</h1>;
  }

  return (
    <DashboardContainer
      header={<Header />}
      // Non-null assertion because we have set initialData
      // ergo will never be undefined.
      pageContent={
        categoryGroups.data!.length === 0
          ? noTables
          : categoryGroups.data!.map((categoryGroup) => (
              <Table
                key={categoryGroup.id}
                columns={columns}
                data={[]}
                tableName={categoryGroup.name}
              />
            ))
      }
    />
  );
}
