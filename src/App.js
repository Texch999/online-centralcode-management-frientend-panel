import React from "react";
import "./App.css";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/home/Homepage";
import Header from "./components/Header";
import Casino from "./pages/casino/Casino";
import RiskLimitSet from "./pages/risk-management/RiskLimitSet";
import ManagementTeam from "./pages/add-team/ManagementTeam";
import RiskSports from "./pages/risk-management/RiskSports";
import AddDirectorAdmin from "./pages/add-team/AddDirectorAdmin";
import RiskBetHistory from "./pages/risk-management/RiskBetHistory";

function App() {
  const isLoggedIn = localStorage?.getItem("isLoggedIn");
  const role = localStorage?.getItem("role");
  return (
    <div>
      {!isLoggedIn ? (
        <Login />
      ) : (
        <div>
          {isLoggedIn && <Header />}
          <div className="home">
            <Routes>
              <Route path="/dashboard" element={<Homepage />} />
              <Route path="/casino" element={<Casino />} />
              <Route path="/risk-limit-set" element={<RiskLimitSet />} />
              <Route path="/management-team" element={<ManagementTeam />} />
              <Route path="/director-admin" element={<AddDirectorAdmin />} />
              <Route path="/risk-sports" element={<RiskSports />} />
              <Route
                path="/risk-bet-history/:matchName"
                element={<RiskBetHistory />}
              />
            </Routes>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
