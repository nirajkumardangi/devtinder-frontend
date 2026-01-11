import MarqueeColumn from "../components/MarqueeColumn";
import { DEV_PROFILES } from "../utils/devProfileData";

function BackgroundGrid() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden flex justify-center items-center">
      <div className="flex gap-6 rotate-[-6deg] scale-110 opacity-70 blur-[1px] select-none pointer-events-none">
        {/* Column 1 - Slow */}
        <MarqueeColumn profiles={DEV_PROFILES.slice(0, 3)} duration="45s" />
        {/* Column 2 - Fast Reverse */}
        <MarqueeColumn
          profiles={DEV_PROFILES.slice(3, 6)}
          reverse={true}
          duration="35s"
        />
        {/* Column 3 - Fast */}
        <MarqueeColumn profiles={DEV_PROFILES.slice(0, 3)} duration="50s" />
        {/* Column 4 - Hidden on mobile, visible on desktop */}
        <div className="hidden md:flex flex-col gap-6">
          <MarqueeColumn
            profiles={DEV_PROFILES.slice(3, 6)}
            reverse={true}
            duration="40s"
          />
        </div>
        <div className="hidden md:flex flex-col gap-6">
          <MarqueeColumn
            profiles={DEV_PROFILES.slice(1, 4)}
            reverse={false}
            duration="50s"
          />
        </div>
        <div className="hidden md:flex flex-col gap-6">
          <MarqueeColumn
            profiles={DEV_PROFILES.slice(2, 5)}
            reverse={true}
            duration="45s"
          />
        </div>
      </div>

      {/* Radial Overlay to make text pop */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-slate-950/90"></div>
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-slate-950 opacity-80"></div>
    </div>
  );
}

export default BackgroundGrid;
