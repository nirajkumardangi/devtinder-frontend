import axios from "axios";
import { useState, useCallback } from "react";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Briefcase,
  Code2,
  MapPin,
  Globe,
  Lock,
  Loader2,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { addUser } from "../features/userSlice";
import { BASE_URL } from "../utils/constants";
import Loading from "../pages/Loading";

function Signup() {
  const { user, checked } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    headline: "",
    skills: "",
    location: { city: "", country: "" },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!checked) return <Loading />;
  if (user) return <Navigate to="/feed" replace />;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "city" || name === "country") {
      setForm((prev) => ({
        ...prev,
        location: { ...prev.location, [name]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
    if (error) setError(""); // Clear error when user types
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    // Prepare payload
    const payload = {
      ...form,
      name: form.name.trim(),
      email: form.email.trim(),
      headline: form.headline.trim(),
      skills: form.skills
        .split(/[\s,]+/)
        .map((s) => s.trim())
        .filter(Boolean),
      location: {
        city: form.location.city.trim(),
        country: form.location.country.trim(),
      },
    };

    // Front-end Validation
    if (
      !payload.name ||
      !payload.email ||
      !payload.password ||
      !payload.headline ||
      payload.skills.length === 0
    ) {
      return setError("All fields are required");
    }
    if (payload.password.length < 6)
      return setError("Password must be at least 6 characters");

    setSubmitting(true);
    try {
      const res = await axios.post(`${BASE_URL}/auth/signup`, payload, {
        withCredentials: true,
      });
      toast.success("Welcome to the community!");
      dispatch(addUser(res?.data?.user));
      navigate("/feed", { replace: true });
    } catch (err) {
      setError(
        err?.response?.data?.message || "Something went wrong. Try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-[#0B101B] font-sans">
      <div className="w-full max-w-2xl animate-in fade-in zoom-in duration-500">
        <div className="bg-slate-900/50 backdrop-blur-xl rounded-[1.5rem] p-8 md:p-12 border border-slate-800 shadow-2xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-white tracking-tight mb-2">
              Create Account
            </h1>
            <p className="text-slate-400">
              Join thousands of developers matching daily.
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-6">
            {error && (
              <div className="p-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-2xl text-center animate-shake">
                {error}
              </div>
            )}

            {/* Section: Basic Identity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Full Name"
                name="name"
                icon={<User size={18} />}
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
              />
              <InputField
                label="Email Address"
                name="email"
                type="email"
                icon={<Mail size={18} />}
                value={form.email}
                onChange={handleChange}
                placeholder="john@example.com"
              />
            </div>

            {/* Section: Professional Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Headline"
                name="headline"
                icon={<Briefcase size={18} />}
                value={form.headline}
                onChange={handleChange}
                placeholder="Full Stack Developer"
              />
              <InputField
                label="Skills (comma separated)"
                name="skills"
                icon={<Code2 size={18} />}
                value={form.skills}
                onChange={handleChange}
                placeholder="React, Node, Go"
              />
            </div>

            {/* Section: Location & Security */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InputField
                label="City"
                name="city"
                icon={<MapPin size={18} />}
                value={form.location.city}
                onChange={handleChange}
                placeholder="Mumbai"
              />
              <InputField
                label="Country"
                name="country"
                icon={<Globe size={18} />}
                value={form.location.country}
                onChange={handleChange}
                placeholder="India"
              />

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
                  Password
                </label>
                <div className="relative group">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full px-5 py-3.5 pl-11 bg-slate-950 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all text-white placeholder-slate-600"
                  />
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-purple-500 transition-colors"
                    size={18}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <button
              disabled={submitting}
              type="submit"
              className="w-full py-4 mt-4 cursor-pointer bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black rounded-2xl shadow-lg shadow-purple-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {submitting ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                "Build My Profile"
              )}
            </button>
          </form>

          <p className="text-center mt-8 text-slate-500 text-sm">
            Already a member?{" "}
            <Link
              to="/login"
              className="text-white font-bold hover:text-purple-400 transition-colors"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// Helper Sub-component to keep code clean
const InputField = ({ label, icon, ...props }) => (
  <div className="space-y-2">
    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
      {label}
    </label>
    <div className="relative group">
      <input
        {...props}
        className="w-full px-5 py-3.5 pl-11 bg-slate-950 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all text-white placeholder-slate-600"
      />
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-purple-500 transition-colors">
        {icon}
      </div>
    </div>
  </div>
);

export default Signup;
