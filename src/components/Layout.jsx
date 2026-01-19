import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { addUser, setChecked } from "../features/userSlice";
import { BASE_URL } from "../utils/constants";

function Layout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { checked } = useSelector((store) => store.user);

  // Fetch user profile data
  useEffect(() => {
    // Check if user already login so not make an api call
    if (checked) return;

    const fetchUser = async () => {
      try {
        const res = await axios.get(BASE_URL + "/profile", {
          withCredentials: true,
        });
        dispatch(addUser(res.data.user));
      } catch (err) {
        dispatch(setChecked());
        if (err.response?.status === 401) navigate("/");
      }
    };

    fetchUser();
  }, [checked]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="mt-10">
        <Navbar />
      </div>
      <main className="flex-1">
        <Outlet />
      </main>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
