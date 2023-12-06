import React from "react";
import Navigation from "./components/navigation/navigation";
import Dashboard from "./components/dashboard/dashboard";
import Transactions from "./components/transactions/transactions";

const App: React.FC = () => {
  return (
    <div>
      <div className="container" id="container">
        <Navigation />
        <Dashboard />
        <Transactions />
      </div>
    </div>
  );
};
// nn
export default App;
