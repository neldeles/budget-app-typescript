import faker from "faker";

faker.seed(123);

export const fakeUser = {
  id: faker.datatype.uuid(),
  name: faker.name.firstName(),
  email: faker.internet.email(),
};

export const fakeUserToken = faker.random.alphaNumeric(15);
