import axios from "axios";
import { Flame, Inbox, RefreshCw } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addRequest, removeRequest } from "../features/requestSlice";
import { BASE_URL } from "../utils/constants";
import Loading from "./Loading";
import RequestCard from "./RequestCard";

function Requests() {
  const dispatch = useDispatch();
  const requests = useSelector((s) => s.request);
  const [loading, setLoading] = useState(false);

  const fetchReceived = useCallback(
    async (isRefresh = false) => {
      // Only fetch if empty or if user explicitly requested refresh
      if (requests.length > 0 && !isRefresh) return;

      setLoading(true);
      try {
        const res = await axios.get(`${BASE_URL}/users/requests`, {
          withCredentials: true,
        });
        dispatch(addRequest(res?.data?.data || []));
      } catch (error) {
        toast.error(error?.response?.data || "Failed to fetch requests");
      } finally {
        setLoading(false);
      }
    },
    [requests.length, dispatch],
  );

  useEffect(() => {
    fetchReceived();
  }, []);

  // Inside Requests.js
  const reviewRequest = async (status, id) => {
    try {
      // 1. Remove from local Redux state IMMEDIATELY
      // Ensure 'id' here is the 'req._id'
      dispatch(removeRequest(id));

      // 2. Make the API call
      await axios.post(
        `${BASE_URL}/request/review/${status}/${id}`,
        {},
        { withCredentials: true },
      );

      toast.success(
        `Request ${status === "accepted" ? "Accepted" : "Declined"}`,
      );
    } catch (err) {
      toast.error("Action failed. Syncing list...");
    }
  };

  if (loading && requests.length === 0) return <Loading />;

  return (
    <section className="min-h-screen bg-[#0B101B] py-12 px-4 text-slate-200">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white mb-1">
              Incoming Requests
            </h1>
            <p className="text-slate-400">
              Manage developers looking to collaborate with you.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchReceived(true)}
              className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors text-slate-400 cursor-pointer"
              title="Refresh List"
            >
              <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
            </button>
            <span className="px-4 py-1.5 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-full text-xs font-bold uppercase tracking-widest">
              {requests.length} Pending
            </span>
          </div>
        </div>

        {/* Empty State */}
        {requests.length === 0 && !loading && (
          <div className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] py-20 text-center animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-6 rotate-12">
              <Inbox size={40} className="text-slate-600" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Inbox is Clean
            </h3>
            <p className="text-slate-400 mb-8 max-w-xs mx-auto">
              You've cleared all requests. Start swiping on the feed to find
              more matches!
            </p>
            <Link to="/">
              <button className="px-8 py-3.5 bg-purple-600 hover:bg-purple-500 rounded-2xl font-bold transition-all flex items-center gap-2 mx-auto shadow-lg shadow-purple-900/20 active:scale-95">
                <Flame size={20} />
                Explore Developers
              </button>
            </Link>
          </div>
        )}

        {/* Request List */}
        <div className="grid gap-4">
          {requests.map((req) => (
            <RequestCard
              key={req._id}
              user={req}
              reviewRequest={reviewRequest}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Requests;
