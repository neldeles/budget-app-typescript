import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import App from "App";
import { renderWithClient } from "utils/tests";
import { fakeUserToken } from "mocks/utils/generateFakeUser";
import { db } from "mocks/db";
import moment from "moment";
import { models } from "mocks/db";
import { server } from "mocks/server";
import { rest } from "msw";

type CategoryGroupModelKeys = keyof typeof models["categoryGroup"];
type AnyCategoryGroup = { [K in CategoryGroupModelKeys]?: any };
type RequireKeys<T extends object, K extends keyof T> = Required<Pick<T, K>> &
  Omit<T, K> extends infer O
  ? { [P in keyof O]: O[P] }
  : never;
type Override<T1, T2> = Omit<T1, keyof T2> & T2;
type BaseCategoryGroup = RequireKeys<
  AnyCategoryGroup,
  "name" | "created_in_month" | "deleted_at"
>[];

type TMockCategoryGroups = Override<
  BaseCategoryGroup,
  {
    name: string;
    created_in_month: Date;
    deleted_at: Date | null;
  }[]
>;

function initializeCategoryGroupsDatabase(
  mockCategoryGroups: TMockCategoryGroups
) {
  mockCategoryGroups.forEach((mockCategoryGroup) =>
    db.categoryGroup.create(mockCategoryGroup)
  );
}

test("renders placeholder content if user has no category groups created yet", async () => {
  window.localStorage.setItem("token", fakeUserToken);
  renderWithClient(<App />);
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));
  expect(screen.getByLabelText(/no tables/i)).toBeInTheDocument();
});

test("renders error page", async () => {
  server.use(
    rest.get("/categoryGroups", (req, res, ctx) => {
      return res(ctx.status(404));
    })
  );
  jest.spyOn(console, "error").mockImplementation(jest.fn());
  window.localStorage.setItem("token", fakeUserToken);
  renderWithClient(<App />);
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));
  expect(
    await screen.findByText("Error: Request failed with status code 404")
  ).toBeInTheDocument();
  jest.spyOn(console, "error").mockRestore();
});

describe("if selected date is current date", () => {
  it("should render category groups created in same month", async () => {
    const mockData = [
      {
        name: "Created in same month #1",
        created_in_month: new Date(),
        deleted_at: null,
      },
      {
        name: "Created in same month #2",
        created_in_month: new Date(),
        deleted_at: null,
      },
    ];

    initializeCategoryGroupsDatabase(mockData);

    window.localStorage.setItem("token", fakeUserToken);
    renderWithClient(<App />);
    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));
    // await waitForElementToBeRemoved(() => screen.getByLabelText(/no tables/i));

    expect(await screen.findByText(mockData[0].name)).toBeInTheDocument();
    expect(await screen.findByText(mockData[1].name)).toBeInTheDocument();
  });

  it("should render category groups created in previous months", async () => {
    const now = new Date();
    const currentDate = moment(now);

    const mockData = [
      {
        name: "Previous Month",
        created_in_month: currentDate.subtract(1, "months").toDate(),
        deleted_at: null,
      },
    ];

    initializeCategoryGroupsDatabase(mockData);

    window.localStorage.setItem("token", fakeUserToken);
    renderWithClient(<App />);
    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

    expect(await screen.findByText(mockData[0].name)).toBeInTheDocument();
  });
});

describe("after navigating to a previous month", () => {
  it("should not render category groups created in future months", async () => {
    const mockData = [
      {
        name: "Created in future month #1",
        created_in_month: new Date(),
        deleted_at: null,
      },
      {
        name: "Created in future month #2",
        created_in_month: new Date(),
        deleted_at: null,
      },
    ];

    initializeCategoryGroupsDatabase(mockData);
    window.localStorage.setItem("token", fakeUserToken);
    renderWithClient(<App />);
    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

    const previousMonth = moment().subtract(1, "months").format("MMM YYYY");
    const displayedMonth = screen.getByRole("button", { name: "calendar" });
    userEvent.click(screen.getByRole("button", { name: /previous/i }));
    expect(displayedMonth).toHaveTextContent(previousMonth);

    expect(screen.queryByText(mockData[0].name)).not.toBeInTheDocument();

    expect(screen.queryByText(mockData[1].name)).not.toBeInTheDocument();
  });

  it("should render category groups created in the selected month or older", async () => {
    const now = new Date();
    const currentDate = moment(now);
    const previousMonthDate = currentDate.subtract(1, "months").toDate();

    const mockData = [
      {
        name: "Creation date is the same month",
        created_in_month: previousMonthDate,
        deleted_at: null,
      },
      {
        name: "Creation date is older than the same month",
        created_in_month: currentDate.subtract(4, "months").toDate(),
        deleted_at: null,
      },
    ];

    initializeCategoryGroupsDatabase(mockData);
    window.localStorage.setItem("token", fakeUserToken);
    renderWithClient(<App />);
    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

    const previousMonthString = moment()
      .subtract(1, "months")
      .format("MMM YYYY");
    const displayedMonth = screen.getByRole("button", { name: "calendar" });

    userEvent.click(screen.getByRole("button", { name: /previous/i }));
    expect(displayedMonth).toHaveTextContent(previousMonthString);

    const createdSameMonth = await screen.findByText(mockData[0].name);
    expect(createdSameMonth).toBeInTheDocument();
    const createdOlderThanSameMonth = await screen.findByText(mockData[1].name);
    expect(createdOlderThanSameMonth).toBeInTheDocument();
  });
});

describe("for any selected date", () => {
  it("should not render category groups deleted on or before selected date", async () => {
    const currentDate = new Date();

    const mockData = [
      {
        name: "Deleted on selected date",
        created_in_month: new Date(),
        deleted_at: new Date(),
      },
      {
        name: "Deleted before selected date",
        created_in_month: moment(currentDate).subtract(2, "months").toDate(),
        deleted_at: moment(currentDate).subtract(1, "months").toDate(),
      },
      {
        name: "Deleted on a future date after selected date",
        created_in_month: moment(currentDate).subtract(2, "months").toDate(),
        deleted_at: moment(currentDate).add(1, "months").toDate(),
      },
    ];

    initializeCategoryGroupsDatabase(mockData);

    window.localStorage.setItem("token", fakeUserToken);
    renderWithClient(<App />);
    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));
    // await waitForElementToBeRemoved(() => screen.getByLabelText(/no tables/i));

    expect(screen.queryByText(mockData[0].name)).not.toBeInTheDocument();

    expect(screen.queryByText(mockData[1].name)).not.toBeInTheDocument();

    expect(await screen.findByText(mockData[2].name)).toBeInTheDocument();
  });
});
