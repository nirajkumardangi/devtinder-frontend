import { useEffect, useCallback, useState } from "react";
import { CheckCircle2, MapPin, Heart, X, Code2 } from "lucide-react";
import SkillTags from "../components/SkillTags";

function FeedCard({ user, onSwipeLeft, onSwipeRight }) {
  const { _id, name, avatar, about, headline, location, skills } = user;

  const [drag, setDrag] = useState({ x: 0, active: false, startX: 0 });
  const [isAnimating, setIsAnimating] = useState(false);

  const SWIPE_THRESHOLD = 120;

  const triggerSwipe = useCallback(
    (direction) => {
      if (isAnimating) return;
      setIsAnimating(true);

      // Determine exit point
      const endX = direction === "right" ? 1000 : -1000;

      // 1. Move the card physically
      setDrag({ x: endX, active: false, startX: 0 });

      // 2. Wait for animation to finish before calling parent (Redux update)
      // We use 300ms so it feels snappy even if the transition is 0.5s
      setTimeout(() => {
        if (direction === "right") onSwipeRight(_id);
        else onSwipeLeft(_id);
      }, 250);
    },
    [isAnimating, _id, onSwipeLeft, onSwipeRight],
  );

  const handleStart = (clientX) => {
    if (isAnimating) return;
    setDrag({ x: 0, active: true, startX: clientX });
  };

  const handleMove = (clientX) => {
    if (!drag.active || isAnimating) return;
    const x = clientX - drag.startX;
    setDrag((prev) => ({ ...prev, x }));
  };

  const handleEnd = () => {
    if (!drag.active || isAnimating) return;

    if (drag.x > SWIPE_THRESHOLD) {
      triggerSwipe("right");
    } else if (drag.x < -SWIPE_THRESHOLD) {
      triggerSwipe("left");
    } else {
      setDrag({ x: 0, active: false, startX: 0 });
    }
  };

  const rotation = drag.x / 15;
  const opacityLike = Math.min(Math.max(drag.x / 100, 0), 1);
  const opacityNope = Math.min(Math.max(-drag.x / 100, 0), 1);

  return (
    <div
      className="relative w-full aspect-[3/4.8] max-h-[600px] select-none touch-none"
      style={{
        transform: `translateX(${drag.x}px) rotate(${rotation}deg)`,
        transition: drag.active
          ? "none"
          : "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        cursor: drag.active ? "grabbing" : "grab",
      }}
      onMouseDown={(e) => handleStart(e.clientX)}
      onMouseMove={(e) => handleMove(e.clientX)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={(e) => handleStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onTouchEnd={handleEnd}
    >
      {/* Visual Feedback Badges */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        <div
          style={{ opacity: opacityLike }}
          className="absolute top-12 left-8 border-4 border-emerald-500 text-emerald-500 font-black text-3xl px-3 py-1 rounded-lg -rotate-12"
        >
          LIKE
        </div>
        <div
          style={{ opacity: opacityNope }}
          className="absolute top-12 right-8 border-4 border-red-500 text-red-500 font-black text-3xl px-3 py-1 rounded-lg rotate-12"
        >
          NOPE
        </div>
      </div>

      <div className="w-full h-full bg-[#161E2D] rounded-[2rem] overflow-hidden border border-slate-800 shadow-2xl flex flex-col">
        <div className="relative h-[55%] w-full">
          <img
            src={avatar}
            alt={name}
            className="w-full h-full object-cover"
            draggable="false"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#161E2D] via-transparent to-transparent" />
          <div className="absolute bottom-4 left-6 right-6">
            <h2 className="text-3xl font-bold text-white">{name}</h2>
            <p className="text-purple-400 font-medium text-sm">{headline}</p>
          </div>
        </div>

        <div className="flex-1 py-2 px-6 flex flex-col justify-between mb-4">
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-slate-500 text-xs font-semibold uppercase">
              <MapPin size={12} />
              <span>
                {location?.city
                  ? `${location.city}, ${location.country}`
                  : "Remote"}
              </span>
            </div>
            <p className="text-slate-300 text-sm line-clamp-2 leading-relaxed">
              {about}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-slate-500 text-[10px] font-bold uppercase">
              <Code2 size={12} />
              <span>Skills</span>
            </div>
            <SkillTags skills={skills?.slice(0, 4)} size="small" />
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                triggerSwipe("left");
              }}
              className="flex-1 py-3 rounded-2xl bg-slate-800 text-red-500 border border-slate-700 hover:bg-red-500/10 transition-all"
            >
              <X size={22} className="mx-auto" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                triggerSwipe("right");
              }}
              className="flex-1 py-3 rounded-2xl bg-purple-600 text-white hover:bg-purple-500 transition-all shadow-lg"
            >
              <Heart size={22} className="mx-auto" fill="currentColor" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedCard;
