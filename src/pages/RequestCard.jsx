import { X, Check, Clock } from "lucide-react";
import SkillTags from "../components/SkillTags";

function RequestCard({ user, reviewRequest }) {
  const { name, about, headline, avatar, skills } = user?.fromUserId || {};

  function timeAgo(date) {
    const diff = Date.now() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  }

  return (
    <div className="group bg-slate-900/50 border border-slate-800 rounded-2xl p-6 transition-all hover:bg-slate-900/80 hover:border-slate-700">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Avatar & Info */}
        <div className="flex flex-1 gap-5">
          <div className="relative shrink-0">
            <img
              src={avatar || "/default-avatar.png"}
              alt={name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-slate-800 group-hover:ring-purple-500/30 transition-all"
            />
          </div>

          <div className="space-y-1 flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-white leading-tight">
                {name}
              </h3>
              <span className="flex items-center gap-1.5 text-slate-500 text-[10px] font-bold uppercase lg:hidden">
                <Clock size={12} /> {timeAgo(user.createdAt)}
              </span>
            </div>
            <p className="text-purple-400 text-sm font-medium">{headline}</p>

            <div className="pt-2">
              <SkillTags skills={skills?.slice(0, 5)} size="small" />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between lg:justify-end gap-3 border-t lg:border-t-0 border-slate-800 pt-4 lg:pt-0">
          <span className="hidden lg:flex items-center gap-1.5 text-slate-500 text-xs font-medium mr-4">
            <Clock size={14} /> {timeAgo(user.createdAt)}
          </span>

          <div className="flex items-center gap-2 w-full lg:w-auto">
            <button
              onClick={() => reviewRequest("rejected", user._id)}
              className="flex-1 lg:flex-none px-5 py-2.5 bg-slate-800 hover:bg-red-500/10 text-slate-400 hover:text-red-400 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <X size={18} />
              Ignore
            </button>
            <button
              onClick={() => reviewRequest("accepted", user._id)}
              className="flex-1 lg:flex-none px-5 py-2.5 bg-white text-slate-950 hover:bg-purple-100 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 cursor-pointer"
            >
              <Check size={18} />
              Accept
            </button>
          </div>
        </div>
      </div>

      {/* Bio Snippet */}
      {about && (
        <div className="mt-5 p-4 bg-slate-950/40 border border-slate-800/50 rounded-2xl">
          <p className="text-slate-400 text-sm italic leading-relaxed line-clamp-2">
            "{about}"
          </p>
        </div>
      )}
    </div>
  );
}

export default RequestCard;
