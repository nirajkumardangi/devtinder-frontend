import axios from "axios";
import { Inbox, Flame } from "lucide-react";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import RequestCard from "./RequestCard";
import { addRequest } from "../features/requestSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

function Requests() {
  const data = useSelector((s) => s.request);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchRequest() {
      try {
        const res = await axios.get(BASE_URL + "/users/requests", {
          withCredentials: true,
        });
        dispatch(addRequest(res?.data?.data));
      } catch (error) {
        toast.error("Error while fetching user requests");
        console.error("Requests Error:", error.response?.data);
      }
    }

    fetchRequest();
  }, []);

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
              {data.length} pending
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button className="px-4 py-2 bg-purple-500 rounded-lg font-medium">
            Received
          </button>
          {/* <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium transition-all">
            Sent
          </button> */}
        </div>

        <div className="space-y-4">
          {/* Request Card 1 */}
          {data.map((item) => (
            <RequestCard key={item._id} user={item} />
          ))}
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
