import axios from "axios";
import { Flame, Inbox } from "lucide-react";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    async function fetchReceived() {
      if (requests.length > 0) return;

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
    }

    fetchReceived();
  }, [requests.length, dispatch]);

  const reviewRequest = async (status, id) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${id}`,
        {},
        { withCredentials: true },
      );

      dispatch(removeRequest(id));
    } catch (err) {
      toast.error(err?.response?.data || "Failed to procesed");
    }
  };

  if (loading) return <Loading />;

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
          <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium">
            {requests.length} pending
          </span>
        </div>

        {/* Empty */}
        {requests.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Inbox size={48} className="text-gray-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">No pending requests</h3>
            <p className="text-gray-400 mb-6">
              Start swiping to get more connection requests!
            </p>
            <Link to="/">
              <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-medium hover:opacity-90 transition-all flex items-center gap-2 mx-auto cursor-pointer">
                <Flame size={20} />
                Go to Feed
              </button>
            </Link>
          </div>
        )}

        {/* List */}
        {requests.length > 0 && (
          <div className="space-y-4">
            {requests.map((req) => (
              <RequestCard
                key={req._id}
                user={req}
                reviewRequest={reviewRequest}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Requests;
