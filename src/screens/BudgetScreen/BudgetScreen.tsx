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
import { useFetchCategoryGroupsMonthQuery } from "./queries-BudgetScreen";
import { CategoryForm } from "./components/CategoryForm";

export type TBudgetScreenProps = {
  user: TUser;
};

const noTables = (
  <div className="py-4" aria-label="No Tables">
    <div className="h-96 rounded-lg border-4 border-gray-200 border-dashed" />
  </div>
);

// function CategoryRowForm() {
//   const categoryInput = useField("categoryName", "text");
//   const { clearState, ...categoryFieldProps } = categoryInput;
//   const { initialFocusRef, setIsOpen } = useModal();

//   const currDate = useSelector(selectDashboardDate);

//   const payload = {
//     name: categoryInput.value,
//     date: currDate,
//     category_group_id: categoryGroupId,
//   };

//   const { handleConfirm } = useFormAddCategory(
//     [clearState],
//     addBudgetCategory(payload)
//   );

//   return (
//     <form onSubmit={handleConfirm}>
//       <div tw="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
//         <ModalDismissButton>
//           <button
//             type="button"
//             tw="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//           >
//             <span tw="sr-only">Close</span>
//             <XIcon tw="h-6 w-6" aria-hidden="true" />
//           </button>
//         </ModalDismissButton>
//       </div>
//       <div tw="sm:flex md:flex-col sm:items-start">
//         {title || description ? (
//           <div tw="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
//             {title ? (
//               <Dialog.Title
//                 as="h3"
//                 tw="text-lg leading-6 font-medium text-gray-900"
//               >
//                 {title}
//               </Dialog.Title>
//             ) : null}
//             {description ? (
//               <div tw="mt-2">
//                 <p tw="text-sm text-gray-500">{description}</p>
//               </div>
//             ) : null}
//           </div>
//         ) : null}
//         {/* Insert modal input fields here. Make sure its wrapped div. */}
//         <div tw="mt-1 sm:ml-4 sm:w-3/4">
//           <Input
//             {...categoryFieldProps}
//             placeholder="Example Category"
//             ref={modalRef}
//             required
//           />
//         </div>
//       </div>
//       <div tw="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
//         <ModalDismissButton>
//           <ButtonModal variant="success" type="submit" tw="sm:ml-3">
//             {confirmButtonValue}
//           </ButtonModal>
//         </ModalDismissButton>
//         <ModalDismissButton>
//           <ButtonModal
//             type="reset"
//             onClick={() => console.log("cancel button clicked")}
//             variant="secondary"
//             tw="mt-3 sm:mt-0"
//           >
//             Cancel
//           </ButtonModal>
//         </ModalDismissButton>
//       </div>
//     </form>
//   );
// }

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

  // TODO: Populate each `category_group` table w its corresponding `category` rows (matching `category_group.id`)
  // - [ ] initialize useQuery for "category"
  // DOING:-5 # Ability to add category row entry
  // - [x] add cateogry button beside "category" col header
  // - on click opens modal form
  //    - [x] create modal form
  //    - [ ] should take into account the date selected
  // - on submit creates a new category row
  //    - [ ] pass categoryGroupId to the service handler
  //    - [x] create service handler for category row
  //    - [x] msw mock handler
  //    - [x] useMutation for category row

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
                tableId={categoryGroup.id}
                columns={columns}
                data={[]}
                tableName={categoryGroup.name}
              />
            ))
      }
    />
  );
}
