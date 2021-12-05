import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { categoryGroupKeys } from "screens/BudgetScreen/queries";

if (process.env.NODE_ENV === "development") {
  const { worker } = require("./mocks/browser");
  worker.start();
}

const queryClient = new QueryClient();
queryClient.setQueryDefaults("user", {
  retry: 0,
  // 8 hours
  staleTime: 1000 * 60 * 60 * 8,
  // If user wasn't logged in in the first check, this won't change until he
  // submits the login form. So we just disable refetchOnWindowFocus.
  refetchOnWindowFocus: false,
});
queryClient.setQueryDefaults(categoryGroupKeys.all, {
  staleTime: 1000 * 20,
});

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
