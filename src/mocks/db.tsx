import { factory, nullable, primaryKey } from "@mswjs/data";
import faker, { seed, datatype, lorem } from "faker";
import { fakeUser } from "./utils/generateFakeUser";

export const db = factory({
  // Create a "category group" model
  categoryGroup: {
    id: primaryKey(datatype.uuid),
    name: String,
    user_id: () => fakeUser.id,
    // this is the creation date of the row in the DB
    created_at: () => new Date(),
    // category group created in this selected month
    created_on_month: () => new Date(),
    deleted_at: nullable<Date>(() => null),
  },
});
