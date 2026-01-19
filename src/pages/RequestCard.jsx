import { X, Check } from "lucide-react";
import SkillTags from "../components/SkillTags";

function RequestCard({ user, reviewRequest }) {
  const { name, about, headline, avatar, skills } = user?.fromUserId || {};

  function timeAgo(date) {
    const diff = Date.now() - new Date(date);

    const m = Math.floor(diff / (1000 * 60));
    if (m < 60) return `${m} minutes ago`;

    const h = Math.floor(diff / (1000 * 60 * 60));
    if (h < 24) return `${h} hours ago`;

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    return `${d} days ago`;
  }

  const reqTime = timeAgo(user.createdAt);

  return (
    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={avatar || "../../public/default-avatar.png"}
            alt={name}
            className="w-16 h-16 rounded-full ring-2 ring-purple-500/50"
          />
          <div>
            <h3 className="font-bold text-lg">{name}</h3>
            <p className="text-purple-400 text-sm">{headline}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <SkillTags skills={skills} btn />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span
            title={new Date(user.createdAt).toLocaleString()}
            className="text-gray-500 text-sm mr-4 cursor-pointer"
          >
            {reqTime}
          </span>
          <button
            onClick={() => reviewRequest("rejected", user._id)}
            className="px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-xl font-medium transition-all flex items-center gap-2 cursor-pointer"
          >
            <X size={16} />
            Decline
          </button>
          <button
            onClick={() => reviewRequest("accepted", user._id)}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-xl font-medium transition-all flex items-center gap-2 cursor-pointer"
          >
            <Check size={16} />
            Accept
          </button>
        </div>
      </div>
      <div className="mt-4 p-4 bg-gray-900/50 rounded-xl">
        <p className="text-gray-300 text-sm italic line-clamp-3">{about}</p>
      </div>
    </div>
  );
}

export default RequestCard;
