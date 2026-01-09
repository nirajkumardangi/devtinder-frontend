import axios from "axios";
import { Code2 } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../context/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

function Login() {
  const [email, setEmail] = useState("niraj@gmail.com");
  const [password, setPassword] = useState("Niraj@123");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.user));
      return navigate("/feed");
    } catch (err) {
      console.error("Login error: ", err);
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-slate-800 p-8 rounded-2xl shadow-2xl border border-slate-700">
        <div className="text-center mb-8">
          <Code2 className="h-12 w-12 text-pink-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-slate-400">Login to continue matching</p>
        </div>

        <form className="space-y-6">
          <div className="flex flex-col space-y-2">
            <label className="text-slate-400 text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="dev@example.com"
              className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-pink-500 outline-none"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-slate-400 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-pink-500 outline-none"
            />
          </div>

          <button
            type="button"
            onClick={handleLogin}
            className="w-full py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold rounded-lg hover:cursor-pointer hover:opacity-90 transition-opacity shadow-lg shadow-pink-500/25"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-slate-400">
            Don't have an account?{" "}
            <span className="text-pink-500 font-medium cursor-pointer">
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
