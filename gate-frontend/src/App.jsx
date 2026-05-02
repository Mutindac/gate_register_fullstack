import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Report from "./pages/Report";
import Login from "./pages/Login";

function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTE */}
        <Route
          path="/login"
          element={token ? <Navigate to="/" /> : <Login />}
        />

        {/* PROTECTED ROUTES */}
        <Route
          path="/"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />

        <Route
          path="/report"
          element={token ? <Report /> : <Navigate to="/login" />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;