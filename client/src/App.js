import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import User from "./pages/User";
import ForgotPassword from "./components/ForgotPassword";
import UserEdit from "./pages/UserEdit";
import AddTrack from "./pages/AddTrack";
import Albums from "./pages/Albums";
import AddAlbum from "./pages/AddAlbum";
import AddPlaylist from "./pages/AddPlaylist";
import TrackPage from "./pages/TrackPage";
import PlaylistPage from "./pages/PlaylistPage";
import ResetPassword from "./pages/ResetPassword";
import PlaylistDetail from "./pages/PlaylistDetail";
import MusicPlayer from "./components/MusicPlayer";

import { AuthProvider } from "./context/authContext";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/user/edit/:userId" element={<UserEdit />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/albums" element={<Albums />} />

          <Route path="/album/add" element={<AddAlbum />} />

          <Route path="/playlist" element={<PlaylistPage />} />
          <Route path="/playlist/:playlistId" element={<PlaylistDetail />} />

          <Route path="/track" element={<TrackPage />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/user/edit/change-password/:userId"
            element={<ResetPassword />}
          />
        </Routes>
        <MusicPlayer />
      </AuthProvider>
    </div>
  );
}

export default App;
