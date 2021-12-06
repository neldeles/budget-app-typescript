import { Button } from "components/Button";
import { useDatePicker } from "components/DatePicker/DatePicker";
import { useModal } from "components/Modal/Modal";
import { useField } from "hooks";
import { useMutation, useQueryClient } from "react-query";
import { TSelectedMonth } from "services/categoryGroupService";
import * as categoryService from "services/categoryService";
import { generateAuthConfig } from "utils/generateAuthConfig";

export type TCategoryPayload = {
  name: string;
  categoryGroupId: string;
  createdOnMonth: TSelectedMonth;
};

export function CategoryForm({ categoryGroupId }: { categoryGroupId: string }) {
  const { setIsOpen, initialFocusRef } = useModal();
  const { clearState, ...categoryProps } = useField("category", "text");
  const { state: selectedDate } = useDatePicker();
  const selectedMonth = selectedDate.format("MMM YYYY") as TSelectedMonth;

  // refactor to a custom hook and query factory
  const queryClient = useQueryClient();
  const createCategoryMutation = useMutation(
    (category: TCategoryPayload) =>
      categoryService.create(category, generateAuthConfig()),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("category");
      },
    }
  );

  const createCategory = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: TCategoryPayload = {
      name: categoryProps.value,
      categoryGroupId: categoryGroupId,
      createdOnMonth: selectedMonth,
    };

    createCategoryMutation.mutate(payload);
  };

  return (
    <div className="mx-auto max-w-7xl ">
      <div className="sm:p-6 py-5 px-4">
        {/* possible candidate for atomic component */}
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Create Category
        </h3>
        <form
          onSubmit={createCategory}
          className="sm:flex sm:items-center mt-5"
        >
          <div className="w-full sm:max-w-xs">
            <label htmlFor="email" className="sr-only">
              category
            </label>
            <input
              {...categoryProps}
              ref={initialFocusRef}
              className="block w-full sm:text-sm rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm"
              placeholder=""
              required
              autoFocus
              type="text"
            />
          </div>
          <div className="inline-flex items-center mt-3 sm:mt-0 sm:ml-3 w-full sm:w-auto">
            <Button
              variant="secondary"
              width="default"
              onClick={() => setIsOpen(false)}
              type="button"
            >
              Cancel
            </Button>
          </div>
          <div className="inline-flex items-center mt-3 sm:mt-0 sm:ml-3 w-full sm:w-auto">
            <Button
              variant="primary"
              width="default"
              type="submit"
              onClick={() => setIsOpen(false)}
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
