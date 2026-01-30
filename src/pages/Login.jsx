import axios from "axios";
import { Eye, EyeOff, Loader2, Lock, Mail, Rocket } from "lucide-react";
import { useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { addUser } from "../features/userSlice";
import Loading from "../pages/Loading";
import { BASE_URL } from "../utils/constants";
import InputField from "./InputField";

function Login() {
  const { user, checked } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "niraj@gmail.com",
    password: "Niraj@123",
  });

  // States for password show/hide, submit button loader, show error status messages
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  // Auth check
  if (!checked) return <Loading />;
  if (user) return <Navigate to="/feed" replace />;

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (statusMessage) setStatusMessage("");
  };

  // Form validation function
  const validateForm = () => {
    // email validation regex
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setStatusMessage("Please enter a valid email address");
      return false;
    }

    // password length check
    if (formData.password.length < 6) {
      setStatusMessage("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  // Login submit handler
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
      navigate("/feed", { replace: true });
    } catch (err) {
      setStatusMessage(
        err?.response?.data?.message ||
          "Invalid credentials. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-[#0B101B] font-sans">
      <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-600 mb-4 shadow-xl shadow-purple-500/20">
            <Rocket className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            DevTinder
          </h1>
          <p className="text-slate-400 mt-2">
            Connecting developers, one commit at a time.
          </p>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl rounded-[1rem] p-8 border border-slate-800 shadow-2xl shadow-black/50">
          <form onSubmit={handleLogin} className="space-y-5">
            {statusMessage && (
              <div className="p-4 rounded-xl border text-sm text-center animate-shake bg-red-500/10 border-red-500/20 text-red-400">
                {statusMessage}
              </div>
            )}

            <InputField
              label="Email Address"
              icon={<Mail className="w-5 h-5" />}
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="name@company.com"
              required
            />

            <div className="space-y-2">
              <div className="relative">
                <InputField
                  label="Password"
                  icon={<Lock className="w-5 h-5" />}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-[65%] -translate-y-1/2 text-slate-500 hover:text-white transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 mt-8 cursor-pointer rounded-xl font-black text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-purple-500/25 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Sign In to Account"
              )}
            </button>
          </form>

          {/* Social Divider */}
          <div className="mt-8 flex items-center gap-4">
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
