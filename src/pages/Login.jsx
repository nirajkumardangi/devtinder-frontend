import axios from "axios";
import { Eye, EyeOff, Loader2, Lock, Mail, Rocket } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { addUser } from "../features/userSlice";
import Loading from "../pages/Loading";
import { BASE_URL } from "../utils/constants";

function Login() {
  const { user, checked } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailRef = useRef(null);

  const [formData, setFormData] = useState({
    email: "niraj@gmail.com",
    password: "Niraj@123",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });

  // Auto-focus email on mount
  useEffect(() => {
    if (checked && !user) emailRef.current?.focus();
  }, [checked, user]);

  if (!checked) return <Loading />;
  if (user) return <Navigate to="/feed" replace />;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (statusMessage.text) setStatusMessage({ type: "", text: "" });
  };

  const validateForm = () => {
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setStatusMessage({
        type: "error",
        text: "Please enter a valid email address",
      });
      return false;
    }
    if (formData.password.length < 6) {
      setStatusMessage({
        type: "error",
        text: "Password must be at least 6 characters",
      });
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, formData, {
        withCredentials: true,
      });

      toast.success("Welcome back!");
      dispatch(addUser(res?.data?.user));
      navigate("/feed", replace);
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        "Invalid credentials. Please try again.";
      setStatusMessage({ type: "error", text: msg });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-[#0B101B] font-sans">
      <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-600 mb-4 shadow-xl shadow-purple-500/20">
            <Rocket className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            DevTinder
          </h1>
          <p className="text-slate-400 mt-2">
            Connecting developers, one commit at a time.
          </p>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl rounded-[1.5rem] p-8 border border-slate-800 shadow-2xl shadow-black/50">
          <form onSubmit={handleLogin} className="space-y-5">
            {statusMessage.text && (
              <div
                className={`p-4 rounded-xl border text-sm text-center animate-shake ${
                  statusMessage.type === "error"
                    ? "bg-red-500/10 border-red-500/20 text-red-400"
                    : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                }`}
              >
                {statusMessage.text}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
                Email Address
              </label>
              <div className="relative group mt-1">
                <input
                  ref={emailRef}
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-5 py-3.5 pl-12 bg-slate-950 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all text-white placeholder-slate-600"
                  placeholder="name@company.com"
                  required
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-purple-500 transition-colors w-5 h-5" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  Password
                </label>
                {/* <Link
                  to="/forgot"
                  className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Forgot?
                </Link> */}
              </div>
              <div className="relative group mt-1">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-5 py-3.5 pl-12 pr-12 bg-slate-950 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all text-white placeholder-slate-600"
                  placeholder="••••••••"
                  required
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-purple-500 transition-colors w-5 h-5" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 cursor-pointer rounded-2xl font-black text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-purple-500/25 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Sign In to Account"
              )}
            </button>
          </form>

          {/* Social Divider */}
          <div className="mt-10 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-800"></div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
              Social Connect
            </span>
            <div className="h-px flex-1 bg-slate-800"></div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <button
              disabled
              className="py-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center text-slate-600 cursor-not-allowed group transition-all"
            >
              <FaGithub className="w-5 h-5 mr-2" />
              <span className="text-xs font-bold">GitHub</span>
            </button>
            <button
              disabled
              className="py-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center text-slate-600 cursor-not-allowed group transition-all"
            >
              <FaGoogle className="w-5 h-5 mr-2" />
              <span className="text-xs font-bold">Google</span>
            </button>
          </div>
        </div>

        <p className="text-center mt-8 text-slate-500 text-sm">
          New to the community?{" "}
          <Link
            to="/signup"
            className="text-white font-bold hover:text-purple-400 transition-colors"
          >
            Join DevTinder
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
