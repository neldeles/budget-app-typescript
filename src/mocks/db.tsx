import { factory, nullable, primaryKey } from "@mswjs/data";
import faker, { seed, datatype, lorem } from "faker";
import { fakeUser } from "./utils/generateFakeUser";

export const db = factory({
  // Create a "category group" model
  categoryGroup: {
    id: primaryKey(datatype.uuid),
    name: String,
    user_id: () => fakeUser.id,
    created_at: () => new Date(),
    deleted_at: nullable(Date),
  },
});

export const mockCategoryGroups = [
  {
    name: "Group 1",
  },
  {
    name: "Group 2",
  },
  {
    name: "I should not render",
    created_at: new Date("2021-01-01"),
  },
];
