import axios from "axios";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { toast } from "react-toastify";

import { addUser } from "../features/userSlice";
import { BASE_URL } from "../utils/constants";
import Loading from "../pages/Loading";

function Login() {
  const {
    user,
    checked,
    loading: authLoading,
  } = useSelector((store) => store.user);

  const [email, setEmail] = useState("niraj@gmail.com");
  const [password, setPassword] = useState("Niraj@123");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Prevent flicker if auth is being checked
  if (!checked) return <Loading />;

  // If user is already logged in → redirect
  if (user) return <Navigate to="/feed" replace />;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validations
    if (!email.includes("@")) {
      return setError("Please enter a valid email address");
    }

    if (password.length < 6) {
      return setError("Password must be at least 6 characters long");
    }

    setSubmitting(true);

    try {
      const res = await axios.post(
        `${BASE_URL}/auth/login`,
        { email, password },
        { withCredentials: true },
      );

      toast.success("login successful!", { autoClose: 1500 });
      dispatch(addUser(res?.data?.user));
      navigate("/feed", { replace: true });
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Unable to login right now!";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-4 px-4 bg-gray-900 text-white font-sans">
      <div className="w-full max-w-96">
        <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 pl-12 bg-gray-900 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 transition-all text-white placeholder-gray-500"
                  placeholder="john@example.com"
                  required
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pl-12 pr-12 bg-gray-900 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-white placeholder-gray-500"
                  placeholder="••••••••"
                  required
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className={`w-full mt-4 py-3.5 rounded-xl font-bold text-white transition-all transform hover:scale-[1.02] shadow-lg shadow-purple-500/25 cursor-pointer ${
                submitting
                  ? "bg-gray-700 opacity-70 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90"
              }`}
            >
              {submitting ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gray-800 text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social Login */}
            <div className="mt-6 grid grid-cols-2 gap-2">
              <button
                disabled
                className="py-3 bg-gray-900 rounded-xl border border-gray-700 flex items-center justify-center text-gray-500 cursor-not-allowed"
              >
                <FaGithub className="w-5 h-5 mr-2" />
                (Soon)
              </button>
              <button
                disabled
                className="py-3 bg-gray-900 rounded-xl border border-gray-700 flex items-center justify-center text-gray-500 cursor-not-allowed"
              >
                <FaGoogle className="text-xl mr-2" />
                (Soon)
              </button>
            </div>
          </div>
        </div>

        <p className="text-center mt-8 text-gray-400">
          Don't have an account?
          <Link to="/signup" className="text-purple-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
