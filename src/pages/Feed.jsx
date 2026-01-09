import { Heart, X, CheckCircle2 } from "lucide-react";

function Feed() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] py-8 px-4">
      <div className="relative w-full max-w-md bg-slate-800 rounded-3xl shadow-2xl overflow-hidden border border-slate-700">
        <div className="relative h-96 w-full">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="User"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 to-transparent p-6 pt-20">
            <h2 className="text-3xl font-bold text-white flex items-center">
              Sarah Chen, 26
              <CheckCircle2
                size={20}
                className="ml-2 text-blue-500"
                fill="currentColor"
                color="white"
              />
            </h2>
            <p className="text-pink-400 font-medium">Full Stack Developer</p>
          </div>
        </div>

        <div className="p-6">
          <p className="text-slate-300 text-lg mb-4">
            Frontend enthusiast pixel-pushing my way through life. Love Tailwind
            and framer-motion.
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {["React", "Tailwind", "Figma", "UI/UX"].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-slate-700 text-pink-300 rounded-full text-xs font-semibold tracking-wide"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="flex justify-center gap-6 mt-4">
            <button className="p-4 bg-slate-700 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-lg">
              <X size={32} />
            </button>
            <button className="p-4 bg-slate-700 rounded-full text-green-500 hover:bg-green-500 hover:text-white transition-all shadow-lg">
              <Heart size={32} fill="currentColor" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feed;
