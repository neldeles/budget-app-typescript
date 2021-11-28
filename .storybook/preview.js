import "../src/index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { initialize, mswDecorator } from "msw-storybook-addon";
import { ReactQueryDevtools } from "react-query/devtools";

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
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export const decorators = [
  (Story) => (
    <QueryClientProvider client={queryClient}>
      <Router>{Story()}</Router>
    </QueryClientProvider>
  ),
  mswDecorator,
];
