import { db } from "mocks/db";
import { fakeUserToken } from "mocks/utils/generateFakeUser";
import { rest } from "msw";
import { TCreateWalletPayload } from "services/wallet-service";

type WalletPostRequestBody = TCreateWalletPayload;

export const walletHandlers = [
  rest.post<WalletPostRequestBody>("/wallets", (req, res, ctx) => {
    // Only authenticated users can create a category group.
    if (req.headers.get("token") !== fakeUserToken) {
      return res(ctx.status(403));
    }
    const wallet = req.body;

    db.wallet.create(wallet);

    // Respond with a mocked response.
    return res(ctx.status(201));
  }),
  rest.get("/wallets", (req, res, ctx) => {
    // Only authenticated users can create a category group.
    if (req.headers.get("token") !== fakeUserToken) {
      return res(ctx.status(403));
    }

    const wallets = db.wallet.getAll();

    // Respond with a mocked response.
    return res(ctx.json(wallets));
  }),
];
