import { render } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

export function renderWithProviders(
  ui: React.ReactElement,
  {
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] }),
    ...renderOptions
  } = {}
) {
  const testQueryClient = createTestQueryClient();

  function Wrapper({ children }: { children: React.ReactElement }) {
    return (
      <QueryClientProvider client={testQueryClient}>
        <Router location={history.location} navigator={history}>
          {children}
        </Router>
      </QueryClientProvider>
    );
  }

  return {
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    history,
  };
}

// export function renderWithProviders(ui: React.ReactElement) {
//   const testQueryClient = createTestQueryClient();
//   const { rerender, ...result } = render(
//     <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
//   );
//   return {
//     ...result,
//     rerender: (rerenderUi: React.ReactElement) =>
//       rerender(
//         <QueryClientProvider client={testQueryClient}>
//           {rerenderUi}
//         </QueryClientProvider>
//       ),
//   };
// }
