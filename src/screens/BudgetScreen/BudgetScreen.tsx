import React, { useMemo } from "react";
import { classNames } from "utils/classNames";
import { PlusIcon } from "@heroicons/react/solid";
import { Modal } from "components/Modal";
import { DashboardContainer } from "components/DashboardContainer";
import { Header } from "screens/BudgetScreen/components/Header";
import { Table } from "components/Table";
import { TUser } from "types/global";
import * as categoryGroupService from "services/categoryGroupService";
import {
  DatePickerProvider,
  useDatePicker,
} from "components/DatePicker/DatePicker";
import { useFetchCategoryGroupsMonthQuery } from "./budget-screen-queries";
import { CategoryForm } from "./components/CategoryForm";
import { useQuery } from "react-query";
import * as categoryService from "services/categoryService";

export type TBudgetScreenProps = {
  user: TUser;
};

const noTables = (
  <div className="py-4" aria-label="No Tables">
    <div className="h-96 rounded-lg border-4 border-gray-200 border-dashed" />
  </div>
);

export function BudgetScreen() {
  return (
    <DatePickerProvider>
      <BudgetScreenContents />
    </DatePickerProvider>
  );
}

function BudgetScreenContents() {
  const { state: selectedDate } = useDatePicker();
  const selectedMonth = selectedDate.format(
    "MMM YYYY"
  ) as categoryGroupService.TSelectedMonth;

  const categoryGroups = useFetchCategoryGroupsMonthQuery(selectedMonth);

  const categoryGroupIds = categoryGroups.data?.map(
    (categoryGroup) => categoryGroup.id
  );

  const categories = useQuery(
    ["categories", categoryGroupIds],
    () => categoryService.getAll(selectedMonth, categoryGroupIds),
    {
      enabled: !!categoryGroupIds,
      placeholderData: [],
    }
  );

  const columns = useMemo(
    () => [
      {
        Header: (props: any) => {
          return (
            <div className="inline-flex items-center">
              <Modal>
                <span>category</span>
                <Modal.OpenButton>
                  <button
                    className={classNames(
                      // "inline-flex items-center ml-2 padding[0.1rem]",
                      "inline-flex items-center p-0.5 ml-2",
                      "text-white bg-gray-400 rounded-full border border-transparent shadow-sm",
                      "hover:bg-green-400",
                      "active:bg-green-400 active:ring-2 active:ring-green-500 active:ring-offset-2 active:outline-none",
                      "focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:outline-none",
                      "focus:outline-none"
                    )}
                  >
                    <span className="sr-only">Add category</span>
                    <PlusIcon className="w-4 h-4" aria-hidden="true" />
                  </button>
                </Modal.OpenButton>
                <Modal.Content>
                  {/* <FormAddCategory
                      confirmButtonValue="Submit"
                      categoryGroupId={props.initialState}
                      title="Create Category"
                    /> */}
                  <CategoryForm categoryGroupId={props.initialState} />
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
                tableId={categoryGroup.id}
                columns={columns}
                data={
                  categories.data
                    ? categories.data
                        .filter(
                          (category) =>
                            category.categoryGroupId === categoryGroup.id
                        )
                        .map((category) => category.data)
                    : []
                }
                tableName={categoryGroup.name}
              />
            ))
      }
    />
  );
}
