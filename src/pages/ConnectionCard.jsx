import { MoreVertical, MessageSquare, User } from "lucide-react";
import SkillTags from "../components/SkillTags";

function ConnectionCard({ data }) {
  return (
    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all group flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-3 border-gray-500 overflow-hidden transition group-hover:border-purple-500">
              <img
                src={data.avatar}
                alt={data.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Status Indicator */}
            <span
              className={`absolute bottom-1 right-0 w-3.5 h-3.5 rounded-full border-2 border-gray-900 ${
                data.status === "online" ? "bg-green-500" : "bg-gray-500"
              }`}
            />
          </div>

          {/* Name */}
          <div>
            <h3 className="font-semibold text-lg leading-tight">{data.name}</h3>
            <p className="text-purple-400 text-sm mt-0.5 truncate max-w-[200px] lg:max-w-[150px] xl:max-w-[200px]">
              {data.headline}
            </p>
          </div>
        </div>

        {/* Menu */}
        <button className=" hover:bg-gray-800 rounded-lg transition text-gray-400 hover:text-white cursor-pointer">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      {/* Skills */}
      <div className="mb-4">
        <SkillTags skills={data.skills} btn />
      </div>

      {/* Bio */}
      <p className="text-gray-400 text-sm font-medium mb-6 flex-1 line-clamp-2">
        {data.about}
      </p>

      {/* Actions */}
      <div className="flex gap-3 mt-auto">
        <button className="flex-1 py-2.5 bg-purple-600 hover:bg-purple-700 rounded-xl font-medium text-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-900/20 cursor-pointer">
          <MessageSquare className="w-4 h-4" />
          Message
        </button>
        <button className="px-4 py-2.5 bg-gray-700 hover:bg-gray-600 rounded-xl transition-all text-gray-200 hover:text-white cursor-pointer">
          <User className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default ConnectionCard;
