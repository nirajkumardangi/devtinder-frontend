import { X, Check, Inbox, Flame } from "lucide-react";

function Requests() {
  return (
    <section id="page-requests" className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Connection Requests</h1>
            <p className="text-gray-400">
              Developers who want to connect with you
            </p>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium">
              3 pending
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button className="px-4 py-2 bg-purple-500 rounded-lg font-medium">
            Received
          </button>
          <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium transition-all">
            Sent
          </button>
        </div>

        <div className="space-y-4">
          {/* Request Card 1 */}
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Tom"
                  alt="Tom Anderson"
                  className="w-16 h-16 rounded-full ring-2 ring-purple-500/50"
                />
                <div>
                  <h3 className="font-bold text-lg">Tom Anderson</h3>
                  <p className="text-purple-400 text-sm">
                    Senior React Developer • Google
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded text-xs">
                      React
                    </span>
                    <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-400 rounded text-xs">
                      TypeScript
                    </span>
                    <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded text-xs">
                      GraphQL
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500 text-sm mr-4">2 hours ago</span>
                <button className="px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-xl font-medium transition-all flex items-center gap-2">
                  <X size={16} />
                  Decline
                </button>
                <button className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-xl font-medium transition-all flex items-center gap-2">
                  <Check size={16} />
                  Accept
                </button>
              </div>
            </div>
            <div className="mt-4 p-4 bg-gray-900/50 rounded-xl">
              <p className="text-gray-300 text-sm italic">
                "Hey! I saw your profile and I'm really impressed with your
                full-stack skills. Would love to collaborate on some open-source
                projects together!"
              </p>
            </div>
          </div>

          {/* Request Card 2 */}
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Nina"
                  alt="Nina Patel"
                  className="w-16 h-16 rounded-full ring-2 ring-purple-500/50"
                />
                <div>
                  <h3 className="font-bold text-lg">Nina Patel</h3>
                  <p className="text-purple-400 text-sm">
                    Startup Founder • TechVentures
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded text-xs">
                      Node.js
                    </span>
                    <span className="px-2 py-0.5 bg-orange-500/20 text-orange-400 rounded text-xs">
                      AWS
                    </span>
                    <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 rounded text-xs">
                      Product
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500 text-sm mr-4">1 day ago</span>
                <button className="px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-xl font-medium transition-all flex items-center gap-2">
                  <X size={16} />
                  Decline
                </button>
                <button className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-xl font-medium transition-all flex items-center gap-2">
                  <Check size={16} />
                  Accept
                </button>
              </div>
            </div>
            <div className="mt-4 p-4 bg-gray-900/50 rounded-xl">
              <p className="text-gray-300 text-sm italic">
                "Hi! I'm building a new SaaS product and looking for a technical
                co-founder. Your profile caught my attention. Let's chat!"
              </p>
            </div>
          </div>

          {/* Request Card 3 */}
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos"
                  alt="Carlos Martinez"
                  className="w-16 h-16 rounded-full ring-2 ring-purple-500/50"
                />
                <div>
                  <h3 className="font-bold text-lg">Carlos Martinez</h3>
                  <p className="text-purple-400 text-sm">
                    Open Source Maintainer
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-2 py-0.5 bg-red-500/20 text-red-400 rounded text-xs">
                      Rust
                    </span>
                    <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded text-xs">
                      Go
                    </span>
                    <span className="px-2 py-0.5 bg-gray-500/20 text-gray-400 rounded text-xs">
                      Systems
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500 text-sm mr-4">3 days ago</span>
                <button className="px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-xl font-medium transition-all flex items-center gap-2">
                  <X size={16} />
                  Decline
                </button>
                <button className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-xl font-medium transition-all flex items-center gap-2">
                  <Check size={16} />
                  Accept
                </button>
              </div>
            </div>
            <div className="mt-4 p-4 bg-gray-900/50 rounded-xl">
              <p className="text-gray-300 text-sm italic">
                "Looking for contributors for my open-source CLI tool. Would
                love to have someone with your experience on board!"
              </p>
            </div>
          </div>
        </div>

        {/* Empty State (Hidden by default) */}
        <div className="hidden text-center py-16">
          <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <Inbox size={48} className="text-gray-600" />
          </div>
          <h3 className="text-xl font-bold mb-2">No pending requests</h3>
          <p className="text-gray-400 mb-6">
            Start swiping to get more connection requests!
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-medium hover:opacity-90 transition-all flex items-center gap-2 mx-auto">
            <Flame size={20} />
            Go to Feed
          </button>
        </div>
      </div>
    </section>
  );
}

export default Requests;
