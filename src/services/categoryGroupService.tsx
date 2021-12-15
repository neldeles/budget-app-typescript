import axios from "axios";
import { TCategoryGroupPayload } from "screens/BudgetScreen/components/Header/Header";
import { TAuthConfig } from "types/global";

export type TCategoryGroups = Array<{
  id: string;
  name: string;
  user_id: string;
  created_at: Date;
  deleted_at: null | Date;
}>;

export const create = async (
  categoryGroup: TCategoryGroupPayload,
  config: TAuthConfig
) => {
  const response = await axios.post("/categoryGroups/", categoryGroup, config);
  return response.data;
};

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;
type TMonths = typeof months[number];
export type TSelectedMonth = `${TMonths} ${number}`;

export const getAll = async (
  selectedMonth: TSelectedMonth,
  config: TAuthConfig
): Promise<TCategoryGroups> => {
  const response = await axios.get(
    `/categoryGroups?month=${selectedMonth}`,
    config
  );

  return response.data;
};
