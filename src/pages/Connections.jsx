import axios from "axios";
import { Search } from "lucide-react";
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

  // Fetch all connections
  const fetchConnections = useCallback(async () => {
    setIsLoading(true);
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
  }, [dispatch]);

  useEffect(() => {
    fetchConnections();
  }, [fetchConnections]);

  // Remove connection by id
  async function removeConnection(id) {
    setIsLoading(true);
    dispatch(removeConnections(id));
    try {
      await axios.delete(`${BASE_URL}/users/connections/${id}`, {
        withCredentials: true,
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to remove connection",
      );
    } finally {
      setIsLoading(false);
    }
  }

  const filteredConnections = useMemo(() => {
    if (!searchQuery.trim()) return connections;

    return connections.filter((connection) =>
      connection.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [connections, searchQuery]);

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen py-8 px-4 bg-gray-900 text-white font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Your Connections</h1>
            <p className="text-gray-400">Developers you've matched with</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search connections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 transition-all text-sm"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredConnections.map((connection) => (
            <ConnectionCard
              key={connection._id}
              data={connection}
              onRemoveConnection={removeConnection}
            />
          ))}
        </div>

        {filteredConnections.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              No connections found matching your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Connections;
