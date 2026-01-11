import { BrowserRouter, Route, Routes } from "react-router-dom";
import Connections from "./pages/Connections";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Request from "./pages/Requests";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((store) => store.user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={!user ? <Home /> : <Feed />} />
          <Route path="feed" element={<Feed />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route path="connections" element={<Connections />} />
          <Route path="requests" element={<Request />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
