import axios from "axios";
import { useEffect, useState } from "react";
import { Search, Filter } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ConnectionCard from "./ConnectionCard";
import { BASE_URL } from "../utils/constants";
import { addConnections } from "../features/connectionSlice";

function Connections() {
  const dispatch = useDispatch();
  const data = useSelector((s) => s.connection);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredConnections = data.filter((data) =>
    data.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const res = await axios.get(BASE_URL + "/users/connections", {
          withCredentials: true,
        });

        dispatch(addConnections(res?.data?.data));
      } catch (error) {
        toast.error(error.response.data);
        console.error("Connection Error", error);
      }
    };

    fetchConnections();
  }, []);

  return (
    <div className="min-h-screen py-8 px-4 bg-gray-900 text-white font-sans">
      <div className="max-w-6xl mx-auto">
        {/* --- Header & Controls --- */}
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

            <div className="relative">
              <select className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 appearance-none cursor-pointer text-sm pr-10">
                <option>All Skills</option>
                <option>Frontend</option>
                <option>Backend</option>
                <option>Full Stack</option>
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* --- Connections Grid --- */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredConnections.map((item) => (
            <ConnectionCard key={item._id} data={item} />
          ))}
        </div>

        {/* Empty State */}
        {filteredConnections.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              No connections found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Connections;
