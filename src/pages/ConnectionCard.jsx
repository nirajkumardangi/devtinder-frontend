import { MoreVertical, MessageSquare, User } from "lucide-react";
import SkillTags from "../components/SkillTags";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function ConnectionCard({ data, onRemoveConnection }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all group flex flex-col">
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-3 border-gray-500 overflow-hidden transition group-hover:border-purple-500">
              <img
                src={data.avatar}
                alt={data.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg leading-tight">{data.name}</h3>
            <p className="text-purple-400 text-sm truncate max-w-[200px]">
              {data.headline}
            </p>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="hover:bg-gray-800 rounded-lg transition text-gray-400 hover:text-white cursor-pointer p-1"
          >
            <MoreVertical className="w-5 h-5" />
          </button>

          {open && (
            <div
              ref={menuRef}
              className="absolute right-0 z-10 w-40 bg-gray-900 border border-gray-700 rounded-xl shadow-xl overflow-hidden text-sm"
            >
              <button
                onClick={() => navigate(`/connections/${data._id}`)}
                className="block w-full px-4 py-2 text-left text-gray-200 hover:bg-gray-800 cursor-pointer"
              >
                View Profile
              </button>

              <button
                onClick={() => navigate(`/messages/${data._id}`)}
                className="block w-full px-4 py-2 text-left text-gray-200 hover:bg-gray-800 cursor-pointer"
              >
                Message
              </button>

              {data.social?.github && (
                <a
                  href={`https://github.com/${data.social.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-4 py-2 text-left text-gray-200 hover:bg-gray-800 cursor-pointer"
                >
                  GitHub
                </a>
              )}

              <button
                onClick={() => onRemoveConnection(data._id)}
                className="block w-full px-4 py-2 text-left text-red-400 hover:bg-gray-800 cursor-pointer"
              >
                Remove
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mb-4">
        <SkillTags skills={data.skills} btn />
      </div>
      <p className="text-gray-400 text-sm font-medium mb-6 line-clamp-2">
        {data.about}
      </p>

      <div className="flex gap-3 mt-auto">
        <button
          onClick={() => navigate(`/messages/${data._id}`)}
          className="flex-1 py-2.5 bg-purple-600 hover:bg-purple-700 rounded-xl text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <MessageSquare className="w-4 h-4" /> Message
        </button>

        <button
          onClick={() => navigate(`/connections/${data._id}`)}
          className="px-4 py-2.5 bg-gray-700 hover:bg-gray-600 rounded-xl text-gray-200 hover:text-white transition-all cursor-pointer"
        >
          <User className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default ConnectionCard;
