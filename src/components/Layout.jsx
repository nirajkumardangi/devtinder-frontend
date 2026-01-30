import axios from "axios";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { addUser, setChecked } from "../features/userSlice";
import { BASE_URL } from "../utils/constants";

function Layout() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/profile`, {
          withCredentials: true,
        });
        dispatch(addUser(res?.data?.user));
      } catch (err) {
        dispatch(setChecked());
      }
    };

    fetchUser();
  }, [dispatch]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-[#030712] selection:bg-purple-500/30 selection:text-white">
      <Navbar />

      {/* Added a subtle background glow that follows the layout */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full" />
      </div>

      {/* Main Content Area with padding-top to account for fixed header */}
      <main className="flex-grow pt-10 relative z-10">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
