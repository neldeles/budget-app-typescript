import axios from "axios";
import { TCategoryGroupPayload } from "components/screens/BudgetScreen/components/Header/Header";
import { TAuthConfig } from "types/global";

export type TCategoryGroups = Array<{
  id: number;
  name: string;
  user_id: string;
}>;

export const create = async (
  categoryGroup: TCategoryGroupPayload,
  config: TAuthConfig
) => {
  const response = await axios.post("/categoryGroups/", categoryGroup, config);
  return response.data;
};

export const getAll = async (config: TAuthConfig): Promise<TCategoryGroups> => {
  const response = await axios.get("/categoryGroups/", config);
  return response.data;
};
