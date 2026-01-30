import { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import {
  X,
  Loader2,
  Camera,
  Upload,
  Trash2,
  Save,
  Globe,
  Github,
  Linkedin,
  Plus,
  ChevronLeft,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { toast } from "react-toastify";
import { addUser } from "../features/userSlice";

const ProfileEdit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.user);

  // Memoize initial state to prevent unnecessary resets
  const initialState = useMemo(
    () => ({
      name: "",
      headline: "",
      about: "",
      avatar: "",
      skills: [],
      social: { github: "", linkedin: "", website: "" },
      location: { city: "", country: "" },
      ...user,
    }),
    [user],
  );

  const [formData, setFormData] = useState(initialState);
  const [newSkill, setNewSkill] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Sync state if user changes (e.g., after a background refresh)
  useEffect(() => {
    if (user) setFormData((prev) => ({ ...prev, ...user }));
  }, [user]);

  // Load Cloudinary Script once
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      const existingScript = document.querySelector(
        `script[src="${script.src}"]`,
      );
      if (existingScript) document.body.removeChild(existingScript);
    };
  }, []);

  const openCloudinaryWidget = useCallback(() => {
    if (!window.cloudinary) {
      toast.error("Cloudinary not loaded yet.");
      return;
    }

    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dg3cperkk",
        uploadPreset: "devtinder-avatar",
        cropping: true,
        croppingAspectRatio: 1,
        showSkipCropButton: false,
        theme: "dark",
        styles: {
          palette: {
            window: "#111827",
            sourceBg: "#111827",
            windowBorder: "#374151",
            tabIcon: "#A855F7",
            textLight: "#FFFFFF",
          },
        },
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setFormData((prev) => ({ ...prev, avatar: result.info.secure_url }));
          toast.success("Avatar updated locally. Save to apply.");
        }
      },
    );
    widget.open();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");

      setFormData((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddSkill = () => {
    const skill = newSkill.trim().toLowerCase();
    if (!skill) return;
    
    if (formData.skills.length >= 10)
      return toast.warning("Max 10 skills allowed");
    if (formData.skills.includes(skill))
      return toast.error("Skill already exists");

    setFormData((prev) => ({ ...prev, skills: [...prev.skills, skill] }));
    setNewSkill("");
  };

  const removeSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }));
  };

  const handleSubmit = async () => {
    setIsSaving(true);
    try {
      const res = await axios.patch(`${BASE_URL}/profile`, formData, {
        withCredentials: true,
      });
      dispatch(addUser(res?.data?.user || res?.data));
      toast.success("Profile synchronized!");
      navigate("/profile");
    } catch (error) {
      toast.error(error.response?.data || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 pb-20 font-sans selection:bg-purple-500/30">
      {/* Sticky Header */}
      <nav className="sticky top-0 z-30 bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <ChevronLeft size={20} />
            <span>Back</span>
          </button>
          <h1 className="font-semibold text-lg">Edit Profile</h1>
          <div className="w-10" /> {/* Spacer */}
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 mt-8 space-y-6">
        {/* Avatar Section */}
        <section className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl transition-all hover:border-slate-600">
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full ring-4 ring-purple-500/20 overflow-hidden bg-slate-900">
                <img
                  src={
                    formData.avatar ||
                    `https://ui-avatars.com/api/?name=${formData.name}`
                  }
                  className="w-full h-full object-cover"
                  alt="Profile"
                />
              </div>
              <button
                onClick={openCloudinaryWidget}
                className="absolute bottom-1 right-1 p-2 bg-purple-600 rounded-full hover:scale-110 transition-transform shadow-lg cursor-pointer"
              >
                <Camera size={18} className="text-white" />
              </button>
            </div>

            <div className="flex-1 text-center sm:text-left space-y-3">
              <h3 className="text-xl font-medium text-white">Profile Photo</h3>
              <p className="text-slate-400 text-sm">
                Update your avatar. Recommended: Square image, max 5MB.
              </p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                <button
                  onClick={openCloudinaryWidget}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm transition-colors cursor-pointer"
                >
                  <Upload size={14} /> Change Photo
                </button>
                <button
                  onClick={() => setFormData((p) => ({ ...p, avatar: "" }))}
                  className="flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-red-400/10 rounded-lg text-sm transition-colors cursor-pointer"
                >
                  <Trash2 size={14} /> Remove
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Info Grid */}
        <section className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl space-y-6">
          <h3 className="text-lg font-medium text-white border-b border-slate-700 pb-3">
            General Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">
                Full Name
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-purple-500/50 outline-none transition-all"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">
                Headline
              </label>
              <input
                name="headline"
                value={formData.headline}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-purple-500/50 outline-none transition-all"
                placeholder="Full Stack Developer"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">
                City
              </label>
              <input
                name="location.city"
                value={formData.location.city}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-purple-500/50 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">
                Country
              </label>
              <input
                name="location.country"
                value={formData.location.country}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-purple-500/50 outline-none transition-all"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">
                Bio
              </label>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                rows={4}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-purple-500/50 outline-none transition-all resize-none"
                placeholder="Tell us about yourself..."
              />
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-white">Skills</h3>
            <span className="text-xs text-slate-500 bg-slate-900 px-2 py-1 rounded-md">
              {formData.skills.length}/10
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {formData.skills.length === 0 && (
              <p className="text-slate-500 text-sm italic">
                No skills added yet.
              </p>
            )}
            {formData.skills.map((skill) => (
              <span
                key={skill}
                className="flex items-center gap-1.5 pl-3 pr-1.5 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-full text-sm"
              >
                {skill}
                <button
                  onClick={() => removeSkill(skill)}
                  className="p-0.5 hover:bg-purple-500/20 rounded-full transition-colors cursor-pointer"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
              placeholder="Add a skill (e.g. React)"
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
            />
            <button
              onClick={handleAddSkill}
              className="p-2.5 bg-purple-600 hover:bg-purple-500 rounded-xl transition-all disabled:opacity-50 cursor-pointer"
              disabled={!newSkill.trim() || formData.skills.length >= 10}
            >
              <Plus size={20} />
            </button>
          </div>
        </section>

        {/* Social Links */}
        <section className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl space-y-4">
          <h3 className="text-lg font-medium text-white">Social Presence</h3>
          <div className="space-y-3">
            {[
              {
                icon: Github,
                name: "social.github",
                prefix: "github.com/",
                color: "text-white",
              },
              {
                icon: Linkedin,
                name: "social.linkedin",
                prefix: "linkedin.com/in/",
                color: "text-blue-400",
              },
              {
                icon: Globe,
                name: "social.website",
                prefix: "https://",
                color: "text-emerald-400",
              },
            ].map((item) => (
              <div key={item.name} className="flex items-center gap-3">
                <item.icon size={20} className={item.color} />
                <div className="flex-1 flex items-center bg-slate-900 border border-slate-700 rounded-xl overflow-hidden focus-within:ring-1 focus-within:ring-purple-500 transition-all">
                  <span className="pl-3 text-slate-500 text-sm whitespace-nowrap">
                    {item.prefix}
                  </span>
                  <input
                    name={item.name}
                    value={formData.social[item.name.split(".")[1]]}
                    onChange={handleChange}
                    className="w-full bg-transparent px-2 py-2.5 outline-none text-sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Floating Action Bar */}
        <div className="fixed bottom-20 md:bottom-4 left-1/2 -translate-x-1/2 w-full max-w-lg px-4 z-40">
          <div className="bg-slate-800/90 backdrop-blur-xl border border-slate-600 p-2 rounded-2xl shadow-2xl flex gap-2">
            <button
              onClick={() => navigate("/profile")}
              className="flex-1 py-3 text-sm font-medium hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
            >
              Discard
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSaving}
              className="flex-[2] bg-purple-600 hover:bg-purple-500 disabled:bg-purple-800 py-3 rounded-xl flex items-center justify-center gap-2 font-semibold shadow-lg shadow-purple-900/20 transition-all cursor-pointer"
            >
              {isSaving ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Save size={18} />
              )}
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileEdit;
