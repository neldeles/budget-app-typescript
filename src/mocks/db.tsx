import { factory, primaryKey } from "@mswjs/data";
import { seed, datatype, lorem } from "faker";
import { fakeUser } from "./utils/generateFakeUser";

export const db = factory({
  // Create a "category group" model
  categoryGroup: {
    id: primaryKey(datatype.uuid),
    name: String,
    user_id: () => fakeUser.id,
  },
});
