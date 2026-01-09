import {
  Code2,
  User,
  MessageSquare,
  LogOut,
  Settings,
  Flame,
} from "lucide-react";

function Navbar() {
  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 shadow-lg">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer">
            <Code2 className="h-8 w-8 text-pink-500 mr-2" />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
              DevTinder
            </span>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-1 px-3 py-2 rounded-md text-pink-500 bg-slate-800">
              <Flame size={20} />
              <span>Feed</span>
            </div>
            <div className="flex items-center space-x-1 px-3 py-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer">
              <MessageSquare size={20} />
              <span>Connections</span>
            </div>
            <div className="flex items-center space-x-1 px-3 py-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer">
              <User size={20} />
              <span>Requests</span>
            </div>

            {/* User Profile Menu */}
            <div className="ml-4 flex items-center space-x-2">
              <div className="flex items-center space-x-2 text-slate-300 hover:text-white cursor-pointer">
                <img
                  className="h-8 w-8 rounded-full border-2 border-pink-500 object-cover"
                  src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Profile"
                />
                <span className="text-sm font-medium">Alex</span>
              </div>
              <button className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                <LogOut size={20} />
              </button>
            </div>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden flex items-center">
            <button className="text-slate-300">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation (Static View) */}
      <div className="md:hidden fixed bottom-0 w-full bg-slate-900 border-t border-slate-800 flex justify-around py-3 z-50">
        <button className="text-pink-500 p-2">
          <Flame size={24} />
        </button>
        <button className="text-slate-500 p-2">
          <MessageSquare size={24} />
        </button>
        <button className="text-slate-500 p-2">
          <User size={24} />
        </button>
        <button className="text-slate-500 p-2">
          <Settings size={24} />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
