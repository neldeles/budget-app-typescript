import { Routes, Route } from "react-router-dom";
import { BudgetScreen } from "components/screens/BudgetScreen";
import { ReportsScreen } from "components/screens/ReportsScreen";
import { WalletsScreen } from "components/screens/WalletsScreen";
import { NotFoundScreen } from "components/screens/NotFoundScreen";

function AuthenticatedApp() {
  return <AppRoutes />;
  // return <h1>{user.name} </h1>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<BudgetScreen />} />
      <Route path="/reports" element={<ReportsScreen />} />
      <Route path="/wallet/:walletId" element={<WalletsScreen />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  );
}

export { AuthenticatedApp };
