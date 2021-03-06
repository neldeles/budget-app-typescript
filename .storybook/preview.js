import "../src/index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { initialize, mswDecorator } from "msw-storybook-addon";
import { fakeUser } from "mocks/utils/generateFakeUser";
import { rest } from "msw";

// Initialize MSW
initialize();

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      order: ["Introduction", ["Intro", "Installation"], "components"],
    },
  },
  layout: "fullscreen",
  msw: {
    handlers: {
      auth: [
        rest.get("/auth/is-verify", (req, res, ctx) => {
          return res(ctx.json(fakeUser));
        }),
      ],
      wallets: [
        rest.post("/wallets", (req, res, ctx) => {
          return res(ctx.status(201));
        }),
        rest.get("/wallets", (req, res, ctx) => {
          return res(
            ctx.json([
              {
                id: 1,
                name: "Wallet 1",
              },
              {
                id: 2,
                name: "Wallet 2",
              },
            ])
          );
        }),
      ],
    },
  },
};

export const decorators = [
  (Story) => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    return (
      <QueryClientProvider client={queryClient}>
        <Router>{Story()}</Router>
      </QueryClientProvider>
    );
  },
  mswDecorator,
];
