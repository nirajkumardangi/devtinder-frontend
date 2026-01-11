import { User, Settings, MapPin, Briefcase } from "lucide-react";

function Profile() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-slate-800 rounded-3xl overflow-hidden shadow-xl border border-slate-700">
        {/* Banner */}
        <div className="h-48 bg-gradient-to-r from-slate-900 to-slate-800 relative">
          <button className="absolute top-4 right-4 bg-slate-900/50 p-2 rounded-full text-white hover:bg-pink-600 transition-colors backdrop-blur-md">
            <Settings size={20} />
          </button>
        </div>

        <div className="px-8 pb-8">
          <div className="relative -top-16 flex flex-col md:flex-row items-center md:items-end mb-6 md:mb-0">
            {/* Avatar */}
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-slate-800 object-cover bg-slate-700"
              />
            </div>
            {/* Name/Title */}
            <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left flex-grow">
              <h1 className="text-3xl font-bold text-white">Alex Dev</h1>
              <p className="text-pink-500 font-medium">@alexdev</p>
            </div>
            {/* Action Button */}
            <div className="mt-4 md:mt-0">
              <button className="bg-pink-600 text-white px-6 py-2 rounded-full font-medium hover:bg-pink-700 transition-colors">
                Edit Profile
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-2 space-y-6">
              <div>
                <h3 className="text-slate-400 text-sm uppercase tracking-wider font-semibold mb-2">
                  About
                </h3>
                <p className="text-slate-200 leading-relaxed">
                  Full-stack wizard who dreams in JavaScript. Looking for a
                  coding partner or a hackathon buddy. 🚀
                </p>
              </div>
              <div>
                <h3 className="text-slate-400 text-sm uppercase tracking-wider font-semibold mb-2">
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["React", "Node.js", "TypeScript", "AWS", "GraphQL"].map(
                    (skill) => (
                      <div
                        key={skill}
                        className="bg-slate-900 border border-slate-700 px-3 py-1 rounded-md text-pink-400 text-sm"
                      >
                        {skill}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
            {/* Sidebar Details */}
            <div className="col-span-1 bg-slate-900/50 p-6 rounded-xl border border-slate-700 h-fit w-full">
              <h3 className="text-slate-400 text-sm uppercase tracking-wider font-semibold mb-4">
                Details
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center text-slate-300">
                  <span className="text-pink-500 mr-3">
                    <User size={18} />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500">Gender</span>
                    <span className="font-medium">Male</span>
                  </div>
                </li>
                <li className="flex items-center text-slate-300">
                  <span className="text-pink-500 mr-3">
                    <Briefcase size={18} />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500">Age</span>
                    <span className="font-medium">28</span>
                  </div>
                </li>
                <li className="flex items-center text-slate-300">
                  <span className="text-pink-500 mr-3">
                    <MapPin size={18} />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500">Location</span>
                    <span className="font-medium">San Francisco, CA</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
