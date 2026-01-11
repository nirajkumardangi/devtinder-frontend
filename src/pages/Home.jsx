import BackgroundGrid from "../components/BackgroundGrid";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="relative w-full min-h-screen bg-slate-950 overflow-hidden font-sans selection:bg-pink-500 selection:text-white">
      {/* --- BACKGROUND GRID */}
      <BackgroundGrid />

      {/* --- HERO CONTENT --- */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <h1 className="text-7xl md:text-8xl font-black text-white -tracking-normal mb-6 drop-shadow-2xl">
          Start something epic
        </h1>

        <p className="text-lg md:text-2xl text-slate-200 mb-10 max-w-2xl mx-auto font-medium shadow-black drop-shadow-md">
          The only dating app designed for developers.{" "}
          <br className="hidden md:block" />
          Connect based on <span className="text-pink-400">tech stack</span>,
          coding style, and commits.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto">
          <Link
            to="/login"
            className="flex-1 px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full font-bold text-xl hover:shadow-lg hover:shadow-pink-500/40 hover:scale-105 transition-all duration-300"
          >
            Create Account
          </Link>
        </div>

        <p className="mt-6 text-slate-400 text-sm">
          Join 250,000+ developers today.
        </p>
      </div>
    </div>
  );
}

export default Home;
