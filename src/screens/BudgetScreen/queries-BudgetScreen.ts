import { useMutation, useQuery, useQueryClient } from "react-query";
import * as categoryGroupService from "services/categoryGroupService";
import { generateAuthConfig } from "utils/generateAuthConfig";
import { TCategoryGroupPayload } from "./components/Header/Header";

export const categoryGroupKeys = {
  all: ["categoryGroup"] as const,
  month: (month: categoryGroupService.TSelectedMonth) =>
    [...categoryGroupKeys.all, month] as const,
};

export function useFetchCategoryGroupsMonthQuery(
  selectedMonth: categoryGroupService.TSelectedMonth
) {
  return useQuery(
    categoryGroupKeys.month(selectedMonth),
    () => categoryGroupService.getAll(selectedMonth, generateAuthConfig()),
    {
      placeholderData: [],
    }
  );
}

export function useCreateCategoryGroup() {
  const queryClient = useQueryClient();

  return useMutation(
    (categoryGroup: TCategoryGroupPayload) =>
      categoryGroupService.create(categoryGroup, generateAuthConfig()),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(categoryGroupKeys.all);
      },
    }
  );
}
