import React, { useState, memo } from "react";
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
  Bell,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { removeUser } from "../features/userSlice";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { user } = useSelector((store) => store.user);
  const requests = useSelector((store) => store.request) || [];

  const handleLogout = () => {
    dispatch(removeUser());
    setIsMobileMenuOpen(false);
    navigate("/");
    toast.info("See you soon, Dev!", { position: "bottom-right" });
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[100] bg-[#0B101B]/80 backdrop-blur-xl border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* BRAND LOGO */}
            <Link
              to="/"
              onClick={closeMobileMenu}
              className="group flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform">
                <Code className="text-white w-6 h-6" strokeWidth={2.5} />
              </div>
              <span className="hidden sm:block text-xl font-black tracking-tighter text-white uppercase italic">
                DevTinder
              </span>
            </Link>

            {/* CENTER: DESKTOP NAVIGATION */}
            {user && (
              <nav className="hidden md:flex items-center bg-slate-900/50 border border-slate-800 p-1 rounded-2xl">
                <DesktopNavLink
                  to="/feed"
                  icon={<Flame size={18} />}
                  label="Explore"
                />
                <DesktopNavLink
                  to="/connections"
                  icon={<Heart size={18} />}
                  label="Matches"
                />
                <DesktopNavLink
                  to="/requests"
                  icon={<Mail size={18} />}
                  label="Requests"
                  badgeCount={requests.length}
                />
              </nav>
            )}

            {/* RIGHT: PROFILE / AUTH */}
            <div className="flex items-center gap-2">
              {user ? (
                <div className="flex items-center gap-3">
                  {/* Notifications Icon (Desktop) */}
                  <button className="hidden sm:flex p-2 text-slate-400 hover:text-white transition-colors relative cursor-pointer">
                    <Bell size={20} />
                    {requests.length > 0 && (
                      <span className="absolute top-2 right-2 w-2 h-2 bg-pink-500 rounded-full border-2 border-[#0B101B]" />
                    )}
                  </button>

                  {/* Profile Dropdown Trigger */}
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 transition-all group"
                  >
                    <img
                      src={
                        user.avatar ||
                        `https://ui-avatars.com/api/?name=${user.name}`
                      }
                      alt="User Avatar"
                      className="w-8 h-8 rounded-lg object-cover"
                    />
                    <div className="hidden lg:block text-left">
                      <p className="text-xs font-bold text-white leading-none">
                        {user?.name?.split(" ")[0]}
                      </p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="hidden md:flex p-2 text-slate-500 hover:text-red-400 transition-colors cursor-pointer"
                    title="Logout"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <Link to="/login">
                  <button className="px-6 py-2 bg-white text-slate-950 rounded-xl font-bold hover:bg-purple-50 transition-all shadow-xl active:scale-95 cursor-pointer">
                    Log In
                  </button>
                </Link>
              )}

              {/* MOBILE MENU BUTTON */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-xl text-slate-300 hover:bg-slate-800"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE FULL-SCREEN OVERLAY MENU */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[90] bg-[#0B101B] md:hidden animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="pt-24 pb-8 px-6 flex flex-col h-full">
            <div className="flex flex-col gap-2">
              <MobileItem
                to="/feed"
                icon={<Flame />}
                label="Discover Feed"
                close={closeMobileMenu}
              />
              <MobileItem
                to="/connections"
                icon={<Heart />}
                label="My Connections"
                close={closeMobileMenu}
              />
              <MobileItem
                to="/requests"
                icon={<Mail />}
                label="Requests"
                badgeCount={requests.length}
                close={closeMobileMenu}
              />
              <MobileItem
                to="/profile"
                icon={<User />}
                label="My Profile"
                close={closeMobileMenu}
              />
            </div>

            <div className="mt-auto border-t border-slate-800 pt-6">
              <button
                onClick={handleLogout}
                className="flex w-full items-center justify-center gap-3 px-4 py-4 rounded-2xl bg-red-500/10 text-red-400 font-bold"
              >
                <LogOut size={20} /> Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BOTTOM TAB BAR (MOBILE NATIVE FEEL) */}
      {user && (
        <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#0B101B]/90 backdrop-blur-lg border-t border-slate-800 flex justify-around items-center px-2 py-3">
          <BottomTab to="/feed" icon={<Flame size={22} />} label="Feed" />
          <BottomTab
            to="/connections"
            icon={<Heart size={22} />}
            label="Connect"
          />
          <BottomTab
            to="/requests"
            icon={<Mail size={22} />}
            label="Inbox"
            badgeCount={requests.length}
          />
          <BottomTab to="/profile" icon={<User size={22} />} label="You" />
        </div>
      )}
    </>
  );
};

/* --- Sub-Components (Memoized for Performance) --- */

const DesktopNavLink = memo(({ to, icon, label, badgeCount }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      className={`px-5 py-2 rounded-xl flex items-center gap-2.5 transition-all text-sm font-bold uppercase tracking-wider ${
        isActive
          ? "bg-purple-600 text-white shadow-lg shadow-purple-900/20"
          : "text-slate-400 hover:text-white"
      }`}
    >
      {icon}
      <span>{label}</span>
      {badgeCount > 0 && (
        <span className="flex items-center justify-center min-w-[18px] h-[18px] bg-pink-500 text-[10px] text-white rounded-md px-1 font-black">
          {badgeCount}
        </span>
      )}
    </Link>
  );
});

const MobileItem = memo(({ to, icon, label, close, badgeCount }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      onClick={close}
      className={`flex justify-between items-center px-6 py-4 rounded-2xl transition-all ${
        isActive
          ? "bg-purple-600 text-white"
          : "text-slate-400 hover:bg-slate-800/50"
      }`}
    >
      <div className="flex items-center gap-4 text-lg font-bold">
        {icon}
        {label}
      </div>
      {badgeCount > 0 && (
        <span className="bg-pink-500 text-white text-xs px-2.5 py-1 rounded-lg font-black">
          {badgeCount}
        </span>
      )}
    </Link>
  );
});

const BottomTab = memo(({ to, icon, label, badgeCount }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      className={`relative flex flex-col items-center flex-1 transition-all ${
        isActive ? "text-purple-500" : "text-slate-500"
      }`}
    >
      <div className="relative">
        {icon}
        {badgeCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center bg-pink-500 text-[9px] text-white font-black rounded-full border-2 border-[#0B101B]">
            {badgeCount}
          </span>
        )}
      </div>
      <span className="text-[10px] font-bold mt-1 uppercase tracking-tighter">
        {label}
      </span>
      {isActive && (
        <div className="absolute -bottom-3 w-8 h-1 bg-purple-500 rounded-full" />
      )}
    </Link>
  );
});

export default memo(Navbar);
