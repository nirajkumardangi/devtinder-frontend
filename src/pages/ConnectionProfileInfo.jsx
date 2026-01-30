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
import { FaMessage } from "react-icons/fa6";
import { Mail, ShieldCheck, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SkillTags from "../components/SkillTags";
import { addConnections } from "../features/connectionSlice";
import axios from "axios";
import Loading from "./Loading";
import { BASE_URL } from "../utils/constants";

function ConnectionProfileInfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const connections = useSelector((s) => s.connection);
  const [loading, setLoading] = useState(false);

  // Connection data from Redux
  const user = connections.find((u) => u._id === id);

  useEffect(() => {
    // after page refresh user not found, then fetch connections
    if (!user) {
      setLoading(true);
      axios
        .get(`${BASE_URL}/users/connections`, { withCredentials: true })
        .then((res) => {
          dispatch(addConnections(res.data?.data || []));
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [id, user, dispatch]);

  if (loading) return <Loading />; 

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
    <div className="w-full min-h-screen bg-[#0B101B] py-10 px-4 text-slate-200">
      <div className="max-w-5xl mx-auto space-y-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-slate-500 hover:text-white font-bold cursor-pointer"
        >
          <FaArrowLeft /> Back to Connections
        </button>

        <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-40 h-40 rounded-full object-cover ring-4 ring-purple-500/20"
            />
            <div className="flex-1 text-center md:text-left space-y-3">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <h1 className="text-4xl font-black uppercase italic">
                  {user.name}
                </h1>
                <ShieldCheck className="text-blue-400" />
              </div>
              <p className="text-purple-400 font-semibold text-xl">
                {user.headline || "Full Stack Developer"}
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-slate-400 font-bold">
                {user.location?.city && (
                  <span className="flex items-center gap-1">
                    <FaMapMarkerAlt /> {user.location.city},{" "}
                    {user.location.country}
                  </span>
                )}
                {user.age && (
                  <span className="flex items-center gap-1">
                    <FaUser /> Age {user.age}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <FaCalendarAlt /> Joined {memberSince}
                </span>
              </div>
            </div>
            <button
              onClick={() => navigate(`/messages/${id}`)}
              className="px-8 py-4 bg-white text-black rounded-2xl font-black flex items-center gap-2 hover:bg-purple-100 transition-colors cursor-pointer"
            >
              <FaMessage /> SEND MESSAGE
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-8">
              <h3 className="text-xs uppercase tracking-widest text-slate-500 mb-4">
                Professional Summary
              </h3>
              <p className="italic text-slate-300">
                "{user.about || "No bio provided."}"
              </p>
            </div>
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-8">
              <h3 className="text-xs uppercase tracking-widest text-slate-500 mb-4">
                Tech Stack
              </h3>
              <SkillTags skills={user.skills} size="large" />
            </div>
          </div>
          <div className="space-y-6">
            <SocialLink
              icon={<FaGithub />}
              label="GitHub"
              value={user.social?.github}
              url={`https://github.com/${user.social?.github}`}
            />
            <SocialLink
              icon={<FaLinkedin />}
              label="LinkedIn"
              value={user.social?.linkedin}
              url={`https://linkedin.com/in/${user.social?.linkedin}`}
            />
            <SocialLink
              icon={<FaGlobe />}
              label="Portfolio"
              value={user.social?.website}
              url={`https://${user.social?.website}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function SocialLink({ icon, label, value, url }) {
  if (!value) return null;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between p-4 rounded-xl bg-slate-900/40 border border-slate-800 hover:bg-slate-800 transition"
    >
      <div className="flex items-center gap-3 font-bold">
        {icon}
        {label}
      </div>
      <ExternalLink size={14} />
    </a>
  );
}

export default ConnectionProfileInfo;
