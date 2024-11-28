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
import DashboardViewAll from "./pages/home/DashboardViewAll";
import RiskBetHistory from "./pages/risk-management/RiskBetHistory";
import CasinoVendor from "./pages/casino/CasinoVendor";
import CasinoGames from "./pages/casino/CasinoGames";
import VendorRegistration from "./pages/vendor-registration/VendorRegistration";
import UserProfileDashboard from "./pages/add-team/UserProfileDasboard";
import RiskCasino from "./pages/risk-management/RiskCasino";
import Sports from "./pages/sports/Sports";
import FancyResult from "./pages/fancy-result/FancyResult";
import MarketResult from "./pages/market-result/MarketResult";
import LiveBetList from "./pages/risk-management/LiveBetList";
import SportProviders from "./pages/sports/SportProviders";
import DeletedBetHistory from "./pages/risk-management/DeletedBetHistory";
import CheatAlertBets from "./pages/risk-management/CheatAlertBets";

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
              <Route path="/downline-list" element={<UserProfileDashboard />} />
              <Route
                path="/dashboard-view-all"
                element={<DashboardViewAll />}
              />
              <Route
                path="/risk-bet-history/:matchName"
                element={<RiskBetHistory />}
              />
              <Route path="/casino-vendor" element={<CasinoVendor />} />
              <Route path="/casino-games" element={<CasinoGames />} />
              <Route
                path="/vendor-registartion"
                element={<VendorRegistration />}
              />
              <Route path="/risk-casino" element={<RiskCasino />} />
              <Route path="/sports" element={<Sports />} />
              <Route path="/fancy-results" element={<FancyResult />} />
              <Route path="/market-results" element={<MarketResult />} />
              <Route path="/live-bet-list" element={<LiveBetList />} />
              <Route path="/sports-providers" element={<SportProviders/>}/>
              <Route
                path="/deleted-bet-history"
                element={<DeletedBetHistory />}
              />
              <Route path="/cheat-alert-bets" element={<CheatAlertBets />} />
            </Routes>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
