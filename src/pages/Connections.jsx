import axios from "axios";
import { Search, Users, RefreshCw } from "lucide-react";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addConnections, removeConnections } from "../features/connectionSlice";
import Loading from "../pages/Loading";
import { BASE_URL } from "../utils/constants";
import ConnectionCard from "./ConnectionCard";

function Connections() {
  const dispatch = useDispatch();
  const connections = useSelector((state) => state.connection);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchConnections = useCallback(
    async (showLoader = true) => {
      if (showLoader) setIsLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/users/connections`, {
          withCredentials: true,
        });
        dispatch(addConnections(response.data.data || []));
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to fetch connections",
        );
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch],
  );

  useEffect(() => {
    fetchConnections();
  }, [fetchConnections]);

  const removeConnection = async (id) => {
    // Optimistic UI update
    dispatch(removeConnections(id));
    try {
      await axios.delete(`${BASE_URL}/users/connections/${id}`, {
        withCredentials: true,
      });
      toast.success("Connection removed");
    } catch (error) {
      toast.error("Failed to sync removal with server");
      fetchConnections(false); // Re-fetch to sync state if API fails
    }
  };

  const filteredConnections = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return connections;
    return connections.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.skills?.some((s) => s.toLowerCase().includes(query)),
    );
  }, [connections, searchQuery]);

  if (isLoading && connections.length === 0) return <Loading />;

  return (
    <div className="min-h-screen bg-[#0B101B] py-12 px-4 text-slate-200">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-purple-500">
              <Users size={24} />
              <span className="text-xs font-bold uppercase tracking-widest">
                Network
              </span>
            </div>
            <h1 className="text-4xl font-extrabold text-white tracking-tight">
              Your Connections
            </h1>
            <p className="text-slate-400">
              Collaborate and message your developer matches.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-80 group">
              <input
                type="text"
                placeholder="Search by name or skill..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-purple-500/50 outline-none transition-all text-sm group-hover:border-slate-700"
              />
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-hover:text-purple-500 transition-colors"
                size={18}
              />
            </div>
            <button
              onClick={() => fetchConnections(true)}
              className="p-3 bg-slate-800 hover:bg-slate-700 rounded-2xl transition-colors text-slate-400 cursor-pointer"
            >
              <RefreshCw
                size={20}
                className={isLoading ? "animate-spin" : ""}
              />
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredConnections.map((connection) => (
            <ConnectionCard
              key={connection._id}
              data={connection}
              onRemoveConnection={removeConnection}
            />
          ))}
        </div>

        {/* Empty States */}
        {filteredConnections.length === 0 && (
          <div className="text-center py-32 bg-slate-900/20 rounded-[3rem] border border-dashed border-slate-800">
            <p className="text-slate-500 text-lg">
              {searchQuery
                ? `No results for "${searchQuery}"`
                : "No connections yet. Keep swiping!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Connections;
