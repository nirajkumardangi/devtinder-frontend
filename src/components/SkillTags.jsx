import React, { useMemo } from "react";

// Professional developer-centric palette
const TECH_COLORS = [
  "border-purple-500/50 bg-purple-500/10 text-purple-400",
  "border-blue-500/50 bg-blue-500/10 text-blue-400",
  "border-emerald-500/50 bg-emerald-500/10 text-emerald-400",
  "border-pink-500/50 bg-pink-500/10 text-pink-400",
  "border-amber-500/50 bg-amber-500/10 text-amber-400",
  "border-sky-500/50 bg-sky-500/10 text-sky-400",
  "border-indigo-500/50 bg-indigo-500/10 text-indigo-400",
];

function SkillTags({ skills, size = "small", btn = false }) {
  // Memoize the mapping to prevent color shifts on re-renders
  const getColor = useMemo(() => {
    return (skill) => {
      const charCodeSum = skill
        .split("")
        .reduce((acc, char) => acc + char.charCodeAt(0), 0);
      return TECH_COLORS[charCodeSum % TECH_COLORS.length];
    };
  }, []);

  if (!skills || skills.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => {
        const colorClass = getColor(skill);

        return (
          <span
            key={skill}
            className={`
              inline-flex items-center justify-center
              border font-bold uppercase tracking-widest transition-all duration-300
              ${size === "small" ? "text-[10px] px-2.5 py-1" : "text-xs px-4 py-1.5"}
              ${
                btn
                  ? "rounded-xl cursor-pointer hover:scale-105 hover:bg-opacity-20 active:scale-95 shadow-lg shadow-black/20"
                  : "rounded-lg"
              }
              ${colorClass}
            `}
          >
            {skill}
          </span>
        );
      })}
    </div>
  );
}

export default SkillTags;
