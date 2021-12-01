import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import App from "App";
import { renderWithClient } from "utils/tests";
import { fakeUserToken } from "mocks/utils/generateFakeUser";
import { db } from "mocks/db";
import moment from "moment";

function initializeCategoryGroupsDatabase() {
  const now = new Date();
  const currentDate = moment(now);

  const mockCategoryGroups = [
    {
      name: "Current Month #1",
      deleted_at: null,
    },
    {
      name: "Current Month #2",
      deleted_at: null,
    },
    {
      name: "Previous Month",
      created_at: currentDate.subtract(1, "months").toDate(),
      deleted_at: null,
    },
    {
      name: "Older than previous month",
      created_at: currentDate.subtract(4, "months").toDate(),
      deleted_at: null,
    },
  ];

  mockCategoryGroups.forEach((categoryGroup) =>
    db.categoryGroup.create(categoryGroup)
  );

  return {
    mockCategoryGroups,
  };
}

test("renders placeholder content if user has no category groups created yet", async () => {
  window.localStorage.setItem("token", fakeUserToken);
  renderWithClient(<App />);
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));
  expect(screen.getByLabelText(/no tables/i)).toBeInTheDocument();
});

describe("if selected date is current date", () => {
  it("should render category groups created in same month", async () => {
    const { mockCategoryGroups } = initializeCategoryGroupsDatabase();

    window.localStorage.setItem("token", fakeUserToken);
    renderWithClient(<App />);
    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));
    await waitForElementToBeRemoved(() => screen.getByLabelText(/no tables/i));

    expect(
      screen.getByText(mockCategoryGroups[0].name, { exact: false })
    ).toBeInTheDocument();

    expect(
      screen.getByText(mockCategoryGroups[1].name, { exact: false })
    ).toBeInTheDocument();
  });

  it("should render category groups created in previous months", async () => {
    const { mockCategoryGroups } = initializeCategoryGroupsDatabase();

    window.localStorage.setItem("token", fakeUserToken);
    renderWithClient(<App />);
    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

    await waitForElementToBeRemoved(() => screen.getByLabelText(/no tables/i));

    expect(screen.getByText(mockCategoryGroups[2].name)).toBeInTheDocument();
  });
});

describe("if selected date is a previous month", () => {
  it("should not render category groups created in future months", async () => {
    const { mockCategoryGroups } = initializeCategoryGroupsDatabase();
    window.localStorage.setItem("token", fakeUserToken);
    renderWithClient(<App />);
    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

    const previousMonth = moment().subtract(1, "months").format("MMM YYYY");
    const displayedMonth = screen.getByRole("button", { name: "calendar" });
    userEvent.click(screen.getByRole("button", { name: /previous/i }));
    expect(displayedMonth).toHaveTextContent(previousMonth);

    await waitForElementToBeRemoved(() => screen.getByLabelText(/no tables/i));

    expect(
      screen.queryByText(mockCategoryGroups[0].name)
    ).not.toBeInTheDocument();

    expect(
      screen.queryByText(mockCategoryGroups[1].name)
    ).not.toBeInTheDocument();
  });

  it("should render category groups created in same month or older", async () => {
    const { mockCategoryGroups } = initializeCategoryGroupsDatabase();
    window.localStorage.setItem("token", fakeUserToken);
    renderWithClient(<App />);
    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

    const previousMonth = moment().subtract(1, "months").format("MMM YYYY");
    const displayedMonth = screen.getByRole("button", { name: "calendar" });
    userEvent.click(screen.getByRole("button", { name: /previous/i }));
    expect(displayedMonth).toHaveTextContent(previousMonth);

    await waitForElementToBeRemoved(() => screen.getByLabelText(/no tables/i));

    const createdSameMonth = await screen.findByText(
      mockCategoryGroups[2].name
    );
    expect(createdSameMonth).toBeInTheDocument();
    const createdOlderThanSameMonth = await screen.findByText(
      mockCategoryGroups[3].name
    );
    expect(createdOlderThanSameMonth).toBeInTheDocument();
  });
});
