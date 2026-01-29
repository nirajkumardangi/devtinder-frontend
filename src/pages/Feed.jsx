import axios from "axios";
import FeedCard from "./FeedCard";
import { useEffect, useState, useCallback, useRef } from "react";
import { BASE_URL } from "../utils/constants";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeFeed } from "../features/feedSlice";
import Loading from "./Loading";
import { Sparkles } from "lucide-react";

function Feed() {
  const dispatch = useDispatch();
  const feedData = useSelector((store) => store.feed);
  const [loader, setLoader] = useState(false);
  const isFetching = useRef(false); // Prevent double-fetch in StrictMode

  const fetchFeed = useCallback(async () => {
    if (isFetching.current) return;
    isFetching.current = true;
    setLoader(true);

    try {
      const res = await axios.get(`${BASE_URL}/users/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data || []));
    } catch (error) {
      toast.error(error.response?.data || "Failed to load feed");
    } finally {
      setLoader(false);
      isFetching.current = false;
    }
  }, [dispatch]);

  useEffect(() => {
    if (!feedData || feedData.length === 0) {
      fetchFeed();
    }
  }, [fetchFeed, feedData?.length]);

  const handleAction = async (id, status) => {
    try {
      // 1. Remove from Redux immediately (Optimistic UI)
      dispatch(removeFeed(id));

      // 2. Call API in background
      await axios.post(
        `${BASE_URL}/request/send/${status}/${id}`,
        {},
        { withCredentials: true },
      );
    } catch (error) {
      toast.error("Action failed. Please refresh.");
      fetchFeed(); // Refresh to get data back on error
    }
  };

  if (loader && (!feedData || feedData.length === 0)) return <Loading />;

  return (
    <div className="relative min-h-[calc(100vh-80px)] w-full flex flex-col items-center justify-center overflow-hidden bg-[#0B101B]">
      {feedData && feedData.length > 0 ? (
        <div className="relative w-full max-w-sm px-4 h-[600px] flex items-center justify-center">
          {/* Key must be unique to the user, not index */}
          <FeedCard
            key={feedData[0]._id}
            user={feedData[0]}
            onSwipeLeft={(id) => handleAction(id, "ignored")}
            onSwipeRight={(id) => handleAction(id, "interested")}
          />
        </div>
      ) : (
        <div className="text-center animate-in fade-in zoom-in duration-500">
          <div className="bg-purple-500/10 p-6 rounded-full inline-block mb-4">
            <Sparkles className="text-purple-500 w-12 h-12" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            You're All Caught Up!
          </h1>
          <button
            onClick={fetchFeed}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-500 rounded-full transition-all text-white font-bold"
          >
            Refresh Feed
          </button>
        </div>
      )}
    </div>
  );
}

export default Feed;
