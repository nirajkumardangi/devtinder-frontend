import axios from "axios";
import { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { addUser } from "../features/userSlice";
import { BASE_URL } from "../utils/constants";
import Loading from "../pages/Loading";

function Signup() {
  const { user, checked } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!checked) return <Loading />;
  if (user) return <Navigate to="/feed" replace />;

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) return setError("Name is required");
    if (!email.includes("@")) return setError("Please enter a valid email");
    if (password.length < 6)
      return setError("Password must be at least 6 characters long");

    setSubmitting(true);

    try {
      const res = await axios.post(
        `${BASE_URL}/auth/signup`,
        { name, email, password },
        { withCredentials: true },
      );

      toast.success("Account created successfully!", { autoClose: 1500 });
      dispatch(addUser(res?.data?.user));
      navigate("/feed", { replace: true });
    } catch (err) {
      const message =
        err?.response?.data?.message || err?.message || "Signup failed!";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-4 px-4 bg-gray-900 text-white font-sans">
      <div className="w-full max-w-96">
        <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-2xl">
          <form onSubmit={handleSignup} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 pl-12 bg-gray-900 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 transition-all text-white placeholder-gray-500"
                />
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              </div>
            </div>

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
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 pl-12 bg-gray-900 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 transition-all text-white placeholder-gray-500"
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
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pl-12 pr-12 bg-gray-900 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-white placeholder-gray-500"
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              disabled={submitting}
              type="submit"
              className={`w-full mt-4 py-3.5 rounded-xl font-bold text-white transition-all transform hover:scale-[1.02] shadow-lg shadow-purple-500/25 cursor-pointer ${
                submitting
                  ? "bg-gray-700 opacity-70 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90"
              }`}
            >
              {submitting ? "Creating account..." : "Sign Up"}
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
                  Or sign up with
                </span>
              </div>
            </div>

            {/* Social Login Disabled */}
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
          Already have an account?
          <Link to="/login" className="text-purple-400 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
