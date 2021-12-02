import { factory, nullable, primaryKey } from "@mswjs/data";
import faker, { seed, datatype, lorem } from "faker";
import { fakeUser } from "./utils/generateFakeUser";
import moment from "moment";

export const db = factory({
  // Create a "category group" model
  categoryGroup: {
    id: primaryKey(datatype.uuid),
    name: String,
    user_id: () => fakeUser.id,
    created_at: () => new Date(),
    deleted_at: nullable<Date>(() => null),
  },
});
