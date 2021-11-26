import { QueryClient, QueryClientProvider } from "react-query";

const createStorybookQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

export function renderWithStorybookClient(ui: React.ReactElement) {
  const storybookQueryClient = createStorybookQueryClient();
  return (
    <QueryClientProvider client={storybookQueryClient}>
      {ui}
    </QueryClientProvider>
  );
}
