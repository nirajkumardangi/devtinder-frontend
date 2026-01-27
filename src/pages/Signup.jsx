import axios from "axios";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { addUser } from "../features/userSlice";
import { BASE_URL } from "../utils/constants";
import Loading from "../pages/Loading";

function Signup() {
  const { user, checked } = useSelector((state) => state.user);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    headline: "",
    skills: "",
    location: {
      city: "",
      country: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!checked) return <Loading />;
  if (user) return <Navigate to="/feed" replace />;

  // universal change handler
  const handleChange = (e) => {
    const { name, value } = e.target;

    // nested location fields
    if (name === "city" || name === "country") {
      return setForm((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [name]: value,
        },
      }));
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
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

    // VALIDATIONS
    if (!payload.name) return setError("Name is required");
    if (!payload.email.includes("@")) return setError("Invalid email");
    if (payload.password.length < 6)
      return setError("Password must be at least 6 chars");
    if (!payload.headline) return setError("Headline is required");
    if (payload.skills.length === 0) return setError("Skills cannot be empty");
    if (!payload.location.city || !payload.location.country)
      return setError("City & Country required");

    setSubmitting(true);

    try {
      const res = await axios.post(`${BASE_URL}/auth/signup`, payload, {
        withCredentials: true,
      });

      toast.success("Account created successfully!", { autoClose: 1500 });
      dispatch(addUser(res?.data?.user));
      navigate("/feed", { replace: true });
    } catch (err) {
      const message = err?.response?.data?.message || "Signup failed!";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-10 px-4 bg-gray-900 text-white">
      <div className="w-full max-w-4xl">
        <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-xl">
          <form onSubmit={handleSignup} className="space-y-5">
            {error && (
              <div className="p-3 text-sm text-red-400 bg-red-500/10 border border-red-500/40 rounded-lg text-center">
                {error}
              </div>
            )}

            {/* Name + Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: "name", label: "Full Name", placeholder: "John Doe" },
                {
                  name: "email",
                  label: "Email",
                  placeholder: "john@example.com",
                },
              ].map((input) => (
                <div key={input.name}>
                  <label className="text-sm text-gray-300 mb-1 block">
                    {input.label}
                  </label>
                  <input
                    name={input.name}
                    value={form[input.name]}
                    onChange={handleChange}
                    placeholder={input.placeholder}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:border-purple-500 outline-none"
                  />
                </div>
              ))}
            </div>

            {/* Headline + Skills */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  name: "headline",
                  label: "Headline",
                  placeholder: "Frontend Developer",
                },
                { name: "skills", label: "Skills", placeholder: "React, Node" },
              ].map((input) => (
                <div key={input.name}>
                  <label className="text-sm text-gray-300 mb-1 block">
                    {input.label}
                  </label>
                  <input
                    name={input.name}
                    value={form[input.name]}
                    onChange={handleChange}
                    placeholder={input.placeholder}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:border-purple-500 outline-none"
                  />
                </div>
              ))}
            </div>

            {/* City + Country + Password */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: "city", label: "City", placeholder: "Noida" },
                { name: "country", label: "Country", placeholder: "Delhi" },
              ].map((input) => (
                <div key={input.name}>
                  <label className="text-sm text-gray-300 mb-1 block">
                    {input.label}
                  </label>
                  <input
                    name={input.name}
                    value={form.location[input.name]}
                    onChange={handleChange}
                    placeholder={input.placeholder}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:border-purple-500 outline-none"
                  />
                </div>
              ))}

              {/* Password */}
              <div>
                <label className="text-sm text-gray-300 mb-1 block">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 pr-10 bg-gray-900 border border-gray-700 rounded-xl focus:border-purple-500 outline-none"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-4 text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              disabled={submitting}
              type="submit"
              className={`w-full py-3.5 font-semibold rounded-xl transition cursor-pointer ${
                submitting
                  ? "bg-gray-700 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90"
              }`}
            >
              {submitting ? "Creating..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-400 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
