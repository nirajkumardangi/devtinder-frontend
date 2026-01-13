import axios from "axios";
import {
  Code2,
  User,
  MessageSquare,
  LogOut,
  Settings,
  Flame,
  Menu,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../context/userSlice";

const navStyles = {
  desktop: {
    active:
      "flex items-center space-x-1 px-4 py-2 rounded-full cursor-pointer transition-all duration-200 bg-gradient-to-r from-pink-500/10 to-purple-500/10 text-pink-400 border border-pink-500/20",
    inactive:
      "flex items-center space-x-1 px-4 py-2 rounded-full cursor-pointer transition-all duration-200 text-slate-400 hover:text-white hover:bg-white/5",
  },
  mobile: {
    active:
      "p-3 rounded-2xl transition-all duration-200 text-pink-500 bg-pink-500/10",
    inactive:
      "p-3 rounded-2xl transition-all duration-200 text-slate-500 hover:text-slate-300",
  },
};

function Navbar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: userData } = useSelector((store) => store.user);

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL + "/auth/logout",
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());
      navigate("/");
    } catch (err) {
      console.err("Logout Error: Somthing went wrong!", err);
    }
  };

  return (
    <>
      {/* Top Navigation */}
      <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 shadow-lg">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <Link to="/">
              <div className="flex items-center cursor-pointer group">
                <Code2 className="h-8 w-8 text-pink-500 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                <span className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
                  DevTinder
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            {userData ? (
              <div className="hidden md:flex items-center space-x-6">
                {/* Desktop Nav Links */}
                <div className="flex items-center space-x-2">
                  <Link to="/feed">
                    <div
                      className={
                        isActive("/feed") || isActive("/")
                          ? navStyles.desktop.active
                          : navStyles.desktop.inactive
                      }
                    >
                      <Flame size={20} />
                      <span className="font-medium text-sm">Feed</span>
                    </div>
                  </Link>

                  <Link to="/connections">
                    <div
                      className={
                        isActive("/connections")
                          ? navStyles.desktop.active
                          : navStyles.desktop.inactive
                      }
                    >
                      <MessageSquare size={20} />
                      <span className="font-medium text-sm">Connections</span>
                    </div>
                  </Link>

                  <Link to="/requests">
                    <div
                      className={
                        isActive("/requests")
                          ? navStyles.desktop.active
                          : navStyles.desktop.inactive
                      }
                    >
                      <User size={20} />
                      <span className="font-medium text-sm">Requests</span>
                    </div>
                  </Link>
                </div>

                {/* Profile + Logout */}
                <div className="pl-6 border-l border-slate-700 flex items-center space-x-4">
                  <Link to="/profile">
                    <div className="flex items-center space-x-3 group cursor-pointer">
                      <img
                        className="h-9 w-9 rounded-full border-2 border-pink-500 object-cover group-hover:scale-105 transition-transform"
                        src={
                          userData?.avatar ||
                          "https://geographyandyou.com/images/user-profile.png"
                        }
                        alt={userData?.name}
                      />
                      <span className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
                        {userData?.name?.split(" ")[0]}
                      </span>
                    </div>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-full transition-all cursor-pointer"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="hidden md:block">
                <Link to="/login">
                  <button className="px-6 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full font-bold text-md hover:shadow-lg hover:shadow-pink-500/30 hover:scale-105 transition-all duration-200">
                    Login
                  </button>
                </Link>
              </div>
            )}

            {/* Mobile Menu */}
            <div className="md:hidden flex items-center gap-4">
              {!userData && (
                <Link to="/login">
                  <button className="px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full font-bold text-xs">
                    Login
                  </button>
                </Link>
              )}
              <button className="text-slate-300 hover:text-white">
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      {userData && (
        <div className="md:hidden fixed bottom-0 w-full bg-slate-900/90 backdrop-blur-lg border-t border-white/10 pb-safe z-50">
          <div className="flex justify-around items-center h-16 px-2">
            <Link to="/feed">
              <button
                className={
                  isActive("/feed")
                    ? navStyles.mobile.active
                    : navStyles.mobile.inactive
                }
              >
                <Flame size={24} />
              </button>
            </Link>

            <Link to="/connections">
              <button
                className={
                  isActive("/connections")
                    ? navStyles.mobile.active
                    : navStyles.mobile.inactive
                }
              >
                <MessageSquare size={24} />
              </button>
            </Link>

            <Link to="/requests">
              <button
                className={
                  isActive("/requests")
                    ? navStyles.mobile.active
                    : navStyles.mobile.inactive
                }
              >
                <User size={24} />
              </button>
            </Link>

            <Link to="/profile">
              <button
                className={
                  isActive("/profile")
                    ? navStyles.mobile.active
                    : navStyles.mobile.inactive
                }
              >
                <Settings size={24} />
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
