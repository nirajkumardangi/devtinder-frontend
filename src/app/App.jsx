import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import Layout from "../components/Layout";

import Protected from "./Protected";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Feed from "../pages/Feed";
import Profile from "../pages/Profile";
import Request from "../pages/Requests";
import Connections from "../pages/Connections";
import ProfileEdit from "../pages/ProfileEdit";

function App() {
  const user = useSelector((store) => store.user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={!user.data ? <Home /> : <Feed />} />

          <Route
            path="feed"
            element={
              <Protected>
                <Feed />
              </Protected>
            }
          />

          <Route
            path="profile"
            element={
              <Protected>
                <Profile />
              </Protected>
            }
          />

          <Route
            path="profile-edit"
            element={
              <Protected>
                <ProfileEdit />
              </Protected>
            }
          />

          <Route
            path="connections"
            element={
              <Protected>
                <Connections />
              </Protected>
            }
          />

          <Route
            path="requests"
            element={
              <Protected>
                <Request />
              </Protected>
            }
          />

          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
