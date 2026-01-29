import axios from "axios";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { addUser, setChecked } from "../features/userSlice";
import { BASE_URL } from "../utils/constants";

function Layout() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { checked } = useSelector((store) => store.user);
  const hasFetched = useRef(false);

  useEffect(() => {
    // Only fetch once per app session
    if (hasFetched.current) return;

    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/profile`, {
          withCredentials: true,
        });
        dispatch(addUser(res.data.user));
      } catch (err) {
        dispatch(setChecked());
        // No auto-navigate here; let the Protected component handle redirects
      } finally {
        hasFetched.current = true;
      }
    };

    fetchUser();
  }, [dispatch]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-[#0B101B]">
      {/* Navbar with fixed height management */}
      <header className="fixed top-0 left-0 right-0 z-[100]">
        <Navbar />
      </header>

      {/* Main Content Area */}
      <main className="flex-grow pt-16 animate-in fade-in duration-500">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Layout;
