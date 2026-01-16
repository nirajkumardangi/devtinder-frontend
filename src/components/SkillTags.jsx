import { COLORS } from "../utils/constants";

function SkillTags({ skills, size = "small", btn = false }) {
  const colorFor = (skill) => {
    const index = skill.charCodeAt(0) % COLORS.length;
    return COLORS[index];
  };

  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <span
          key={skill}
          className={`
            ${size === "small" ? "text-xs px-2 py-1" : "text-sm px-4 py-1.5"}
            ${btn ? "rounded-sm cursor-pointer hover:opacity-80" : "rounded-full"}
            font-semibold tracking-wide transition
            ${colorFor(skill)}
          `}
        >
          {skill}
        </span>
      ))}
    </div>
  );
}

export default SkillTags;
