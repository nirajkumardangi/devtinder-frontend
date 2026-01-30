import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaRocket,
  FaGithub,
  FaCheckCircle,
  FaFire,
  FaAward,
  FaStar,
  FaTimes,
  FaHeart,
  FaBookmark,
} from "react-icons/fa";

function Hero() {
  const [particles, setParticles] = useState([]);

  // Fix for Hydration errors: Generate random positions only on the client
  useEffect(() => {
    const newParticles = [...Array(15)].map((_, i) => ({
      id: i,
      x: Math.random() * 100, // use percentage for better responsiveness
      y: Math.random() * 100,
      duration: Math.random() * 10 + 10,
    }));
    setParticles(newParticles);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const staggerContainer = {
    animate: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020617]">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-purple-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

        {/* Optimized Particles */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute w-1 h-1 bg-purple-400/40 rounded-full"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Content */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="text-center lg:text-left"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-medium backdrop-blur-md mb-6"
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <FaFire className="text-orange-400" />
            v2.0.4: AI-Powered Matching Live
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl xl:text-8xl font-black text-white leading-[1.1] tracking-tight mb-6"
          >
            Deploy <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-gradient">
              Your Career.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg text-slate-400 max-w-lg mx-auto lg:mx-0 leading-relaxed mb-8"
          >
            The high-performance networking protocol for developers. Match based
            on
            <span className="text-indigo-300 font-mono bg-indigo-500/10 px-2 py-0.5 rounded mx-1">
              actual_code_quality
            </span>
            rather than social fluff.
          </motion.p>

          {/* Stats */}
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-3 gap-8 mb-10 max-w-md mx-auto lg:mx-0 border-y border-white/5 py-6"
          >
            <div>
              <div className="text-2xl font-bold text-white">98%</div>
              <div className="text-xs uppercase tracking-wider text-slate-500">
                Accuracy
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">850ms</div>
              <div className="text-xs uppercase tracking-wider text-slate-500">
                Latency
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">12k+</div>
              <div className="text-xs uppercase tracking-wider text-slate-500">
                Devs
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <Link
              to="/login"
              className="group relative px-8 py-4 bg-white text-black rounded-xl font-bold transition-all hover:bg-purple-50 flex items-center justify-center gap-2"
            >
              <FaRocket className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              Initialize Profile
            </Link>
            <button className="px-8 py-4 bg-slate-900 border border-slate-700 text-white rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
              <FaGithub size={20} /> Join via GitHub
            </button>
          </motion.div>
        </motion.div>

        {/* Right Side - UI Card */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="absolute h-100 w-75 inset-0 bg-purple-600/10 blur-[80px] -z-10" />
          <div className="bg-slate-900/80 border border-white/10 rounded-[1.5rem] p-8 backdrop-blur-3xl shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="text-[10px] font-mono text-slate-500 bg-white/5 px-3 py-1 rounded-full">
                match_engine_v2.ts
              </div>
            </div>

            {/* Profile */}
            <div className="flex items-center gap-5 mb-8">
              <div className="relative">
                <img
                  src="https://github.com/nirajkumardangi.png"
                  className="w-20 h-20 rounded-2xl bg-slate-800 border border-white/10"
                  alt="Developer Avatar"
                />
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 p-1.5 rounded-full border-4 border-[#0f172a]">
                  <FaCheckCircle className="text-[10px] text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  Niraj kr. Dangi <FaAward className="text-amber-400 text-sm" />
                </h3>
                <p className="text-emerald-400 font-mono text-xs">
                  98.2% Match Rank
                </p>
                <div className="flex gap-1 mt-1.5">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-amber-500 text-[10px]" />
                  ))}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-[10px] mb-2 font-mono">
                <span className="text-slate-400">SYNERGY SCORE</span>
                <span className="text-purple-400">98%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "98%" }}
                  transition={{ duration: 1.5, delay: 1 }}
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                />
              </div>
            </div>

            {/* Tags */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                <p className="text-[10px] text-slate-500 uppercase mb-1">
                  Primary Stack
                </p>
                <p className="text-sm font-semibold text-white">
                  Javascript / Node
                </p>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                <p className="text-[10px] text-slate-500 uppercase mb-1">
                  Experience
                </p>
                <p className="text-sm font-semibold text-white">Junior (2y)</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                aria-label="Pass"
                className="flex-1 py-4 bg-white/5 hover:bg-red-500/10 rounded-2xl border border-white/5 transition-colors"
              >
                <FaTimes className="mx-auto text-slate-400" />
              </button>
              <button
                aria-label="Like"
                className="flex-[2] py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg shadow-purple-500/20"
              >
                <FaHeart className="mx-auto text-white" />
              </button>
              <button
                aria-label="Save"
                className="flex-1 py-4 bg-white/5 hover:bg-blue-500/10 rounded-2xl border border-white/5 transition-colors"
              >
                <FaBookmark className="mx-auto text-slate-400" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 4s linear infinite;
        }
      `}</style>
    </section>
  );
}

export default Hero;
