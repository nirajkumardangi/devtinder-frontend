import { Code } from "lucide-react";

function Loading() {
  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#0B101B] pointer-events-none select-none overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-pink-500/10 blur-[100px] rounded-full delay-700 animate-pulse" />

      {/* Spinner Container */}
      <div className="relative flex flex-col items-center gap-6">
        <div className="relative w-20 h-20 flex items-center justify-center">
          {/* Outer Ring */}
          <div className="absolute inset-0 border-4 border-slate-800 rounded-full" />

          {/* Animated Spinning Ring */}
          <div className="absolute inset-0 border-4 border-transparent border-t-purple-500 border-r-purple-500 rounded-full animate-spin duration-700" />

          {/* Pulsing Core Icon */}
          <div className="relative z-10 w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center shadow-2xl border border-slate-800">
            <Code
              className="text-purple-500 w-6 h-6 animate-pulse"
              strokeWidth={2.5}
            />
          </div>
        </div>

        {/* Textual Feedback */}
        <div className="flex flex-col items-center">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-white/80 animate-pulse">
            DevTinder
          </p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-2">
            Fetching your next match...
          </p>
        </div>
      </div>
    </div>
  );
}

export default Loading;
