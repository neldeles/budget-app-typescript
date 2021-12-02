import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import App from "App";
import { renderWithClient } from "utils/tests";
import { fakeUserToken } from "mocks/utils/generateFakeUser";
import { db } from "mocks/db";
import moment from "moment";

type TMockCategoryGroups = {
  name: string;
  deleted_at: Date | null;
}[];

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

describe("if selected date is current date", () => {
  it("should render category groups created in same month", async () => {
    const mockData = [
      {
        name: "Created in same month #1",
        deleted_at: null,
      },
      {
        name: "Created in same month #2",
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
        created_at: currentDate.subtract(1, "months").toDate(),
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
        deleted_at: null,
      },
      {
        name: "Created in future month #2",
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

  it("should render category groups created in same month or older", async () => {
    const now = new Date();
    const currentDate = moment(now);
    const previousMonthDate = currentDate.subtract(1, "months").toDate();

    const mockData = [
      {
        name: "Creation date is the same month",
        created_at: previousMonthDate,
        deleted_at: null,
      },
      {
        name: "Creation date is older than the same month",
        created_at: currentDate.subtract(4, "months").toDate(),
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

    await waitForElementToBeRemoved(() => screen.getByLabelText(/no tables/i));

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
        deleted_at: new Date(),
      },
      {
        name: "Deleted before selected date",
        created_at: moment(currentDate).subtract(2, "months").toDate(),
        deleted_at: moment(currentDate).subtract(1, "months").toDate(),
      },
      {
        name: "Deleted on a future date after selected date",
        created_at: moment(currentDate).subtract(2, "months").toDate(),
        deleted_at: moment(currentDate).add(1, "months").toDate(),
      },
    ];

    initializeCategoryGroupsDatabase(mockData);

    window.localStorage.setItem("token", fakeUserToken);
    renderWithClient(<App />);
    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));
    await waitForElementToBeRemoved(() => screen.getByLabelText(/no tables/i));

    expect(screen.queryByText(mockData[0].name)).not.toBeInTheDocument();

    expect(screen.queryByText(mockData[1].name)).not.toBeInTheDocument();

    expect(screen.getByText(mockData[2].name)).toBeInTheDocument();
  });
});
