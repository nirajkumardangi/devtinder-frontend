import {
  FaMapMarkerAlt,
  FaCalendar,
  FaGithub,
  FaLinkedin,
  FaGlobe,
  FaEdit,
  FaUser,
  FaCamera,
  FaLink,
} from "react-icons/fa";
import { BsCodeSlash } from "react-icons/bs";
import { useSelector } from "react-redux";
import SkillTags from "../components/SkillTags";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user, checked } = useSelector((s) => s.user);
  const requests = useSelector((s) => s.request);
  const connections = useSelector((s) => s.connection);
  const navigate = useNavigate();

  if (!checked) return <Loading />;

  // If somehow no user exists
  if (!user) return <Loading />;

  const { name, avatar, about, headline, location, skills, createdAt, social } =
    user;

  const city = location?.city || "";
  const country = location?.country || "";

  const joinedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });

  const hasSocial = social?.github || social?.linkedin || social?.website;

  return (
    <div className="w-full min-h-screen bg-[#0B101B] py-10 px-4 font-sans text-slate-200">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* ================= HEADER CARD ================= */}
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>

          <div className="relative flex flex-col md:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full ring-4 ring-purple-500/60 p-[3px] bg-white/10">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img
                    src={avatar }
                    alt="profile"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>

              <button className="absolute bottom-1 right-1 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-700 transition-all cursor-pointer shadow-lg">
                <FaCamera className="text-white" size={18} />
              </button>
            </div>

            {/* Profile Info */}
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold mb-1">{name}</h1>
              <p className="text-purple-400 text-base mb-2">{headline}</p>
              <div className="flex flex-wrap justify-center md:justify-start font-medium gap-x-4 gap-y-1 text-gray-400 whitespace-nowrap">
                {(city || country) && (
                  <span className="flex items-center gap-1 hover:text-white transition-all">
                    <FaMapMarkerAlt /> {`${city},  ${country}`}
                  </span>
                )}
                <span className="flex items-center gap-1 hover:text-white transition-all">
                  <FaCalendar /> Joined {joinedDate}
                </span>
                {hasSocial && (
                  <a
                    href={`http://github.com/${social.github}`}
                    target="_blank"
                  >
                    <span className="flex items-center gap-1 hover:text-blue-400 cursor-pointer transition-all">
                      <FaLink /> http://github.com/{social.github}
                    </span>
                  </a>
                )}
              </div>
            </div>

            {/* Edit Button */}
            <button
              onClick={() => navigate("/profile-edit")}
              className="md:ml-auto px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl font-medium transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <FaEdit /> Edit Profile
            </button>
          </div>
        </div>

        {/* ================= MAIN CONTENT GRID ================= */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* --- LEFT COLUMN (2/3 width) --- */}
          <div className="md:col-span-2 space-y-8">
            {/* ABOUT ME */}
            <div className="bg-[#161E2D] border border-slate-800 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <FaUser className="text-purple-500 text-lg" />
                <h3 className="text-xl font-bold text-white">About Me</h3>
              </div>
              <p className="text-slate-300 text-sm md:text-lg font-medium leading-relaxed">
                {about || "No bio added yet."}
              </p>
            </div>

            {/* SKILLS & TECHNOLOGIES */}
            <div className="bg-[#161E2D] border border-slate-800 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <BsCodeSlash className="text-purple-500 text-xl font-bold" />
                <h3 className="text-xl font-bold text-white">
                  Skills & Technologies
                </h3>
              </div>

              {skills.length > 0 ? (
                <div className="flex flex-wrap gap-3 font-medium">
                  <SkillTags skills={skills} size="medium" btn />
                </div>
              ) : (
                <p className="text-gray-500 italic">No skills added yet.</p>
              )}
            </div>
          </div>

          {/* --- RIGHT COLUMN (1/3 width) --- */}
          <div className="space-y-8">
            {/* PROFILE STATS */}
            <div className="bg-[#161E2D] border border-slate-800 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold mb-5 text-white text-lg">
                Profile Stats
              </h3>
              <div className="space-y-3 text-base font-medium">
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-400">Profile Views</span>
                  <span className="text-purple-400 text-base">
                    {connections.length + requests.length}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-400">Connections</span>
                  <span className="text-green-400 text-base">
                    {connections.length}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-400">Pending Requests</span>
                  <span className="text-yellow-400 text-base">
                    {requests.length}
                  </span>
                </div>
              </div>
            </div>

            {/* SOCIAL LINKS */}
            {hasSocial && (
              <div className="bg-[#161E2D] border border-slate-800 rounded-2xl font-medium p-6 shadow-sm">
                <h3 className="font-bold mb-5 text-white text-lg">
                  Social Links
                </h3>
                <div className="space-y-4">
                  {social.github && (
                    <a
                      target="_blank"
                      className="flex items-center gap-3 text-slate-400 hover:text-white transition group"
                      href={`https://github.com/${social.github}`}
                    >
                      <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-slate-700 transition">
                        <FaGithub className="text-white" />
                      </div>
                      <span className="truncate max-w-[180px]">
                        /{social.github}
                      </span>
                    </a>
                  )}

                  {social.linkedin && (
                    <a
                      target="_blank"
                      className="flex items-center gap-3 text-slate-400 hover:text-white transition group"
                      href={`https://www.linkedin.com/in/${social.linkedin}`}
                    >
                      <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-blue-600/20 transition">
                        <FaLinkedin className="text-blue-500" />
                      </div>
                      <span className="truncate max-w-[180px]">
                        /{social.linkedin}
                      </span>
                    </a>
                  )}

                  {social.website && (
                    <a
                      target="_blank"
                      className="flex items-center gap-3 text-slate-400 hover:text-white transition group "
                      href={`https://${social.website}`}
                    >
                      <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-purple-500/20 transition">
                        <FaGlobe className="text-purple-500" />
                      </div>
                      <span className="truncate max-w-[180px]">
                        /{social.website}
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

export default Profile;
