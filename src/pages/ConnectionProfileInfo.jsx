import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
  FaGlobe,
  FaCalendarAlt,
  FaUser,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import SkillTags from "../components/SkillTags";
import { FaMessage } from "react-icons/fa6";
import { Mail, ShieldCheck, ExternalLink } from "lucide-react";

function ConnectionProfileInfo() {
  const navigate = useNavigate();
  const { id } = useParams();
  const connections = useSelector((s) => s.connection);
  const user = connections.find((u) => u._id === id);

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0B101B] text-slate-400 space-y-4">
        <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center">
          <FaUser size={24} />
        </div>
        <p className="text-xl font-semibold">Connection not found</p>
        <Link to="/connections" className="text-purple-500 hover:underline">
          Return to list
        </Link>
      </div>
    );
  }

  const memberSince = new Date(user.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });

  return (
    <div className="w-full min-h-screen bg-[#0B101B] py-10 px-4 font-sans text-slate-200 selection:bg-purple-500/30">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* TOP NAVIGATION */}
        <button
          onClick={() => navigate(-1)}
          className="group inline-flex items-center gap-2 font-bold text-slate-500 hover:text-white transition-all"
        >
          <div className="p-2 rounded-lg bg-slate-900 group-hover:bg-slate-800 border border-slate-800 group-hover:border-slate-700 transition-all cursor-pointer">
            <FaArrowLeft className="text-xs" />
          </div>
          <span className="cursor-pointer">Back to Connections</span>
        </button>

        {/* PROFILE HERO CARD */}
        <div className="relative group bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-8 md:p-12 overflow-hidden">
          {/* Ambient Background Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-purple-600/20 transition-all duration-700"></div>

          <div className="relative flex flex-col md:flex-row items-center gap-10">
            {/* Avatar Section */}
            <div className="relative">
              <div className="w-40 h-40 rounded-full ring-4 ring-purple-500/20 p-1.5 bg-gradient-to-tr from-purple-500 to-pink-500 shadow-2xl">
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 border-4 border-[#0B101B]">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
              <div
                className="absolute bottom-3 right-3 w-6 h-6 rounded-full bg-emerald-500 border-4 border-[#0B101B] shadow-lg"
                title="Matched & Connected"
              />
            </div>

            {/* Info Section */}
            <div className="flex-1 text-center md:text-left space-y-4">
              <div>
                <div className="flex items-center justify-center md:justify-start gap-3 mb-1">
                  <h1 className="text-4xl font-black text-white tracking-tight uppercase italic">
                    {user.name}
                  </h1>
                  <ShieldCheck size={24} className="text-blue-400" />
                </div>
                <p className="text-xl text-purple-400 font-semibold tracking-wide">
                  {user.headline || "Full Stack Developer"}
                </p>
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-slate-400 text-sm font-bold uppercase tracking-widest">
                {user.location?.city && (
                  <span className="flex items-center gap-2 hover:text-white transition-all">
                    <FaMapMarkerAlt className="text-purple-500" />
                    {user.location.city}, {user.location.country}
                  </span>
                )}
                {user.age && (
                  <span className="flex items-center gap-2 hover:text-white transition-all">
                    <FaUser className="text-purple-500" /> Age {user.age}
                  </span>
                )}
                <span className="flex items-center gap-2 hover:text-white transition-all">
                  <FaCalendarAlt className="text-purple-500" /> Joined{" "}
                  {memberSince}
                </span>
              </div>
            </div>

            {/* CTA Action */}
            <button
              onClick={() => navigate(`/messages/${id}`)}
              className="md:self-center px-8 py-4 bg-white text-slate-950 hover:bg-purple-100 rounded-2xl font-black transition-all flex items-center gap-3 shadow-xl active:scale-95 cursor-pointer"
            >
              <FaMessage size={18} />
              SEND MESSAGE
            </button>
          </div>
        </div>

        {/* CONTENT GRID */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT: Main Bio and Skills */}
          <div className="lg:col-span-2 space-y-8">
            {/* ABOUT */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 hover:bg-slate-900/60 transition-colors">
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                Professional Summary
              </h3>
              <p className="text-slate-300 text-lg leading-relaxed font-medium italic">
                "{user.about || "No detailed bio provided by the developer."}"
              </p>
            </div>

            {/* SKILLS */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 hover:bg-slate-900/60 transition-colors">
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                Tech Stack & Expertise
              </h3>
              <div className="flex flex-wrap gap-4">
                <SkillTags skills={user.skills} size="large" />
              </div>
            </div>
          </div>

          {/* RIGHT: Social Sidebar */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-800 rounded-3xl p-8">
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-8">
                Digital Footprint
              </h3>
              <div className="space-y-4">
                <SocialLink
                  icon={<FaGithub />}
                  label="GitHub"
                  value={user.social?.github}
                  url={`https://github.com/${user.social?.github}`}
                  color="hover:bg-white hover:text-black"
                />
                <SocialLink
                  icon={<FaLinkedin />}
                  label="LinkedIn"
                  value={user.social?.linkedin}
                  url={`https://linkedin.com/in/${user.social?.linkedin}`}
                  color="hover:bg-blue-600 hover:text-white"
                />
                <SocialLink
                  icon={<FaGlobe />}
                  label="Portfolio"
                  value={user.social?.website}
                  url={`https://${user.social?.website}`}
                  color="hover:bg-emerald-500 hover:text-white"
                />
              </div>

              <div className="mt-10 pt-8 border-t border-slate-800">
                <button className="w-full flex items-center justify-center gap-2 text-sm font-bold text-slate-500 hover:text-red-400 transition-colors">
                  <Mail size={16} /> Report Connection
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-component for Social Links
function SocialLink({ icon, label, value, url, color }) {
  if (!value) return null;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-between p-4 rounded-2xl bg-slate-950/40 border border-slate-800/50 transition-all group ${color}`}
    >
      <div className="flex items-center gap-3 font-bold">
        <span className="text-xl">{icon}</span>
        <span className="text-sm">{label}</span>
      </div>
      <ExternalLink
        size={14}
        className="opacity-0 group-hover:opacity-100 transition-opacity"
      />
    </a>
  );
}

export default ConnectionProfileInfo;
