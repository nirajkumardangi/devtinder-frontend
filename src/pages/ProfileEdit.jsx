import axios from "axios";
import { X } from "lucide-react";
import { useState } from "react";
import {
  FaGithub,
  FaGlobe,
  FaLinkedin,
  FaPlus,
  FaSave,
  FaTimes,
  FaUpload,
  FaCamera,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { toast } from "react-toastify";
import { addUser } from "../features/userSlice";

function ProfileEdit() {
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.user);
  const dispatch = useDispatch();

  const safeUser = {
    skills: [],
    location: { city: "", country: "" },
    social: {},
    ...user,
  };

  // Mock State for Form Data
  const [formData, setFormData] = useState(safeUser);
  const [newSkill, setNewSkill] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);

  const isAllowedSkill = formData.skills.length < 10;

  // HANDLERS
  // Avatar Section - Upload / Remove
  function handleAvatarUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    // preview image
    const previewURL = URL.createObjectURL(file);

    setAvatarFile(file);
    setFormData((prev) => ({
      ...prev,
      avatar: previewURL,
    }));
  }

  function handleRemoveAvatar() {
    setAvatarFile(null);
    setFormData((prev) => ({
      ...prev,
      avatar: "",
    }));
  }

  // Handle Change
  function handleChange(e) {
    const { name, value } = e.target;

    // handle location & social
    if (name.includes(".")) {
      const [parent, child] = name.split(".");

      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  // Handle Skills
  function handleAddSkill() {
    const skill = newSkill.trim().toLowerCase();
    if (!skill) return;

    if (formData.skills.includes(skill)) {
      toast.error("Skill already added!");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills
        : [...prev.skills, skill],
    }));

    setNewSkill("");
  }

  function removeSkill(skillToRemove) {
    const filteredSkills = formData.skills.filter(
      (skill) => skill.toLowerCase() !== skillToRemove.toLowerCase(),
    );

    setFormData((prev) => ({ ...prev, skills: filteredSkills }));
  }

  // Handle Submit Form
  async function handleSubmit() {
    try {
      const res = await axios.patch(`${BASE_URL}/profile`, formData, {
        withCredentials: true,
      });

      dispatch(addUser(res?.data?.user));
      toast.success("Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      toast.error("Could not update profile.");
      console.error("Failed to update profile:", error);
    }
  }

  return (
    <div className="min-h-screen py-8 px-4 bg-gray-900 text-white font-sans">
      <div className="max-w-3xl mx-auto">
        {/* --- Header --- */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Edit Profile</h1>
            <p className="text-gray-400">Update your developer profile</p>
          </div>
          <button
            onClick={() => navigate("/profile")}
            className="px-4 py-2 text-gray-400 hover:text-white transition-all flex items-center cursor-pointer bg-gray-800 rounded-xl"
          >
            <FaTimes className="mr-2" /> Cancel
          </button>
        </div>

        <div className="space-y-8">
          {/* --- Avatar Section --- */}
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h2 className="text-lg font-bold mb-4">Profile Photo</h2>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Avatar Wrapper */}
              <div className="relative w-24 h-24">
                <img
                  src={formData.avatar || "../../public/default-avatar.png"}
                  alt="avatar"
                  className="w-24 h-24 rounded-full ring-4 ring-purple-500/50 bg-gray-700 object-cover"
                />

                {/* Camera Icon */}
                <button
                  onClick={() =>
                    document.getElementById("avatarUpload").click()
                  }
                  className="absolute bottom-0 right-0 w-9 h-9 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-700 transition-all cursor-pointer shadow-md"
                >
                  <FaCamera className="text-white" size={16} />
                </button>
              </div>

              <div className="text-center sm:text-left">
                <div className="flex gap-2 justify-center sm:justify-start">
                  {/* Hidden file input */}
                  <input
                    type="file"
                    id="avatarUpload"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarUpload}
                  />

                  {/* Upload button */}
                  <button
                    onClick={() =>
                      document.getElementById("avatarUpload").click()
                    }
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-all flex items-center cursor-pointer"
                  >
                    <FaUpload className="mr-2" /> Upload Photo
                  </button>

                  {/* Remove Button */}
                  <button
                    onClick={handleRemoveAvatar}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-all text-gray-300 cursor-pointer"
                  >
                    Remove
                  </button>
                </div>

                <p className="text-gray-500 text-sm mt-3">
                  JPG, PNG or GIF. Max 5MB.
                </p>
              </div>
            </div>
          </div>

          {/* --- Basic Info --- */}
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h2 className="text-lg font-bold mb-4">Basic Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  minLength={3}
                  maxLength={25}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 transition-all text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title / Role
                </label>
                <input
                  type="text"
                  minLength={10}
                  maxLength={50}
                  name="headline"
                  value={formData.headline}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 transition-all text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  City
                </label>
                <input
                  type="text"
                  minLength={3}
                  maxLength={25}
                  name="location.city"
                  value={formData.location.city}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 transition-all text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Country
                </label>
                <input
                  type="text"
                  minLength={3}
                  maxLength={25}
                  name="location.country"
                  value={formData.location.country}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 transition-all text-white"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  About
                </label>
                <textarea
                  rows="4"
                  minLength={10}
                  maxLength={350}
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 transition-all resize-none text-white"
                />
              </div>
            </div>
          </div>

          {/* --- Skills --- */}
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h2 className="text-lg font-bold mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {formData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-gray-700/50 text-gray-300 border border-gray-600 rounded-full text-sm flex items-center gap-2 group"
                >
                  {skill.charAt(0).toUpperCase() + skill.slice(1)}
                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="hover:text-red-400 transition-colors cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="my-2">
              {!isAllowedSkill && (
                <p className="text-sm text-red-400">Maximum 10 skill</p>
              )}
            </div>
            <div className="flex gap-2">
              <input
                disabled={!isAllowedSkill}
                type="text"
                placeholder="Add a skill..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
                className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 transition-all text-white disabled:cursor-not-allowed"
              />
              <button
                onClick={handleAddSkill}
                disabled={!isAllowedSkill}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-xl font-medium transition-all text-white cursor-pointer disabled:bg-purple-500 disabled:cursor-not-allowed"
              >
                <FaPlus />
              </button>
            </div>
          </div>

          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h2 className="text-lg font-bold mb-4">Social Links</h2>
            <div className="space-y-5">
              {/* GitHub */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center shrink-0 border border-gray-700">
                  <FaGithub className="text-xl text-gray-400" />
                </div>

                <div className="flex flex-1 items-center bg-gray-900 border border-gray-700 rounded-xl overflow-hidden transition-all focus-within:border-purple-500">
                  <span className="px-2 py-2 text-gray-400 whitespace-nowrap text-sm">
                    https://github.com/
                  </span>

                  <div className="h-6 w-px bg-gray-700" />

                  <input
                    type="text"
                    name="social.github"
                    placeholder="username"
                    value={formData.social.github || ""}
                    onChange={handleChange}
                    className="flex-1 px-2 py-2 bg-transparent text-white focus:outline-none text-sm"
                  />
                </div>
              </div>

              {/* LinkedIn */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center shrink-0 border border-gray-700">
                  <FaLinkedin className="text-xl text-blue-500" />
                </div>

                <div className="flex flex-1 items-center bg-gray-900 border border-gray-700 rounded-xl overflow-hidden transition-all focus-within:border-purple-500">
                  <span className="px-2 py-2 text-gray-400 whitespace-nowrap text-sm">
                    https://www.linkedin.com/in/
                  </span>

                  <div className="h-6 w-px bg-gray-700" />

                  <input
                    type="text"
                    name="social.linkedin"
                    placeholder="username"
                    value={formData.social.linkedin || ""}
                    onChange={handleChange}
                    className="flex-1 px-2 py-2 bg-transparent text-white focus:outline-none text-sm"
                  />
                </div>
              </div>

              {/* Website */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center shrink-0 border border-gray-700">
                  <FaGlobe className="text-xl text-purple-400" />
                </div>

                <div className="flex flex-1 items-center bg-gray-900 border border-gray-700 rounded-xl overflow-hidden transition-all focus-within:border-purple-500">
                  <span className="px-2 py-2 text-gray-400 whitespace-nowrap text-sm">
                    https://
                  </span>

                  <div className="h-6 w-px bg-gray-700" />

                  <input
                    type="text"
                    name="social.website"
                    placeholder="your-domain.com"
                    value={formData.social.website || ""}
                    onChange={handleChange}
                    className="flex-1 px-2 py-2 bg-transparent text-white focus:outline-none text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* --- Action Buttons --- */}
          <div className="flex justify-end gap-4">
            <button
              onClick={() => navigate("/profile")}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl font-medium transition-all text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-medium text-white hover:opacity-90 transition-all flex items-center shadow-lg shadow-purple-500/20 cursor-pointer"
            >
              <FaSave className="mr-2" /> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileEdit;
