import React from "react";
import "./App.css";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// Components
import Login from "./components/Login";
import Header from "./components/Header";

// Pages
import Homepage from "./pages/home/Homepage";
import DashboardViewAll from "./pages/home/DashboardViewAll";

// Casino Pages
import Casino from "./pages/casino/Casino";
import CasinoVendor from "./pages/casino/CasinoVendor";
import CasinoGames from "./pages/casino/CasinoGames";
import VendorRegistration from "./pages/vendor-registration/casino/casino/VendorRegistration";
import SportsVendorRegistration from "./pages/vendor-registration/casino/sports/SportsVendorRegistration";

// Risk Management Pages
import RiskLimitSet from "./pages/risk-management/RiskLimitSet";
import RiskSports from "./pages/risk-management/RiskSports";
import RiskBetHistory from "./pages/risk-management/RiskBetHistory";
import RiskCasino from "./pages/risk-management/RiskCasino";
import LiveBetList from "./pages/risk-management/LiveBetList";
import DeletedBetHistory from "./pages/risk-management/DeletedBetHistory";
import CheatAlertBets from "./pages/risk-management/CheatAlertBets";

// User Profile and Management
import UserProfileDashboard from "./pages/add-team/UserProfileDasboard";
import AddManagementTeam from "./pages/add-team/AddManagementTeam";
import AddDirectorAdmin from "./pages/add-team/AddDirectorAdmin";
import DownlineList from "./pages/add-team/DownlineList";
import DownlineTrasactionHistory from "./pages/add-team/DownlineTrasactionHistory";
import MyVendorsAccount from "./pages/wallet/MyVendorsAccount";
import SettledHistory from "./pages/wallet/SettledHistory";
import MyStatement from "./pages/reports/MyStatement";
import MyDepositWithdraw from "./pages/wallet/MyDepositWithdraw";
import OfflineDepositWithdraw from "./pages/wallet/OfflineDepositWithdraw";
import Tickets from "./pages/wallet/Tickets";
import PaymentGateway from "./pages/add-team/PaymentGateway";
import AddWibsites from "./pages/add-team/AddWebsites";

// Reports
import DownLineAdmins from "./pages/reports/DownLineAdmins";
import MatchWisePl from "./pages/reports/match-wise-pl/MatchWisePl";
import IndividualMatchPl from "./pages/reports/match-wise-pl/IndividualMatchPl";
import MatchAdminsUsersPl from "./pages/reports/match-wise-pl/MatchAdminsUsersPl";
import UsersMatchPl from "./pages/reports/match-wise-pl/UsersMatchPl";
import Userslist from "./pages/reports/Userslist";
import SuperAdminDL from "./pages/reports/SuperAdminDL";
import CasinoReports from "./pages/reports/CasinoReports";
import UserBetsList from "./pages/reports/UserBetsList";
import SportsReport from "./pages/reports/SportsReport";
import UserReports from "./pages/reports/UserReports";
import ClientRental from "./pages/reports/ClientRental";

// Sports Pages
import Sports from "./pages/sports/Sports";
import SportProviders from "./pages/sports/SportProviders";

// Cricket Pages
import Cricket from "./pages/cricket/Cricket";
import FancyCricket from "./pages/cricket/FancyCricket";
import FancyIndividualCricketMatch from "./pages/cricket/FancyIndividualCricketMatch";
import CricketBookmaker from "./pages/cricket/CricketBookmaker";
import CricketLiveStreaming from "./pages/cricket/CricketLiveStreaming";
import CricketScoreboard from "./pages/cricket/CricketScoreboard";

// Fancy Result and Market Result Pages
import FancyResult from "./pages/fancy-result/FancyResult";
import MarketResult from "./pages/market-result/MarketResult";

// Promotions
import Offer from "./pages/promotions/Offer";
import PromotionType from "./pages/promotions/PromotionType";
import SportsPromotions from "./pages/promotions/SportsPromotions";
import CasinoPromotions from "./pages/promotions/CasinoPromotions";
import Broadcasting from "./pages/promotions/Broadcasting";
import SandCBanner from "./pages/promotions/SandCBanner";

// Wallet Transactions
import GatewayTransactions from "./pages/wallet/GatewayTransactions";

// Owner Settings
import ActivityLogs from "./pages/ownerSettings/ActivityLogs";
import RecentAccessIp from "./pages/ownerSettings/RecentAccessIp";
import IndividualMatch from "./pages/ownerSettings/IndividualMatch";
import ReferenceData from "./pages/ownerSettings/ReferenceData";
import PrivacyPolicy from "./pages/ownerSettings/PrivacyPolicy";
import Result from "./pages/ownerSettings/Result";

// Live Block
import LiveBlockSports from "./pages/live-block/LiveBlockSports";
import IndividualMatchOddsLive from "./pages/live-block/components/IndividualMatchOddsLive";
import ViewFancyBets from "./pages/live-block/components/ViewFancyBets";
import LiveScoreBoard from "./pages/live-block/components/LiveScoreboard";

// Live Block Casino Management
import CasinoWebsite from "./pages/live-block/casino-management/CasinoWebsite";
import MCasinoGames from "./pages/live-block/casino-management/MCasinoGames";
import McasinoGDetails from "./pages/live-block/casino-management/McasinoGDetails";
import MCasinoBetHistory from "./pages/live-block/casino-management/MCasinoBetHistory";
import CasinoProvider from "./pages/live-block/casino-management/CasinoProvider";
import CasinoProviderGames from "./pages/live-block/casino-management/CasinoProviderGames";
import CasinoMBetHistory from "./pages/live-block/casino-management/CasinoMBetHistory";

// Bonus Chips and User Management
import BonusChips from "./pages/bonuschips/BonusChips";
import BetBlockUsers from "./pages/live-block/BetBlockUsers";
import InActiveUsers from "./pages/live-block/InActiveUsers";
import SetLimits from "./pages/live-block/SetLimits";
import WhiteLabelSetting from "./pages/white-label/WhiteLabelSetting";

function App() {
  const isLoggedIn = localStorage?.getItem("isLoggedIn");

  const PrivateRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/director/login" />;
  };
  const path = window.location.pathname;
  const location = useLocation();

  const showLoginPage =
    location.pathname === "/master/login" ||
    location.pathname === "/director/login";

  return (
    <div>
      {showLoginPage || !isLoggedIn ? (
        <Login />
      ) : (
        <div>
          {isLoggedIn && <Header />}
          <div className="home">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route
                path="/dashboard-view-all"
                element={<DashboardViewAll />}
              />
              <Route path="/central-casino" element={<Casino />} />
              <Route
                path="/central-casino/:vendor/:provider"
                element={<CasinoVendor />}
              />
              <Route
                path="/central-casino/:vendor/:provider/:game"
                element={<CasinoGames />}
              />
              <Route
                path="/vendor-registration"
                element={<VendorRegistration />}
              />
              <Route
                path="/sports-vendor-registration"
                element={<SportsVendorRegistration />}
              />
              <Route path="/risk-limit-set" element={<RiskLimitSet />} />
              <Route path="/risk-sports" element={<RiskSports />} />
              <Route path="/risk-casino" element={<RiskCasino />} />
              <Route
                path="/risk-sports/:matchName"
                element={<RiskBetHistory />}
              />
              <Route path="/live-bet-list" element={<LiveBetList />} />
              <Route
                path="/deleted-bet-history"
                element={<DeletedBetHistory />}
              />
              <Route path="/cheat-alert-bets" element={<CheatAlertBets />} />
              <Route path="/management-team" element={<AddManagementTeam />} />
              <Route path="/director-admin" element={<AddDirectorAdmin />} />
              <Route
                path="/user-profile-dashboard"
                element={<UserProfileDashboard />}
              />
              <Route path="/downline-list" element={<DownlineList />} />
              <Route
                path="/downline-list/:transactionHistory"
                element={<DownlineTrasactionHistory />}
              />
              <Route
                path="/my-vendors-account"
                element={<MyVendorsAccount />}
              />
              <Route path="/settled-history" element={<SettledHistory />} />
              <Route path="/my-statement" element={<MyStatement />} />
              <Route path="/deposit-withdraw" element={<MyDepositWithdraw />} />
              <Route
                path="/offline-deposit-withdraw"
                element={<OfflineDepositWithdraw />}
              />
              <Route path="/tickets" element={<Tickets />} />
              <Route
                path="/gateway-transactions"
                element={<GatewayTransactions />}
              />
              <Route path="/payment-details" element={<PaymentGateway />} />
              <Route path="/websites" element={<AddWibsites />} />
              {/* Reports */}
              <Route path="/pl-report-downline" element={<DownLineAdmins />} />
              <Route path="/match-wise-pl" element={<MatchWisePl />} />
              <Route
                path="/match-wise-pl/:matchName"
                element={<IndividualMatchPl />}
              />
              <Route
                path="/match-wise-pl/:matchName/:role"
                element={<MatchAdminsUsersPl />}
              />
              <Route
                path="/match-wise-pl/:matchName/:role/:userDetails"
                element={<UsersMatchPl />}
              />
              <Route path="/downline/:superadmin" element={<SuperAdminDL />} />
              <Route path="/superadmin/:user" element={<Userslist />} />
              <Route path="/pl-casino-report" element={<CasinoReports />} />
              <Route path="/userbets/:username" element={<UserBetsList />} />
              <Route path="/pl-report-sports" element={<SportsReport />} />
              <Route path="/pl-report-users" element={<UserReports />} />
              <Route path="/client-rental-sheet" element={<ClientRental />} />
              {/* Sports Routes */}
              <Route path="/central-sports" element={<Sports />} />
              <Route path="/sports-promotions" element={<SportsPromotions />} />
              <Route path="/casino-promotions" element={<CasinoPromotions />} />
              <Route path="/fancy-results" element={<FancyResult />} />
              <Route path="/market-results" element={<MarketResult />} />
              <Route
                path="/central-sports/:vendor/:provider"
                element={<SportProviders />}
              />
              <Route
                path="/central-sports/:vendor/:provider/:match"
                element={<Cricket />}
              />
              <Route
                path="/central-sports/:vendor/:provider/:match/:individualMatch"
                element={<FancyIndividualCricketMatch />}
              />
              {/* Promotions */}
              <Route
                path="/create-promotion-type"
                element={<PromotionType />}
              />
              <Route path="/broadcasting" element={<Broadcasting />} />
              <Route path="/banners" element={<SandCBanner />} />
              <Route path="/offers" element={<Offer />} />
              {/* Owner Settings */}
              <Route path="/activity-logs" element={<ActivityLogs />} />
              <Route
                path="/userActivity/:userId/:userActivity"
                element={<RecentAccessIp />}
              />
              <Route path="/reference-data" element={<ReferenceData />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/results" element={<Result />} />{" "}
              <Route path="/results/:matchName" element={<IndividualMatch />} />
              {/* Live Block Routes */}
              <Route path="/live-block-sports" element={<LiveBlockSports />} />
              <Route
                path="/live-block-sports/:sport"
                element={<IndividualMatchOddsLive />}
              />
              <Route
                path="/live-block-sports/:sport/:fancyType"
                element={<ViewFancyBets />}
              />
              {/* Live Block Casino Management */}
              <Route path="/management-casino" element={<CasinoWebsite />} />
              <Route
                path="/management-casino/:gamename"
                element={<MCasinoGames />}
              />
              <Route
                path="/management-casino/:gamename/:usergame"
                element={<McasinoGDetails />}
              />
              <Route
                path="/management-casino/:gamename/:usergame/:bethistory"
                element={<MCasinoBetHistory />}
              />
              <Route
                path="/management-casino-provider/:provider"
                element={<CasinoProvider />}
              />
              <Route
                path="/management-casino-provider/:provider/:gamename"
                element={<CasinoProviderGames />}
              />
              <Route
                path="/management-casino-provider/:provider/:gamename/:bethistory"
                element={<CasinoMBetHistory />}
              />
              {/* Miscellaneous */}
              <Route path="/bonus-chips" element={<BonusChips />} />
              <Route path="/bet-block-users" element={<BetBlockUsers />} />
              <Route path="/inactive-users" element={<InActiveUsers />} />
              <Route path="/set-limits" element={<SetLimits />} />
              <Route
                path="/white-label-setting"
                element={<WhiteLabelSetting />}
              />
            </Routes>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
