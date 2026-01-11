import ProfileCard from "./ProfileCard";

const MarqueeColumn = ({ profiles, reverse = false, duration = "40s" }) => {
  return (
    <div className="flex flex-col gap-6 relative overflow-hidden h-[150vh]">
      <div
        className={`flex flex-col gap-6 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
        style={{ animationDuration: duration }}
      >
        {/* We double the array to create a seamless infinite loop */}
        {[...profiles, ...profiles, ...profiles].map((profile, idx) => (
          <ProfileCard key={`${profile.id}-${idx}`} profile={profile} />
        ))}
      </div>
    </div>
  );
};

export default MarqueeColumn;
