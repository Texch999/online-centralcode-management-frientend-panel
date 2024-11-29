import React from "react";
import "./App.css";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/home/Homepage";
import Header from "./components/Header";
import Casino from "./pages/casino/Casino";
import Result from "./pages/ownerSettings/Result";
import RiskLimitSet from "./pages/risk-management/RiskLimitSet";
import ManagementTeam from "./pages/add-team/ManagementTeam";
import RiskSports from "./pages/risk-management/RiskSports";
import IndividualMatch from "./pages/ownerSettings/IndividualMatch";
import ReferenceData from "./pages/ownerSettings/ReferenceData";
import AddDirectorAdmin from "./pages/add-team/AddDirectorAdmin";
import DashboardViewAll from "./pages/home/DashboardViewAll";
import RiskBetHistory from "./pages/risk-management/RiskBetHistory";
import PrivacyPolicy from "./pages/ownerSettings/PrivacyPolicy";
import RiskCasino from "./pages/risk-management/RiskCasino";
import ActivityLogs from "./pages/ownerSettings/ActivityLogs";
import RecentAccessIp from "./pages/ownerSettings/RecentAccessIp";
import PromotionType from "./pages/promotions/PromotionType";
import CasinoVendor from "./pages/casino/CasinoVendor";
import CasinoGames from "./pages/casino/CasinoGames";
import VendorRegistration from "./pages/vendor-registration/VendorRegistration";
import LiveBetList from "./pages/risk-management/LiveBetList";
import SportsPromotions from "./pages/promotions/SportsPromotions";
import CasinoPromotions from "./pages/promotions/CasinoPromotions";
import Broadcasting from "./pages/promotions/Broadcasting";
import SandCBanner from "./pages/promotions/SandCBanner";
import UserProfileDashboard from "./pages/add-team/UserProfileDasboard";
import Sports from "./pages/sports/Sports";
import FancyResult from "./pages/fancy-result/FancyResult";
import MarketResult from "./pages/market-result/MarketResult";
import SportProviders from "./pages/sports/SportProviders";
import DeletedBetHistory from "./pages/risk-management/DeletedBetHistory";
import CheatAlertBets from "./pages/risk-management/CheatAlertBets";
import MyVendorsAccount from "./pages/wallet/MyVendorsAccount";
import SettledHistory from "./pages/wallet/SettledHistory";
import MyDepositWithdraw from "./pages/wallet/MyDepositWithdraw";

function App() {
  const isLoggedIn = localStorage?.getItem("isLoggedIn");
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
              <Route path="/results" element={<Result />} />
              <Route path="/risk-limit-set" element={<RiskLimitSet />} />
              <Route path="/management-team" element={<ManagementTeam />} />
              <Route path="/director-admin" element={<AddDirectorAdmin />} />
              <Route path="/risk-sports" element={<RiskSports />} />
              <Route path="/match/:matchName" element={<IndividualMatch />} />
              <Route path="/reference-data" element={<ReferenceData />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
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
              <Route path="/activity-logs" element={<ActivityLogs />} />
              <Route
                path="/userActivity/:userActivity"
                element={<RecentAccessIp />}
              />
              <Route
                path="/create-promotion-type"
                element={<PromotionType />}
              />
              <Route path="/live-bet-list" element={<LiveBetList />} />
              <Route path="/sports-promotions" element={<SportsPromotions />} />
              <Route path="/casino-promotions" element={<CasinoPromotions />} />
              <Route path="/broadcasting" element={<Broadcasting />} />
              <Route path="/banners" element={<SandCBanner />} />
              <Route path="/sports" element={<Sports />} />
              <Route path="/fancy-results" element={<FancyResult />} />
              <Route path="/market-results" element={<MarketResult />} />
              <Route path="/sports-providers" element={<SportProviders />} />
              <Route
                path="/deleted-bet-history"
                element={<DeletedBetHistory />}
              />
              <Route path="/cheat-alert-bets" element={<CheatAlertBets />} />
              <Route
                path="/my-vendors-account"
                element={<MyVendorsAccount />}
              />
              <Route path="/settled-history" element={<SettledHistory />} />
              <Route path="/deposit-withdraw" element={<MyDepositWithdraw />} />
            </Routes>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
