import "./App.css";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/home/Homepage";
import Header from "./components/Header";
import SubHeader from "./components/SubHeader";
import Casino from "./pages/casino/Casino";

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
            </Routes>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
