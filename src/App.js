import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import React, { Suspense, lazy, useContext } from "react";

import { AuthContext } from "./context/AuthContext";
import { ProgressSpinner } from "primereact/progressspinner";

const Login = lazy(() => import("./views/auth/Login"));
const Player = lazy(() => import("./views/players/Player"));
const Team = lazy(() => import("./views/teams/Team"));

const loading = (
  <div className="card flex justify-content-center mt-5">
    <ProgressSpinner />
  </div>
);

const ProtectedRoute = ({ children }) => {
  const { user, token, isExpired } = useContext(AuthContext);

  if (!user || !token || isExpired()) {
    return <Navigate to="/" />;
  }
  return children;
};

const App = () => {
  return (
    <Suspense fallback={loading}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="team">
            <Route
              path="list"
              element={
                <ProtectedRoute>
                  <Team />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="player">
            <Route
              path="list"
              element={
                <ProtectedRoute>
                  <Player />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </Suspense>
  );
};

export default App;
