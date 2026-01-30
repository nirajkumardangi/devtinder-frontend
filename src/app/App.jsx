import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Layout from "../components/Layout";
import Protected from "./Protected";

// Pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Feed from "../pages/Feed";
import Profile from "../pages/Profile";
import Chat from "../pages/Chat";
import Connections from "../pages/Connections";
import ProfileEdit from "../pages/ProfileEdit";
import ConnectionProfileInfo from "../pages/ConnectionProfileInfo";
import Requests from "../pages/Requests";
import NotFound from "../pages/NotFound";

function App() {
  const { user } = useSelector((store) => store.user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public or Conditional Home */}
          <Route
            index
            element={!user ? <Home /> : <Navigate to="/feed" replace />}
          />

          {/* Protected Routes Group */}
          <Route element={<Protected />}>
            <Route path="feed" element={<Feed />} />
            <Route path="profile" element={<Profile />} />
            <Route path="profile-edit" element={<ProfileEdit />} />
            <Route path="connections" element={<Connections />} />
            <Route path="connections/:id" element={<ConnectionProfileInfo />} />
            <Route path="messages/:id" element={<Chat />} />
            <Route path="requests" element={<Requests />} />
          </Route>

          {/* Auth Routes */}
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="not-found" element={<NotFound />} />

          {/* Catch All */}
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
