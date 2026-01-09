import { MessageSquare } from "lucide-react";

function Connections() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold text-pink-500 mb-6 flex items-center">
        <MessageSquare className="mr-3 text-pink-500" /> Your Connections
      </h2>
      <div className="grid gap-4">
        {/* Connection Item 1 */}
        <div className="bg-slate-800 p-4 rounded-xl flex items-center justify-between border border-slate-700 hover:border-slate-600 transition-colors">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Priya"
                className="w-16 h-16 rounded-full object-cover border-2 border-green-500"
              />
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-800"></div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Priya Patel</h3>
              <p className="text-slate-400 text-sm truncate">
                That bug was a nightmare! 😂
              </p>
            </div>
          </div>
          <button className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors">
            Chat
          </button>
        </div>

        {/* Connection Item 2 */}
        <div className="bg-slate-800 p-4 rounded-xl flex items-center justify-between border border-slate-700 hover:border-slate-600 transition-colors">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="James"
                className="w-16 h-16 rounded-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">James Wilson</h3>
              <p className="text-slate-400 text-sm truncate">
                Are you going to the tech meetup tomorrow?
              </p>
            </div>
          </div>
          <button className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors">
            Chat
          </button>
        </div>
      </div>
    </div>
  );
}

export default Connections;
