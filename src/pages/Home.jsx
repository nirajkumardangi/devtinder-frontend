import { Link } from "react-router-dom";
import {
  FaRocket,
  FaPlay,
  FaCheckCircle,
  FaTimes,
  FaHeart,
  FaUsers,
  FaLaptopCode,
  FaComments,
  FaArrowRight,
  FaCode,
  FaGlobeAmericas,
} from "react-icons/fa";
import SkillTags from "../components/SkillTags";

function Home() {
  return (
    <div className="min-h-screen bg-[#0B101B] text-slate-200 font-sans overflow-x-hidden selection:bg-purple-500/30">
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] bg-pink-600/10 rounded-full blur-[120px] animate-pulse delay-700" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50 contrast-150 pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          {/* --- Left Content --- */}
          <div className="text-center md:text-left space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-xs font-bold uppercase tracking-widest">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              Now Live: Version 3.0
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tight">
              Build Your <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400">
                Dream Team
              </span>
            </h1>

            <p className="text-xl text-slate-400 max-w-lg mx-auto md:mx-0 leading-relaxed font-medium">
              The networking platform for developers. Match with engineers, find
              project partners, and grow your tech circle through meaningful
              swipes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                to="/login"
                className="px-8 py-4 bg-white text-slate-950 rounded-2xl font-black text-lg hover:bg-purple-50 transition-all flex items-center justify-center gap-3 shadow-xl shadow-white/5 group"
              >
                <FaRocket className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                Get Started
              </Link>
              <Link
                to="/feed"
                className="px-8 py-4 bg-slate-900 border border-slate-800 text-white rounded-2xl font-black text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
              >
                <FaPlay size={14} /> Explore Feed
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center md:justify-start gap-6 pt-4 border-t border-slate-800/50 max-w-sm mx-auto md:mx-0">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
                <FaCheckCircle className="text-emerald-500" /> Open Source
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
                <FaCheckCircle className="text-emerald-500" /> 10K+ Matches
              </div>
            </div>
          </div>

          {/* --- Right Column: Floating UI --- */}
          <div className="relative hidden lg:flex justify-center items-center perspective-1000 animate-in fade-in slide-in-from-right-12 duration-1000">
            <div className="relative w-90 h-[500px] animate-float group">
              {/* Dynamic Background Glow - Synced with Card */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Secondary Stacked Cards (Visual Depth) */}
              <div className="absolute inset-0 bg-slate-800/40 rounded-[2.5rem] transform rotate-6 border border-slate-700/50 backdrop-blur-sm" />
              <div className="absolute inset-0 bg-slate-800/60 rounded-[2.5rem] transform -rotate-3 border border-slate-700/50 backdrop-blur-sm" />

              {/* Main Card Container */}
              <div className="relative bg-slate-900/90 rounded-[2rem] p-8 border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] backdrop-blur-xl h-full flex flex-col items-center">
                {/* Avatar Section with Online Pulse */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping duration-[3s]" />
                  <div className="relative w-28 h-28 rounded-full ring-4 ring-slate-800 overflow-hidden bg-slate-800 shadow-inner">
                    <img
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                      alt="Sarah"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Status Badge */}
                  <div className="absolute bottom-1 right-1 w-6 h-6 bg-emerald-500 rounded-full border-[4px] border-[#161E2D] shadow-lg" />
                </div>

                {/* Profile Header */}
                <div className="text-center space-y-1">
                  <h3 className="text-2xl font-black text-white tracking-tight">
                    Sarah Chen
                  </h3>
                  <div className="flex items-center justify-center gap-2">
                    <span className="px-2 py-0.5 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-md text-[9px] font-black uppercase tracking-tighter">
                      L7 Senior
                    </span>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                      Full Stack Engineer
                    </p>
                  </div>
                </div>

                {/* Skill Tags with improved spacing */}
                <div className="mt-8 flex justify-center">
                  <SkillTags
                    skills={["React", "Node.js", "Go", "Docker", "AWS"]}
                    size="small"
                    btn={false}
                  />
                </div>

                {/* Bio / Quote Section */}
                <div className="mt-8 relative">
                  <span className="absolute -top-3 -left-2 text-4xl text-slate-800 font-serif">
                    “
                  </span>
                  <p className="text-slate-400 text-xs text-center leading-relaxed font-medium italic px-2">
                    Building distributed systems and looking for a co-founder
                    for a web3 project.
                  </p>
                </div>

                {/* Improved Action Buttons */}
                <div className="mt-auto flex gap-5 pb-2 w-full justify-center">
                  {/* Dislike Button */}
                  <button className="w-14 h-14 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-center text-slate-500 hover:text-red-500 hover:border-red-500/50 hover:bg-red-500/5 transition-all duration-300 shadow-xl active:scale-90">
                    <FaTimes size={22} />
                  </button>

                  {/* Like Button */}
                  <button className="w-14 h-14 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-2xl flex items-center justify-center text-white shadow-[0_10px_20px_-5px_rgba(168,85,247,0.4)] hover:scale-110 hover:shadow-[0_15px_30px_-5px_rgba(168,85,247,0.6)] transition-all duration-300 active:scale-95">
                    <FaHeart size={22} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-32 bg-slate-900/50 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <FeatureCard
              icon={<FaUsers />}
              title="Collaborative Networking"
              desc="Forget boring corporate profiles. Match based on project ideas and technical compatibility."
            />
            <FeatureCard
              icon={<FaCode />}
              title="Smart Stack Matching"
              desc="Our algorithm analyzes your skills and interests to find engineers who complement your workflow."
            />
            <FeatureCard
              icon={<FaGlobeAmericas />}
              title="Global Community"
              desc="Connect with developers from 50+ countries. Remote-first networking at your fingertips."
            />
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { n: "10K+", l: "Devs Online" },
            { n: "5K+", l: "Projects Born" },
            { n: "1M+", l: "Messages Sent" },
            { n: "24/7", l: "Uptime" },
          ].map((s, i) => (
            <div key={i} className="space-y-2">
              <div className="text-5xl font-black text-white">{s.n}</div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-[3rem] p-12 md:p-20 shadow-2xl relative">
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
                Ready to Ship?
              </h2>
              <p className="text-white/80 text-lg mb-12 font-medium">
                Stop building in silos. Join the community and find your perfect
                dev match today.
              </p>
              <Link
                to="/signup"
                className="inline-flex items-center gap-3 px-10 py-5 bg-white text-slate-950 rounded-2xl font-black text-xl hover:bg-slate-50 transition-all hover:scale-105"
              >
                Sign Up Now <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="group space-y-4 p-8 bg-slate-900 border border-slate-800 rounded-3xl hover:border-purple-500/50 transition-colors">
      <div className="w-12 h-12 bg-purple-600/10 rounded-xl flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <p className="text-slate-400 leading-relaxed text-sm font-medium">
        {desc}
      </p>
    </div>
  );
}

export default Home;
