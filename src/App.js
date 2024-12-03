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
import UserProfileDashboard from "./pages/add-team/UserProfileDasboard";
import RiskCasino from "./pages/risk-management/RiskCasino";
import Sports from "./pages/sports/Sports";
import FancyResult from "./pages/fancy-result/FancyResult";
import MarketResult from "./pages/market-result/MarketResult";
import LiveBetList from "./pages/risk-management/LiveBetList";
import SportProviders from "./pages/sports/SportProviders";
import DeletedBetHistory from "./pages/risk-management/DeletedBetHistory";
import CheatAlertBets from "./pages/risk-management/CheatAlertBets";
import Cricket from "./pages/cricket/Cricket";
import FancyCricket from "./pages/cricket/FancyCricket";
import FancyIndividualCricketMatch from "./pages/cricket/FancyIndividualCricketMatch";
import CricketBookmaker from "./pages/cricket/CricketBookmaker";
import CricketLiveStreaming from "./pages/cricket/CricketLiveStreaming";
import VendorRegistration from "./pages/vendor-registration/casino/casino/VendorRegistration";
import SportsVendorRegistration from "./pages/vendor-registration/casino/sports/SportsVendorRegistration";
import CricketScoreboard from "./pages/cricket/CricketScoreboard";
import MyVendorsAccount from "./pages/wallet/MyVendorsAccount";
import SettledHistory from "./pages/wallet/SettledHistory";
import Offer from "./pages/promotions/Offer";
import MyStatement from "./pages/reports/MyStatement";
import MyDepositWithdraw from "./pages/wallet/MyDepositWithdraw";
import OfflineDepositWithdraw from "./pages/wallet/OfflineDepositWithdraw";
import Tickets from "./pages/wallet/Tickets";
import DownlineList from "./pages/add-team/DownlineList";
import DownlineTrasactionHistory from "./pages/add-team/DownlineTrasactionHistory";
import ActivityLogs from "./pages/ownerSettings/ActivityLogs";
import RecentAccessIp from "./pages/ownerSettings/RecentAccessIp";
import PromotionType from "./pages/promotions/PromotionType";
import SportsPromotions from "./pages/promotions/SportsPromotions";
import CasinoPromotions from "./pages/promotions/CasinoPromotions";
import Broadcasting from "./pages/promotions/Broadcasting";
import SandCBanner from "./pages/promotions/SandCBanner";
import GatewayTransactions from "./pages/wallet/GatewayTransactions";
import IndividualMatch from "./pages/ownerSettings/IndividualMatch";
import ReferenceData from "./pages/ownerSettings/ReferenceData";
import PrivacyPolicy from "./pages/ownerSettings/PrivacyPolicy";
import Result from "./pages/ownerSettings/Result";
import MatchWisePl from './pages/reports/match-wise-pl/MatchWisePl';
import IndividualMatchPl from "./pages/reports/match-wise-pl/IndividualMatchPl";
import MatchAdminsUsersPl from "./pages/reports/match-wise-pl/MatchAdminsUsersPl";
import UsersMatchPl from "./pages/reports/match-wise-pl/UsersMatchPl";

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
              <Route path="/" element={<Homepage />} />
              <Route path="/casino" element={<Casino />} />
              <Route path="/risk-limit-set" element={<RiskLimitSet />} />
              <Route path="/management-team" element={<ManagementTeam />} />
              <Route path="/director-admin" element={<AddDirectorAdmin />} />
              <Route path="/risk-sports" element={<RiskSports />} />
              <Route path="/match/:matchName" element={<IndividualMatch />} />
              <Route path="/reference-data" element={<ReferenceData />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route
                path="/user-profile-dashboard"
                element={<UserProfileDashboard />}
              />
              <Route
                path="/dashboard-view-all"
                element={<DashboardViewAll />}
              />
              <Route
                path="/risk-bet-history/:matchName"
                element={<RiskBetHistory />}
              />
              <Route
                path="/casino-vendor/:vendor/:provider"
                element={<CasinoVendor />}
              />
              <Route
                path="/casino-games/:vendor/:provider/:game"
                element={<CasinoGames />}
              />
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
              <Route
                path="/sports-providers/:vendor/:provider"
                element={<SportProviders />}
              />
              <Route
                path="/deleted-bet-history"
                element={<DeletedBetHistory />}
              />
              <Route path="/cheat-alert-bets" element={<CheatAlertBets />} />
              <Route
                path="/cricket/:vendor/:provider/:match"
                element={<Cricket />}
              />
              <Route
                path="/fancy-cricket/:vendor/:provider/:match"
                element={<FancyCricket />}
              />
              <Route
                path="/fancy-individual-match/:vendor/:provider/:match/:individualMatch"
                element={<FancyIndividualCricketMatch />}
              />
              <Route
                path="/cricket-bookmaker/:vendor/:provider/:match"
                element={<CricketBookmaker />}
              />
              <Route
                path="/cricket-livestreaming/:vendor/:provider/:match"
                element={<CricketLiveStreaming />}
              />
              <Route
                path="/sports-vendor-registration"
                element={<SportsVendorRegistration />}
              />
              <Route
                path="/cricket-scoreboard/:vendor/:provider/:match"
                element={<CricketScoreboard />}
              />
              <Route path="/settled-history" element={<SettledHistory />} />
              <Route path="/offer" element={<Offer />} />
              <Route path="/my-statement" element={<MyStatement />} />
              <Route path="/deposit-withdraw" element={<MyDepositWithdraw />} />
              <Route
                path="/offline-deposit-withdraw"
                element={<OfflineDepositWithdraw />}
              />
              <Route path="/tickets" element={<Tickets />} />
              <Route path="/downline-list" element={<DownlineList />} />
              <Route
                path="/transaction-history"
                element={<DownlineTrasactionHistory />}
              />
              <Route
                path="/gateway-transactions"
                element={<GatewayTransactions />}
              />
              <Route
                path="/my-vendors-account"
                element={<MyVendorsAccount />}
              />
              <Route path="/results" element={<Result />} />
              <Route path="/match-wise-pl" element={<MatchWisePl/>}/>
              <Route path="/individual-match-pl/:matchName" element={<IndividualMatchPl/>}/>
              <Route path="/match-admins-users-pl/:matchName/:role" element={<MatchAdminsUsersPl/>}/>
              <Route path="/users-match-pl/:matchName/:role/:userDetails" element={<UsersMatchPl/>}/>
            </Routes>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
