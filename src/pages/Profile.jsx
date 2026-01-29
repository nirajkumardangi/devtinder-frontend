import {
  FaMapMarkerAlt,
  FaCalendar,
  FaGithub,
  FaLinkedin,
  FaGlobe,
  FaEdit,
  FaUser,
  FaCamera,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { BsCodeSlash } from "react-icons/bs";
import { useSelector } from "react-redux";
import SkillTags from "../components/SkillTags";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user, checked } = useSelector((s) => s.user);
  const requests = useSelector((s) => s.request) || [];
  const connections = useSelector((s) => s.connection) || [];
  const navigate = useNavigate();

  // Handle loading or missing user state
  if (!checked || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B101B]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-purple-500"></div>
      </div>
    );
  }

  const { name, avatar, about, headline, location, skills, createdAt, social } =
    user;
  const joinedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });

  const hasSocial = social?.github || social?.linkedin || social?.website;

  return (
    <div className="w-full min-h-screen bg-[#0B101B] py-12 px-4 font-sans text-slate-200">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* ================= HERO SECTION ================= */}
        <div className="relative group overflow-hidden bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-8 md:p-12 transition-all hover:border-purple-500/30">
          {/* Animated Background Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-purple-600/20 transition-all duration-700"></div>

          <div className="relative flex flex-col md:flex-row items-center md:items-end gap-8">
            {/* Avatar with Status Ring */}
            <div className="relative">
              <div className="w-40 h-40 rounded-full ring-4 ring-purple-500/20 p-1.5 bg-gradient-to-tr from-purple-500 to-pink-500">
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 border-4 border-[#0B101B]">
                  <img
                    src={avatar || `https://ui-avatars.com/api/?name=${name}`}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <button
                onClick={() => navigate("/profile-edit")}
                className="absolute bottom-2 right-2 w-10 h-10 bg-slate-800 hover:bg-purple-600 border border-slate-700 rounded-full flex items-center justify-center transition-all shadow-xl cursor-pointer"
              >
                <FaCamera size={16} />
              </button>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2 uppercase italic">
                    {name}
                  </h1>
                  <p className="text-xl text-purple-400 font-medium mb-4">
                    {headline || "Developer"}
                  </p>
                </div>
                <button
                  onClick={() => navigate("/profile-edit")}
                  className="px-6 py-2.5 bg-white text-slate-900 hover:bg-purple-100 rounded-full font-bold transition-all flex items-center justify-center gap-2 transform active:scale-95 cursor-pointer"
                >
                  <FaEdit /> Edit Profile
                </button>
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-6 text-slate-400 text-sm font-medium border-t border-slate-800/50 pt-4">
                {location && (
                  <span className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-purple-500" />{" "}
                    {location.city}, {location.country}
                  </span>
                )}
                <span className="flex items-center gap-2">
                  <FaCalendar className="text-purple-500" /> Member since{" "}
                  {joinedDate}
                </span>
                {social?.github && (
                  <a
                    href={`https://github.com/${social.github}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 hover:text-white transition-colors"
                  >
                    <FaGithub /> github.com/{social.github}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ================= CONTENT GRID ================= */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* LEFT: About & Skills (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* About Card */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 transition-all hover:bg-slate-900/60">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <FaUser className="text-purple-500" />
                </div>
                <h3 className="text-xl font-bold text-white uppercase tracking-wider">
                  About Bio
                </h3>
              </div>
              <p className="text-slate-300 text-lg leading-relaxed">
                {about ||
                  "This developer prefers to keep their story a mystery..."}
              </p>
            </div>

            {/* Skills Card */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 transition-all hover:bg-slate-900/60">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-pink-500/10 rounded-lg">
                  <BsCodeSlash className="text-pink-500 text-xl" />
                </div>
                <h3 className="text-xl font-bold text-white uppercase tracking-wider">
                  Tech Stack
                </h3>
              </div>
              {skills?.length > 0 ? (
                <div className="flex flex-wrap gap-4">
                  <SkillTags skills={skills} size="large" />
                </div>
              ) : (
                <p className="text-slate-500 italic">No skills listed yet.</p>
              )}
            </div>
          </div>

          {/* RIGHT: Stats & Links (4 Cols) */}
          <div className="lg:col-span-4 space-y-8">
            {/* Stats Card */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-800 rounded-3xl p-6 shadow-2xl">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-[0.2em] mb-6">
                Network Insights
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800">
                  <p className="text-2xl font-black text-white">
                    {connections.length}
                  </p>
                  <p className="text-xs text-slate-500 font-bold uppercase mt-1">
                    Connections
                  </p>
                </div>
                <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800">
                  <p className="text-2xl font-black text-purple-400">
                    {requests.length}
                  </p>
                  <p className="text-xs text-slate-500 font-bold uppercase mt-1">
                    Pending
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links Card */}
            {hasSocial && (
              <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-[0.2em] mb-6">
                  Digital Footprint
                </h3>
                <div className="space-y-3">
                  {social.github && (
                    <SocialItem
                      icon={<FaGithub />}
                      label="GitHub"
                      value={`/${social.github}`}
                      href={`https://github.com/${social.github}`}
                      hoverClass="hover:bg-white/10 hover:text-white"
                    />
                  )}
                  {social.linkedin && (
                    <SocialItem
                      icon={<FaLinkedin />}
                      label="LinkedIn"
                      value={`/in/${social.linkedin}`}
                      href={`https://linkedin.com/in/${social.linkedin}`}
                      hoverClass="hover:bg-blue-600/20 hover:text-blue-400"
                    />
                  )}
                  {social.website && (
                    <SocialItem
                      icon={<FaGlobe />}
                      label="Portfolio"
                      value={social.website}
                      href={`https://${social.website}`}
                      hoverClass="hover:bg-emerald-500/20 hover:text-emerald-400"
                    />
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

// Sub-component for Social Links to keep code clean
function SocialItem({ icon, label, value, href, hoverClass }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`flex items-center justify-between p-3 rounded-xl bg-slate-950/30 border border-slate-800/50 transition-all group ${hoverClass}`}
    >
      <div className="flex items-center gap-3">
        <span className="text-lg">{icon}</span>
        <span className="text-sm font-medium">{label}</span>
      </div>
      <FaExternalLinkAlt
        size={12}
        className="opacity-0 group-hover:opacity-100 transition-opacity"
      />
    </a>
  );
}

export default Profile;
