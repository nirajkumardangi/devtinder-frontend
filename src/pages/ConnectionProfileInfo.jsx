import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaMapMarkerAlt,
  FaGlobe,
  FaCalendarAlt,
  FaUser,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import SkillTags from "../components/SkillTags";
import { FaMessage } from "react-icons/fa6";

function ConnectionProfileInfo() {
  const navigate = useNavigate();
  const { id } = useParams();
  const connections = useSelector((s) => s.connection);
  const user = connections.find((u) => u._id === id);

  if (!user) {
    return (
      <div className="text-center text-slate-400 py-20">User not found</div>
    );
  }

  const memberSince = new Date(user.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });

  return (
    <div className="w-full min-h-screen bg-[#0B101B] py-10 px-4 font-sans text-slate-200">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* BACK BUTTON */}
        <Link
          to="/connections"
          className="inline-flex items-center gap-2 font-bold text-slate-400 hover:text-white mb-6 transition-all"
        >
          <FaArrowLeft className="text-sm" />
          <span>Back to connections</span>
        </Link>

        {/* HEADER CARD */}
        <div className="bg-[#1E293B] rounded-3xl p-8 relative overflow-hidden border border-slate-800">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>

          <div className="relative flex flex-col md:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full ring-4 ring-purple-500/60 p-[3px] bg-white/10">
                <img
                  src={user.avatar}
                  alt="profile"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <span className="absolute bottom-1 right-2 w-5 h-5 rounded-full bg-green-500 border-2 border-[#0B101B]" />
            </div>

            {/* Name + meta */}
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold mb-1 text-white">
                {user.name}
              </h1>

              {user.headline && (
                <p className="text-purple-400 text-base font-medium mb-2">
                  {user.headline}
                </p>
              )}

              <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-1 font-medium text-gray-400 whitespace-nowrap">
                {user.location?.city && (
                  <span className="flex items-center gap-1 hover:text-white transition-all">
                    <FaMapMarkerAlt className="text-sm" />
                    {user.location.city}, {user.location.country}
                  </span>
                )}

                {user.age && (
                  <span className="flex items-center gap-1 hover:text-white transition-all">
                    <FaUser className="text-sm" /> Age: {user.age}
                  </span>
                )}

                {user.createdAt && (
                  <span className="flex items-center gap-1 hover:text-white transition-all">
                    <FaCalendarAlt className="text-sm" /> Member since{" "}
                    {memberSince}
                  </span>
                )}
              </div>
            </div>

            {/* Edit Button */}
            <button
              onClick={() => navigate("/message:id")}
              className="md:ml-auto px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl font-medium transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <FaMessage /> Message
            </button>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* LEFT COLUMN */}
          <div className="md:col-span-2 space-y-8">
            {/* ABOUT */}
            <div className="bg-[#161E2D] border border-slate-800 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-white mb-4">About</h3>
              <p className="text-slate-300 leading-relaxed sm:font-sm md:font-medium">
                {user.about || "No about info provided"}
              </p>
            </div>

            {/* SKILLS */}
            <div className="bg-[#161E2D] border border-slate-800 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-white mb-4">Tech Stack</h3>
              <SkillTags skills={user.skills} size="medium" btn />
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-8">
            {/* SOCIAL LINKS */}
            {user.social && (
              <div className="bg-[#161E2D] border border-slate-800 rounded-2xl p-6 shadow-sm font-medium">
                <h3 className="text-lg text-white font-bold mb-5">Connect</h3>
                <div className="space-y-4">
                  {user.social.github && (
                    <a
                      href={`https://github.com/${user.social.github}`}
                      target="_blank"
                      className="flex items-center gap-3 text-slate-400 hover:text-white transition group"
                    >
                      <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-slate-700 transition">
                        <FaGithub className="text-white" />
                      </div>
                      <span className="truncate max-w-[180px]">
                        /{user.social.github}
                      </span>
                    </a>
                  )}

                  {user.social.linkedin && (
                    <a
                      href={`https://linkedin.com/in/${user.social.linkedin}`}
                      target="_blank"
                      className="flex items-center gap-3 text-slate-400 hover:text-white transition group"
                    >
                      <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-blue-600/20 transition">
                        <FaLinkedin className="text-blue-500" />
                      </div>
                      <span className="truncate max-w-[180px]">
                        /{user.social.linkedin}
                      </span>
                    </a>
                  )}

                  {user.social.website && (
                    <a
                      href={`https://${user.social.website}`}
                      target="_blank"
                      className="flex items-center gap-3 text-slate-400 hover:text-white transition group"
                    >
                      <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-purple-500/20 transition">
                        <FaGlobe className="text-purple-500" />
                      </div>
                      <span className="truncate max-w-[180px]">
                        {user.social.website}
                      </span>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConnectionProfileInfo;
