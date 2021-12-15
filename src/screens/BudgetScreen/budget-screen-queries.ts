import { useMutation, useQuery, useQueryClient } from "react-query";
import * as categoryGroupService from "services/categoryGroupService";
import * as categoryService from "services/categoryService";
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
  return useQuery<categoryGroupService.TCategoryGroups, Error>(
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

export const categoryKeys = {
  all: ["categories"] as const,
  withCategoryGroupIds: (categoryGroupIds: Array<string>) =>
    [...categoryKeys.all, categoryGroupIds] as const,
};

export function useFetchCategoriesWithCategoryGroupIdsQuery(
  selectedMonth: categoryGroupService.TSelectedMonth,
  categoryGroupIds: Array<string>
) {
  return useQuery<categoryService.TCategoryTable, Error>(
    categoryKeys.withCategoryGroupIds(categoryGroupIds),
    () => categoryService.getAll(selectedMonth, categoryGroupIds),
    {
      enabled: !!categoryGroupIds,
      placeholderData: [],
    }
  );
}
