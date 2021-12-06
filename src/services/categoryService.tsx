import axios from "axios";
import { TCategoryPayload } from "screens/BudgetScreen/components/CategoryForm/CategoryForm";
import { TAuthConfig } from "types/global";

export const create = async (
  category: TCategoryPayload,
  config: TAuthConfig
) => {
  const response = await axios.post("/category/", category, config);
  return response.data;
};
