import React from "react";
import Navigation from "./components/navigation/navigation";
import Dashboard from "./components/dashboard/dashboard";

const App: React.FC = () => {
  return (
    <div>
      <div className="container" id="container">
        <Navigation />
        <Dashboard />
      </div>
    </div>
  );
};
// nn
export default App;
