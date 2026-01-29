import {
  MoreVertical,
  MessageSquare,
  User,
  Github,
  ExternalLink,
  Trash2,
} from "lucide-react";
import SkillTags from "../components/SkillTags";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function ConnectionCard({ data, onRemoveConnection }) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setShowMenu(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="group relative bg-slate-900/40 border border-slate-800 rounded-[1rem] p-6 hover:bg-slate-900/60 hover:border-purple-500/30 transition-all duration-300 flex flex-col h-full">
      {/* Top Section: Avatar & Action Menu */}
      <div className="flex items-start justify-between mb-6 gap-2">
        {" "}
        {/* Added gap and items-start */}
        <div className="flex items-center gap-4 min-w-0 flex-1">
          {" "}
          {/* Added min-w-0 and flex-1 */}
          <div className="relative shrink-0">
            <div className="w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-slate-800 group-hover:ring-purple-500/50 transition-all duration-300">
              <img
                src={data.avatar}
                alt={data.name}
                className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>
          {/* Text Container */}
          <div className="flex-1 min-w-0">
            {" "}
            {/* Essential: min-w-0 allows truncation */}
            <h3 className="font-bold text-white text-lg truncate leading-tight group-hover:text-purple-400 transition-colors">
              {data.name}
            </h3>
            <p className="text-slate-500 text-xs font-medium uppercase tracking-wider truncate block w-full">
              {data.headline || "Developer"}
            </p>
          </div>
        </div>
        {/* Menu Section */}
        <div className="relative shrink-0" ref={menuRef}>
          {" "}
          {/* Added shrink-0 to prevent menu from being squished */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 hover:bg-slate-800 rounded-xl transition-colors text-slate-500 hover:text-white cursor-pointer"
          >
            <MoreVertical size={18} />
          </button>
          {showMenu && (
            <div className="absolute right-0 top-full mt-2 z-50 w-48 bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              <button
                onClick={() => navigate(`/connections/${data._id}`)}
                className="flex items-center gap-3 w-full px-4 py-3 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
              >
                <User size={16} /> View Profile
              </button>
              {data.social?.github && (
                <a
                  href={`https://github.com/${data.social.github}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 w-full px-4 py-3 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
                >
                  <Github size={16} /> GitHub Profile
                </a>
              )}
              <div className="h-px bg-slate-700 mx-2 my-1" />
              <button
                onClick={() => onRemoveConnection(data._id)}
                className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
              >
                <Trash2 size={16} /> Remove Match
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Skills & Bio */}
      <div className="flex-1 space-y-4">
        <div className="flex flex-wrap gap-1.5 overflow-hidden max-h-16">
          <SkillTags skills={data.skills?.slice(0, 4)} size="small" />
        </div>
        <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 italic">
          "{data.about || "Matching to build great things."}"
        </p>
      </div>

      {/* Footer Actions */}
      <div className="mt-8 flex gap-3">
        <button
          onClick={() => navigate(`/messages/${data._id}`)}
          className="flex-[3] py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-purple-900/20 transition-all active:scale-95 cursor-pointer"
        >
          <MessageSquare size={18} /> Chat
        </button>

        <button
          onClick={() => navigate(`/connections/${data._id}`)}
          className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl flex items-center justify-center transition-all group/btn cursor-pointer"
        >
          <ExternalLink
            size={18}
            className="group-hover/btn:scale-110 transition-transform"
          />
        </button>
      </div>
    </div>
  );
}

export default ConnectionCard;
