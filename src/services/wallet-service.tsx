import axios from "axios";
import { TNavSubItems } from "components/navigation/NavItemSubmenu/NavItemSubmenu";
import { generateAuthConfig } from "utils/generateAuthConfig";

export type TCreateWalletPayload = {
  name: string;
};

export const create = async (wallet: TCreateWalletPayload) => {
  const response = await axios.post("/wallets", wallet, generateAuthConfig());

  return response.data;
};

export const getAll = async (): Promise<TNavSubItems[]> => {
  const response = await axios.get("/wallets", generateAuthConfig());

  const wallets: TNavSubItems[] = response.data.map(
    (wallet: { id: number; name: string }) => {
      return {
        id: wallet.id,
        label: wallet.name,
        to: `/wallets/${wallet.id}`,
      };
    }
  );

  return wallets;
};
