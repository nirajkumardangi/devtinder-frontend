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

  // Mock State for Form Data
  const [formData, setFormData] = useState(user);
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

  function handleRemoveSkill(skillToRemove) {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }));
  }

  // Handle Submit Form
  async function handleSubmit() {
    try {
      const res = await axios.patch(`${BASE_URL}/profile`, formData, {
        withCredentials: true,
      });

      // console.log("Profile updated:", res?.data?.user);
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
              <img
                src={formData.avatar || "../../public/default-avatar.png"}
                alt="avatar"
                className="w-24 h-24 rounded-full ring-4 ring-purple-500/50 bg-gray-700 object-cover"
              />

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

                  {/* Upload button triggers file input */}
                  <button
                    onClick={() =>
                      document.getElementById("avatarUpload").click()
                    }
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-all flex items-center cursor-pointer"
                  >
                    <FaUpload className="mr-2" /> Upload Photo
                  </button>

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
                  maxLength={300}
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
                  {skill}
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

          {/* --- Social Links --- */}
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h2 className="text-lg font-bold mb-4">Social Links</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center shrink-0 border border-gray-700">
                  <FaGithub className="text-xl text-gray-400" />
                </div>
                <input
                  type="text"
                  name="social.github"
                  placeholder="username"
                  onChange={handleChange}
                  className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 transition-all text-white"
                />
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center shrink-0 border border-gray-700">
                  <FaLinkedin className="text-xl text-blue-500" />
                </div>
                <input
                  type="text"
                  name="social.linkedin"
                  placeholder="username"
                  onChange={handleChange}
                  className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 transition-all text-white"
                />
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center shrink-0 border border-gray-700">
                  <FaGlobe className="text-xl text-purple-400" />
                </div>
                <input
                  type="text"
                  name="social.website"
                  placeholder="website url"
                  onChange={handleChange}
                  className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 transition-all text-white"
                />
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
