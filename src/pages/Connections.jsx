import axios from "axios";
import { Search } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addConnections } from "../features/connectionSlice";
import Loading from "../pages/Loading";
import { BASE_URL } from "../utils/constants";
import ConnectionCard from "./ConnectionCard";

function Connections() {
  const dispatch = useDispatch();
  const connections = useSelector((s) => s.connection);

  const [searchTerm, setSearchTerm] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    async function fetchConnections() {
      setLoader(true);
      try {
        const res = await axios.get(`${BASE_URL}/users/connections`, {
          withCredentials: true,
        });
        dispatch(addConnections(res?.data?.data || []));
      } catch (error) {
        toast.error(error.response?.data || "Failed to fetch connections");
      } finally {
        setLoader(false);
      }
    }

    fetchConnections();
  }, [connections.length, dispatch]);

  const filteredConnections = useMemo(() => {
    let filtered = connections;

    if (searchTerm.trim()) {
      filtered = filtered.filter((item) =>
        item?.name?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    return filtered;
  }, [connections, searchTerm]);

  if (loader) return <Loading />;

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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 transition-all text-sm"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredConnections.map((item) => (
            <ConnectionCard key={item._id} data={item} />
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
