import { classNames } from "utils/classNames";
import { PlusIcon } from "@heroicons/react/solid";
import { Modal } from "components/atoms/Modal";
import { DashboardContainer } from "components/molecules/DashboardContainer";
import { useMemo } from "react";
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
  // DOING:0 # Ability to add category row entry
  // - [ ] add cateogry button beside "category" col header
  // - on click opens modal form
  //    - [ ] create modal form
  // - on submit creates a new category row
  //    - [ ] create category row service handler
  //    - [ ] msw mock handler
  //    - [ ] useQuery for category row
  const columns = useMemo(
    () => [
      {
        Header: () => {
          return (
            <div className="inline-flex items-center">
              <Modal>
                <span>category</span>
                <Modal.OpenButton>
                  <button
                    className={classNames(
                      // "inline-flex items-center ml-2 padding[0.1rem]",
                      "inline-flex items-center ml-2 ",
                      "text-white bg-gray-400 rounded-full border border-transparent shadow-sm",
                      "hover:bg-green-400",
                      "active:bg-green-400 active:ring-2 active:ring-green-500 active:ring-offset-2 active:outline-none",
                      "focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:outline-none",
                      "focus:outline-none"
                    )}
                  >
                    <PlusIcon className="w-4 h-4" aria-hidden="true" />
                  </button>
                </Modal.OpenButton>
                <Modal.Content>
                  {/* <FormAddCategory
                      confirmButtonValue="Submit"
                      categoryGroupId={props.initialState}
                      title="Create Category"
                    /> */}
                  Some content
                </Modal.Content>
              </Modal>
            </div>
          );
        },
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
    ],
    []
  );

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
