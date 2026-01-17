import { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../features/userSlice";
import axios from "axios";
import { Code2, Lock, Mail } from "lucide-react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { BASE_URL } from "../utils/constants";
import { toast } from "react-toastify";

function Login() {
  const { user, checked } = useSelector((store) => store.user);

  const [email, setEmail] = useState("niraj@gmail.com");
  const [password, setPassword] = useState("Niraj@123");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (user && checked) return <Navigate to="/feed" replace />;

  const handleLogin = async (e) => {
    // Prevent default form submission if called via onSubmit
    if (e) e.preventDefault();

    // Reset error on new attempt
    setError("");

    try {
      const res = await axios.post(
        BASE_URL + "/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      toast.success("Welcome back!");
      dispatch(addUser(res?.data?.user));
      return navigate("/feed");
    } catch (err) {
      toast.error("Login failed!");
      setError(err?.response?.data?.message || "Something went wrong!");
      console.error("Login error: ", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-4 px-4 bg-gray-900 text-white font-sans">
      <div className="w-full max-w-96">
        {/* --- Login Card --- */}
        <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Error Message Display */}
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 pl-12 bg-gray-900 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-white placeholder-gray-500"
                  placeholder="john@example.com"
                  required
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pl-12 bg-gray-900 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-white placeholder-gray-500"
                  placeholder="••••••••"
                  required
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-4 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-white hover:opacity-90 transition-all transform hover:scale-[1.02] shadow-lg shadow-purple-500/25 cursor-pointer"
            >
              Sign In
            </button>
          </form>

          {/* --- Divider --- */}
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

            {/* --- Social Buttons --- */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <button className="py-3 bg-gray-900 rounded-xl border border-gray-700 hover:border-gray-500 transition-all flex items-center justify-center text-gray-300 hover:text-white hover:bg-gray-800/50 cursor-pointer">
                <FaGithub className="w-5 h-5 mr-2" />
                GitHub
              </button>
              <button className="py-3 bg-gray-900 rounded-xl border border-gray-700 hover:border-gray-500 transition-all flex items-center justify-center text-gray-300 hover:text-white hover:bg-gray-800/50 cursor-pointer">
                <FaGoogle className="text-xl mr-2 text-white" />
                Google
              </button>
            </div>
          </div>
        </div>

        {/* --- Footer --- */}
        <p className="text-center mt-8 text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-purple-400 hover:text-purple-300 font-medium hover:underline transition-all cursor-pointer"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
