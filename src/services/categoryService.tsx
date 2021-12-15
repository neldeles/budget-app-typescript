import axios from "axios";
import * as qs from "qs";
import { TCategoryPayload } from "screens/BudgetScreen/components/CategoryForm/CategoryForm";
import { generateAuthConfig } from "utils/generateAuthConfig";
import { TSelectedMonth } from "./categoryGroupService";

export type TCategoryTableData = {
  category: string;
  budgeted: number;
  activity: number;
  available: number;
};

export type TCategoryTable = {
  categoryGroupId: string;
  data: TCategoryTableData;
}[];

export const create = async (category: TCategoryPayload) => {
  const response = await axios.post(
    "/categories",
    category,
    generateAuthConfig()
  );

  return response.data;
};

export const getAll = async (
  selectedMonth: TSelectedMonth,
  categoryGroupIds: Array<string>
): Promise<TCategoryTable> => {
  const params = {
    params: {
      month: selectedMonth,
      categoryGroupIds: categoryGroupIds,
    },
    paramsSerializer: (params: unknown) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  };
  const response = await axios.get(
    `/categories`,
    generateAuthConfig(params) //?
  );

  return response.data;
};
