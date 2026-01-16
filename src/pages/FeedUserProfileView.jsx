import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaBriefcase,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaTimes,
  FaHeart,
  FaUser,
  FaCode,
  FaFolder,
  FaStar,
  FaCodeBranch,
  FaExternalLinkAlt,
  FaCheckCircle,
} from "react-icons/fa";

const ProfileView = () => {
  const navigate = useNavigate();
  

  return (
    <div className="min-h-screen py-8 px-4 bg-gray-900 text-white font-sans">
      <div className="max-w-4xl mx-auto">
        {/* --- Back Button --- */}
        <button
          onClick={() => navigate("/feed")}
          className="mb-6 text-gray-400 hover:text-white transition-all flex items-center group"
        >
          <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />{" "}
          Back to Feed
        </button>

        {/* --- Profile Header --- */}
        <div className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 rounded-3xl p-8 mb-8 relative overflow-hidden border border-cyan-500/10">
          {/* Decorative Blur */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full filter blur-3xl"></div>

          <div className="relative flex flex-col md:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
                alt="Alex Rivera"
                className="w-32 h-32 rounded-full ring-4 ring-cyan-500/50 bg-gray-800"
              />
              <span className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-gray-900"></span>
            </div>

            {/* Info */}
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl font-bold mb-1">Alex Rivera</h1>
              <p className="text-cyan-400 text-lg mb-2 font-medium">
                Senior Frontend Developer
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-gray-400 text-sm">
                <span className="flex items-center">
                  <FaMapMarkerAlt className="mr-1.5" /> San Francisco, CA
                </span>
                <span className="flex items-center">
                  <FaBriefcase className="mr-1.5" /> 5 years exp
                </span>
                <span className="flex items-center">
                  <FaGithub className="mr-1.5" /> alexrivera
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button className="px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl font-medium transition-all flex items-center border border-red-500/20">
                <FaTimes className="mr-2" /> Pass
              </button>
              <button className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-xl font-medium transition-all flex items-center shadow-lg shadow-green-900/20 text-white">
                <FaHeart className="mr-2" /> Connect
              </button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* --- Left Column (Main Info) --- */}
          <div className="md:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <FaUser className="mr-3 text-cyan-400" /> About
              </h2>
              <p className="text-gray-300 leading-relaxed text-sm">
                Passionate about React and building beautiful user interfaces.
                I've been working in tech for 5 years, primarily focusing on
                frontend development with React, TypeScript, and modern CSS
                frameworks. Currently looking for a backend partner for my next
                startup venture! 🚀
              </p>
            </div>

            {/* Skills Section */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <FaCode className="mr-3 text-cyan-400" /> Tech Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {[
                  "React",
                  "JavaScript",
                  "TypeScript",
                  "Next.js",
                  "Tailwind CSS",
                  "GraphQL",
                  "Vue.js",
                ].map((skill) => (
                  <span
                    key={skill}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      skill === "React"
                        ? "bg-blue-500/20 text-blue-400"
                        : skill === "JavaScript"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : skill === "TypeScript"
                        ? "bg-cyan-500/20 text-cyan-400"
                        : skill === "Next.js"
                        ? "bg-gray-600/30 text-gray-300"
                        : skill === "Tailwind CSS"
                        ? "bg-pink-500/20 text-pink-400"
                        : skill === "GraphQL"
                        ? "bg-purple-500/20 text-purple-400"
                        : "bg-green-500/20 text-green-400"
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Featured Projects */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <FaFolder className="mr-3 text-cyan-400" /> Featured Projects
              </h2>
              <div className="space-y-4">
                {/* Project 1 */}
                <div className="p-4 bg-gray-900 rounded-xl border border-gray-800 hover:border-cyan-500/30 transition-colors">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-white">
                        ReactFlow Dashboard
                      </h3>
                      <p className="text-gray-400 text-sm mt-1">
                        A modern analytics dashboard built with React and D3.js
                      </p>
                    </div>
                    <a
                      href="#"
                      className="text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <FaExternalLinkAlt />
                    </a>
                  </div>
                  <div className="flex gap-4 mt-3">
                    <span className="text-xs text-gray-500 flex items-center">
                      <FaStar className="text-yellow-500 mr-1.5" /> 234
                    </span>
                    <span className="text-xs text-gray-500 flex items-center">
                      <FaCodeBranch className="mr-1.5" /> 45
                    </span>
                  </div>
                </div>

                {/* Project 2 */}
                <div className="p-4 bg-gray-900 rounded-xl border border-gray-800 hover:border-cyan-500/30 transition-colors">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-white">
                        UI Component Library
                      </h3>
                      <p className="text-gray-400 text-sm mt-1">
                        Open-source React component library with 50+ components
                      </p>
                    </div>
                    <a
                      href="#"
                      className="text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <FaExternalLinkAlt />
                    </a>
                  </div>
                  <div className="flex gap-4 mt-3">
                    <span className="text-xs text-gray-500 flex items-center">
                      <FaStar className="text-yellow-500 mr-1.5" /> 1.2k
                    </span>
                    <span className="text-xs text-gray-500 flex items-center">
                      <FaCodeBranch className="mr-1.5" /> 189
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- Right Column (Sidebar) --- */}
          <div className="space-y-8">
            {/* Match Score */}
            <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-2xl p-6 border border-cyan-500/30 text-center">
              <h2 className="text-lg font-bold mb-4">Match Score</h2>
              <div className="relative w-32 h-32 mx-auto mb-4">
                {/* SVG Progress Circle */}
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#1f2937"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray="352"
                    strokeDashoffset="70" // 80% filled (352 * 0.2)
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="gradient">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">80%</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Great match! You share similar interests.
              </p>
            </div>

            {/* Skills in Common */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <h2 className="text-lg font-bold mb-4">Skills in Common</h2>
              <div className="space-y-3">
                {["React", "TypeScript", "Tailwind CSS"].map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-3 text-sm text-gray-300"
                  >
                    <FaCheckCircle className="text-green-500" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <h2 className="text-lg font-bold mb-4">Connect</h2>
              <div className="space-y-4">
                <a
                  href="#"
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-all group"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center border border-gray-700 group-hover:border-gray-500 transition-colors">
                    <FaGithub />
                  </div>
                  <span className="text-sm">github.com/alexrivera</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-all group"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center border border-gray-700 group-hover:border-blue-500 transition-colors">
                    <FaLinkedin className="text-blue-500" />
                  </div>
                  <span className="text-sm">linkedin.com/in/alexrivera</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-all group"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center border border-gray-700 group-hover:border-cyan-400 transition-colors">
                    <FaTwitter className="text-cyan-400" />
                  </div>
                  <span className="text-sm">@alex_codes</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
