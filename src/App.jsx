import { BrowserRouter, Route, Routes } from "react-router-dom";
import Connections from "./pages/Connections";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Request from "./pages/Requests";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/connections" element={<Connections />} />
          <Route path="/requests" element={<Request />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
