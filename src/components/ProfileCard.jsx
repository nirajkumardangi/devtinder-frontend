// 2. Card Component (The phone screen look)
const ProfileCard = ({ profile }) => (
  <div className="relative w-56 h-80 rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-800 bg-slate-800 flex-shrink-0">
    <img
      src={profile.img}
      alt={profile.name}
      className="w-full h-full object-cover opacity-80"
    />
    {/* Card Overlay Text */}
    <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 text-left">
      <div className="flex items-center gap-2">
        <h3 className="text-white font-bold text-xl">{profile.name}</h3>
        <span className="bg-green-500 w-2 h-2 rounded-full"></span>
      </div>
      <p className="text-slate-300 text-xs uppercase font-semibold tracking-wide">
        {profile.role}
      </p>
      <div className="mt-2 flex flex-wrap gap-1">
        <span className="text-[10px] px-2 py-1 bg-white/20 rounded-full text-white backdrop-blur-sm">
          {profile.stack}
        </span>
      </div>
    </div>
  </div>
);

export default ProfileCard;
