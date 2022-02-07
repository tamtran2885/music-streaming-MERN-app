import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import User from "./pages/User";
import Account from "./pages/Account";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./components/ForgotPassword";
import UserEdit from "./pages/UserEdit";
import AddTrack from "./pages/AddTrack";
import AddAlbum from "./pages/AddAlbum";
import AddPlaylist from "./pages/AddPlaylist";
import TrackPage from "./pages/TrackPage";
import ResetPassword from "./pages/ResetPassword";

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
          <Route path="/user/edit/:userId" element={<UserEdit />} />
          <Route path="/forgot" element={<ForgotPassword />} />

          <Route path="/album/add" element={<AddAlbum />} />

          <Route path="/playlist/add" element={<AddPlaylist />} />

          <Route path="/track" element={<TrackPage />} />
          <Route path="/track/add" element={<AddTrack />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
