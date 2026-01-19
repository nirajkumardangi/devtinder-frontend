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
import { toast } from "react-toastify";
import { removeUser } from "../features/userSlice";
import defaultAvatar from "../assets/avatar.png";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);

  const handleLogout = () => {
    dispatch(removeUser());
    setIsMobileMenuOpen(false);
    navigate("/");
    toast.success("Logged out successfully!", { autoClose: 1500 });
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      {/* TOP DESKTOP NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* LOGO */}
            <Link
              to="/"
              onClick={closeMobileMenu}
              className="flex items-center gap-2"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Code className="text-white w-6 h-6" />
              </div>
              <span className="hidden sm:block text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
                DevTinder
              </span>
            </Link>

            {/* DESKTOP NAV LINKS */}
            {user && (
              <div className="hidden md:flex items-center gap-2">
                <DesktopNavLink to="/feed" icon={<Flame />} label="Discover" />
                <DesktopNavLink
                  to="/connections"
                  icon={<Heart />}
                  label="Connections"
                />
                <DesktopNavLink
                  to="/requests"
                  icon={<Mail />}
                  label="Requests"
                  badge
                />
              </div>
            )}

            {/* PROFILE + AUTH */}
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-200"
                  >
                    <img
                      src={user.avatar || defaultAvatar}
                      alt="avatar"
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-sm font-medium">
                      {user?.name?.split(" ")[0]}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="hidden md:flex items-center text-gray-400 hover:text-red-400 text-sm cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 mr-1" />
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login">
                  <button className="px-4 py-2 bg-gradient-to-r from-pink-600 to-violet-600 text-white rounded-lg font-semibold hover:opacity-90 shadow cursor-pointer">
                    Login
                  </button>
                </Link>
              )}

              {/* MOBILE MENU TOGGLE */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE DROPDOWN MENU */}
      {isMobileMenuOpen && user && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-gray-900 border-b border-gray-800 md:hidden">
          <MobileItem
            to="/feed"
            icon={<Flame />}
            label="Discover"
            close={closeMobileMenu}
          />
          <MobileItem
            to="/connections"
            icon={<Heart />}
            label="Connections"
            close={closeMobileMenu}
          />
          <MobileItem
            to="/requests"
            icon={<Mail />}
            label="Requests"
            badge
            close={closeMobileMenu}
          />
          <MobileItem
            to="/profile"
            icon={<User />}
            label="Profile"
            close={closeMobileMenu}
          />

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-3 text-left text-red-400 hover:bg-gray-800/40"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      )}

      {/* BOTTOM MOBILE TAB BAR */}
      {user && (
        <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-gray-900 border-t border-gray-800 flex justify-around py-2">
          <BottomTab to="/feed" icon={<Flame />} label="Discover" />
          <BottomTab to="/connections" icon={<Heart />} label="Connect" />
          <BottomTab to="/requests" icon={<Mail />} label="Requests" badge />
          <BottomTab to="/profile" icon={<User />} label="Profile" />
        </div>
      )}
    </>
  );
}

/* --- Desktop Link --- */
function DesktopNavLink({ to, icon, label, badge }) {
  const location = useLocation();
  const active = location.pathname === to;
  return (
    <Link
      to={to}
      className={`px-4 py-2 rounded-lg flex items-center gap-2 ${active ? "bg-gray-800 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"}`}
    >
      {icon}
      {label}
      {badge && <span className="w-2.5 h-2.5 bg-pink-500 rounded-full" />}
    </Link>
  );
}

/* --- Mobile Slide Menu Item --- */
function MobileItem({ to, icon, label, close, badge }) {
  const location = useLocation();
  const active = location.pathname === to;
  return (
    <Link
      to={to}
      onClick={close}
      className={`flex justify-between items-center px-4 py-3 ${active ? "bg-gray-800 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"}`}
    >
      <div className="flex items-center gap-3">
        {icon}
        {label}
      </div>
      {badge && (
        <span className="bg-pink-500 text-xs px-2 py-0.5 rounded-full">3</span>
      )}
    </Link>
  );
}

/* --- Bottom Mobile Tab --- */
function BottomTab({ to, icon, label, badge }) {
  const location = useLocation();
  const active = location.pathname === to;
  return (
    <Link
      to={to}
      className={`flex flex-col items-center text-xs ${active ? "text-pink-500" : "text-gray-400"}`}
    >
      <div className="relative">
        {icon}
        {badge && (
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-pink-500 rounded-full" />
        )}
      </div>
      <span className="text-[10px] mt-1">{label}</span>
    </Link>
  );
}

export default Navbar;
