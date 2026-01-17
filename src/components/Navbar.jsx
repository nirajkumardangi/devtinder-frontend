import {
  ChevronDown,
  Code,
  Flame,
  Heart,
  LogOut,
  Mail,
  Menu,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { removeUser } from "../features/userSlice"; // Adjust path as needed

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Access user from Redux store
  const { user } = useSelector((store) => store.user);

  const handleLogout = () => {
    dispatch(removeUser());
    setIsMobileMenuOpen(false);
    navigate("/");
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="fixed sticky top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* --- Logo Section --- */}
          <Link
            to="/"
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={closeMobileMenu}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:opacity-90 transition-opacity">
              <Code className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
              DevTinder
            </span>
          </Link>

          {/* --- Desktop Nav (Only if user is logged in) --- */}
          {user && (
            <div className="hidden md:flex items-center space-x-1">
              <Link
                to="/feed"
                className={`px-4 py-2 rounded-lg transition-all flex items-center ${
                  location.pathname === "/feed"
                    ? "text-white bg-gray-800"
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                }`}
              >
                <Flame className="w-5 h-5 mr-2" />
                Discover
              </Link>

              <Link
                to="/connections"
                className={`px-4 py-2 rounded-lg transition-all flex items-center ${
                  location.pathname === "/connections"
                    ? "text-white bg-gray-800"
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                }`}
              >
                <Heart className="w-5 h-5 mr-2" />
                Connections
              </Link>

              <Link
                to="/requests"
                className={`px-4 py-2 rounded-lg transition-all relative flex items-center ${
                  location.pathname === "/requests"
                    ? "text-white bg-gray-800"
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                }`}
              >
                <Mail className="w-5 h-5 mr-2" />
                Requests
                {/* Notification Badge */}
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-pink-500 rounded-full animate-pulse"></span>
              </Link>
            </div>
          )}

          {/* --- User Menu / Auth Buttons --- */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-gray-800 hover:bg-gray-700 transition-all border border-gray-700"
                >
                  <img
                    src={
                      user?.avatar ||
                      "https://ui-avatars.com/api/?name=" + user?.name
                    }
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm font-medium text-gray-200">
                    {user?.name?.split(" ")[0]}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </Link>

                <button
                  onClick={handleLogout}
                  className="hidden md:flex items-center px-4 py-2 text-sm font-medium text-gray-400 hover:text-red-400 transition-all cursor-pointer"
                >
                  <LogOut className="w-4 h-4 mr-1.5" />
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login">
                <button className="px-4 py-2 bg-gradient-to-r from-pink-600 to-violet-600 text-white rounded-lg font-semibold text-sm hover:opacity-90 shadow-lg shadow-purple-900/20 transition-all cursor-pointer">
                  Login
                </button>
              </Link>
            )}

            {/* --- Mobile Menu Toggle --- */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* --- Mobile Menu --- */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800 pb-4 animate-in slide-in-from-top-2 duration-200">
          <div className="px-4 pt-4 space-y-2">
            {user ? (
              <>
                <Link
                  to="/feed"
                  onClick={closeMobileMenu}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center ${
                    location.pathname === "/feed"
                      ? "bg-gray-800 text-white"
                      : "text-gray-300 hover:text-white hover:bg-gray-800"
                  }`}
                >
                  <Flame className="w-5 h-5 mr-3" />
                  Discover
                </Link>

                <Link
                  to="/connections"
                  onClick={closeMobileMenu}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center ${
                    location.pathname === "/connections"
                      ? "bg-gray-800 text-white"
                      : "text-gray-300 hover:text-white hover:bg-gray-800"
                  }`}
                >
                  <Heart className="w-5 h-5 mr-3" />
                  Connections
                </Link>

                <Link
                  to="/requests"
                  onClick={closeMobileMenu}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center justify-between ${
                    location.pathname === "/requests"
                      ? "bg-gray-800 text-white"
                      : "text-gray-300 hover:text-white hover:bg-gray-800"
                  }`}
                >
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 mr-3" />
                    Requests
                  </div>
                  <span className="bg-pink-500 text-white text-xs px-2 py-0.5 rounded-full">
                    3
                  </span>
                </Link>

                <Link
                  to="/profile"
                  onClick={closeMobileMenu}
                  className="w-full text-left px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-all flex items-center"
                >
                  <User className="w-5 h-5 mr-3" />
                  Profile ({user?.name?.split(" ")[0]})
                </Link>

                <hr className="border-gray-800 my-2" />

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 rounded-lg text-red-400 hover:text-red-300 hover:bg-gray-800/50 transition-all flex items-center"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={closeMobileMenu}
                className="block w-full text-center px-4 py-3 bg-gradient-to-r from-pink-600 to-violet-600 text-white rounded-lg font-bold"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
