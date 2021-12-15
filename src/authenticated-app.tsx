import { Routes, Route } from "react-router-dom";
import { BudgetScreen } from "screens/BudgetScreen";
import { ReportsScreen } from "screens/ReportsScreen";
import { WalletsScreen } from "screens/WalletsScreen";
import { NotFoundScreen } from "screens/NotFoundScreen";

function AuthenticatedApp() {
  return <AppRoutes />;
  // return <h1>{user.name} </h1>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<BudgetScreen />} />
      <Route path="/reports" element={<ReportsScreen />} />
      {/* TODO: Pass walletId as a prop to WalletScreen*/}
      <Route path="/wallet/:walletId" element={<WalletsScreen />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  );
}

export { AuthenticatedApp };
