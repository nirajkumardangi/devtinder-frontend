import { User } from "lucide-react";

function Requests() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold text-pink-500 mb-6 flex items-center">
        <User className="mr-3 text-pink-500" /> Connection Requests
      </h2>

      <div className="grid gap-6">
        {/* Request 1 */}
        <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-lg border border-slate-700 flex flex-col sm:flex-row">
          <img
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="David"
            className="w-full sm:w-48 h-48 object-cover"
          />
          <div className="p-6 flex flex-col justify-between flex-grow">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">
                David Kim, 29
              </h3>
              <p className="text-slate-400 text-sm italic mb-3">
                "Hey! Saw you're into GraphQL. Would love to connect."
              </p>
            </div>
            <div className="flex space-x-3 mt-4">
              <button className="flex-1 bg-slate-700 text-white py-2 rounded-lg hover:bg-slate-600 font-medium">
                Ignore
              </button>
              <button className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 text-white py-2 rounded-lg font-medium shadow-lg shadow-pink-500/20">
                Accept
              </button>
            </div>
          </div>
        </div>

        {/* Request 2 */}
        <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-lg border border-slate-700 flex flex-col sm:flex-row">
          <img
            src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Jessica"
            className="w-full sm:w-48 h-48 object-cover"
          />
          <div className="p-6 flex flex-col justify-between flex-grow">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">
                Jessica Lee, 27
              </h3>
              <p className="text-slate-400 text-sm italic mb-3">
                "Looking for a co-founder for a SaaS idea."
              </p>
            </div>
            <div className="flex space-x-3 mt-4">
              <button className="flex-1 bg-slate-700 text-white py-2 rounded-lg hover:bg-slate-600 font-medium">
                Ignore
              </button>
              <button className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 text-white py-2 rounded-lg font-medium shadow-lg shadow-pink-500/20">
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Requests;
