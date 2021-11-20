import { factory, primaryKey } from "@mswjs/data";
import { seed, datatype, lorem } from "faker";

export const db = factory({
  // Create a "category group" model
  categoryGroup: {
    id: primaryKey(datatype.uuid),
    name: lorem.word,
  },
});
