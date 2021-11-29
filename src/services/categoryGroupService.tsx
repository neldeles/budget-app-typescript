import axios from "axios";
import { TCategoryGroupPayload } from "components/screens/BudgetScreen/components/Header/Header";
import moment from "moment";
import { TAuthConfig } from "types/global";

export type TCategoryGroups = Array<{
  id: number;
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

export const getAll = async (
  currDate: moment.Moment,
  config: TAuthConfig
): Promise<TCategoryGroups> => {
  const response = await axios.get("/categoryGroups/", config);
  const data: TCategoryGroups = response.data;

  const categoryGroups = data.filter((categoryGroup) =>
    currDate.isBefore(categoryGroup.created_at)
  );

  return categoryGroups;
};
