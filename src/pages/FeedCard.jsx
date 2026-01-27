import { useEffect, useCallback } from "react";
import { useSelector } from "react-redux";

import { CheckCircle2 } from "lucide-react";
import { FaTimes, FaHeart } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

import SkillTags from "../components/SkillTags";

function FeedCard({ user, handleDislike, handleConnect }) {
  const data = useSelector((s) => s.feed);

  const { _id, name, avatar, about, headline, location, skills } = user;

  const city = location?.city || "";
  const country = location?.country || "";

  const handleKey = useCallback(
    (e) => {
      if (!data.length) return;

      if (!data.length) return;
      if (e.key === "ArrowLeft") handleDislike(_id);
      if (e.key === "ArrowRight") handleConnect(_id);
    },
    [data.length, _id, handleDislike, handleConnect],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  return (
    <div className="relative mt-2 w-full max-w-90 md:max-w-86 bg-slate-800 rounded-3xl shadow-2xl overflow-hidden border border-slate-700">
      <div className="relative h-62 w-full">
        <img
          src={avatar}
          alt={`${name} profile picture png`}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 to-transparent py-2 px-6 pt-20">
          <h2 className="text-3xl font-bold text-white flex items-center">
            {name}
            <CheckCircle2
              size={20}
              className="ml-2 text-blue-500"
              fill="currentColor"
              color="white"
            />
          </h2>
          <p className="text-pink-400 text-1xl font-medium">{headline}</p>
          {/* --- Location --- */}
          <div className="flex items-center gap-1 my-1 text-sm text-gray-400">
            <FaLocationDot />
            {city && country ? `${city}, ${country}` : "Location not available"}
          </div>
        </div>
      </div>

      <div className="py-3 px-6">
        <p className="text-slate-400 text-sm font-medium my-2 line-clamp-3">
          {about}
        </p>

        {/* --- Colorfull Skills Tags --- */}
        <div className="mt-3">
          {skills?.length > 0 && <SkillTags skills={skills} size="small" />}
        </div>

        {/* --- Action Buttons --- */}
        <div className="flex justify-center items-center gap-6 mt-6 mb-4">
          <button
            onClick={() => handleDislike(_id)}
            className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-500/10 hover:border-red-500 border-2 border-gray-700 transition-all group shadow-lg shadow-black/40 cursor-pointer"
            aria-label="Pass"
          >
            <FaTimes className="text-2xl text-gray-400 group-hover:text-red-500 transition-colors" />
          </button>

          <button
            onClick={() => handleConnect(_id)}
            className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-500/10 hover:border-green-500 border-2 border-gray-700 transition-all group shadow-lg shadow-black/40 cursor-pointer"
            aria-label="Connect"
          >
            <FaHeart className="text-2xl text-gray-400 group-hover:text-green-500 transition-colors" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default FeedCard;
