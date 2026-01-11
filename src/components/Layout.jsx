import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../context/userSlice";
import { useEffect } from "react";

function Layout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  // Fetch user profile data
  const fetchUser = async () => {
    // Check if user already login so not make an api call
    if (user) return;

    try {
      const res = await axios.get(BASE_URL + "/profile", {
        withCredentials: true,
      });

      dispatch(addUser(res.data.data));
    } catch (err) {
      if (err.status === 401) {
        navigate("/");
      }
      console.error("Error on profile: " + err.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
