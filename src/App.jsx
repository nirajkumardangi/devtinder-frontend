import { BrowserRouter, Route, Routes } from "react-router-dom";
import Connections from "./pages/Connections";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Request from "./pages/Requests";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import { Provider } from "react-redux";
import appStore from "./context/appStore";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/requests" element={<Request />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
