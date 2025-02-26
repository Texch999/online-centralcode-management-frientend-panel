import React, { Suspense, lazy } from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Provider } from "react-redux";
import { store } from "./redux/store";
const App = lazy(() => import("./App"));
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Suspense
          fallback={
            <div className="spinner">
              <div className="spinner-circle"></div>
            </div>
          }
        >
          <App />
        </Suspense>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
