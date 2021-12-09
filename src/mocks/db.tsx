import { factory, manyOf, nullable, oneOf, primaryKey } from "@mswjs/data";
import { seed, datatype } from "faker";
import { fakeUser } from "./utils/generateFakeUser";

/**
 * @property {object} categoryGroup - The model for a categoryGroup.
 * @property {date} categoryGroup.created_at - The creation date of the row in the database.
 * @property {date} categoryGroup.created_in_month - The month-year value of the Datepicker the categoryGroup is created in.
 */
export const models = {
  categoryGroup: {
    id: primaryKey(datatype.uuid),
    name: String,
    user_id: () => fakeUser.id,
    created_at: () => new Date(),
    created_in_month: () => new Date(),
    deleted_at: nullable<Date>(() => null),
  },
  category: {
    id: primaryKey(datatype.uuid),
    name: String,
    user_id: () => fakeUser.id,
    created_at: () => new Date(),
    created_on_month: () => new Date(),
    categoryGroup: oneOf("categoryGroup"),
    deleted_at: nullable<Date>(() => null),
  },
};

export const db = factory(models);
