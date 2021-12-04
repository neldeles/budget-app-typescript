import { useQuery } from "react-query";
import * as categoryGroupService from "services/categoryGroupService";
import { generateAuthConfig } from "utils/generateAuthConfig";

export const categoryGroupKeys = {
  all: ["categoryGroup"] as const,
  month: (month: categoryGroupService.TSelectedMonth) =>
    [...categoryGroupKeys.all, month] as const,
};

export function useUpdateCategoryGroupMonthQuery(
  selectedMonth: categoryGroupService.TSelectedMonth
) {
  return useQuery(
    categoryGroupKeys.month(selectedMonth),
    () => categoryGroupService.getAll(selectedMonth, generateAuthConfig()),
    {
      initialData: [],
    }
  );
}
