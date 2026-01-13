import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { addUser, setChecked } from "../context/userSlice";
import { BASE_URL } from "../utils/constants";

function Layout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  // Fetch user profile data
  useEffect(() => {
    // Check if user already login so not make an api call
    if (user.checked) return;

    const fetchUser = async () => {
      try {
        const res = await axios.get(BASE_URL + "/profile", {
          withCredentials: true,
        });
        dispatch(addUser(res.data.data));
      } catch (err) {
        dispatch(setChecked());
        if (err.response?.status === 401) navigate("/");
      }
    };

    fetchUser();
  }, [user.checked]);

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
