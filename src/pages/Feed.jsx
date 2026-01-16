import axios from "axios";
import FeedCard from "./FeedCard";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../features/feedSlice";

function Feed() {
  const dispatch = useDispatch();
  const data = useSelector((store) => store.feed);

  useEffect(() => {
    async function fetchFeed() {
      try {
        const res = await axios.get(BASE_URL + "/users/feed", {
          withCredentials: true,
        });

        dispatch(addFeed(res?.data?.data));
      } catch (error) {
        toast.error("Error while fetching feed");
        console.error("Feed Error:", error.response?.data);
      }
    }

    fetchFeed();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] py-8 px-4">
        {data.map((item) => (
        <FeedCard key={item._id} user={item} />
      ))}

      <div className="text-center mt-8 text-gray-500 text-xs font-medium uppercase tracking-widest opacity-60">
        <span className="px-2 py-1 bg-gray-800 rounded mr-2 border border-gray-700">
          ←
        </span>
        Pass
        <span className="px-2 py-1 bg-gray-800 rounded mx-2 border border-gray-700">
          →
        </span>
        Connect
      </div>
    </div>
  );
}

export default Feed;
