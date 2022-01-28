import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import User from "./pages/User";
import Account from "./pages/Account";
import ProtectedRoute from "./components/ProtectedRoute";

import { AuthProvider } from "./context/authContext";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LogIn />} />
          <Route
            path="/user/:id"
            element={
              <ProtectedRoute>
                <User />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
