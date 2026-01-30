import { Heart, Github, Linkedin, Terminal } from "lucide-react";
import { useSelector } from "react-redux";

function Footer() {
  const { user } = useSelector((s) => s.user);

  return (
    <footer
      className={`bg-[#0B101B] border-t border-slate-800/50 py-6 px-4 transition-all text-sm ${user ? "mb-12 md:mb-0" : "mb-0"}`}
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-center gap-6">
        {/* Brand/Credit Section */}
        <div className="flex flex-col md:flex-row items-center gap-2 text-slate-400 font-medium">
          <div className="flex items-center gap-2">
            <Terminal size={16} className="text-purple-500" />
            <span>© 2026 DevTinder. Built for developers by</span>
          </div>

          <a
            href="https://github.com/nirajkumardangi/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1 rounded-full hover:border-purple-500/50 transition-all"
          >
            <span className="text-slate-200 group-hover:text-purple-400 transition-colors">
              @NirajKumarDangi
            </span>
            <div className="w-1 h-1 rounded-full bg-slate-700 group-hover:bg-purple-500" />
            <Heart
              size={14}
              className="text-pink-500 fill-pink-500 group-hover:animate-pulse"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
