import axios from "axios";
import FeedCard from "./FeedCard";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeFeed } from "../features/feedSlice";
import Loading from "./Loading";

function Feed() {
  const dispatch = useDispatch();
  const data = useSelector((store) => store.feed);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    async function fetchFeed() {
      setLoader(true);
      try {
        const res = await axios.get(BASE_URL + "/users/feed", {
          withCredentials: true,
        });

        dispatch(addFeed(res?.data?.data));
      } catch (error) {
        toast.error(error.response?.data || "Error while fetching feed");
        console.error("Feed Error:", error.response?.data);
      } finally {
        setLoader(false);
      }
    }

    fetchFeed();
  }, []);

  async function handleDislike(id) {
    try {
      dispatch(removeFeed(id));
      await axios.post(
        `${BASE_URL}/request/send/ignored/${id}`,
        {},
        { withCredentials: true },
      );
    } catch (error) {
      
      toast.error("dislike error!");
    }
  }

  async function handleConnect(id) {
    try {
      await axios.post(
        `${BASE_URL}/request/send/interested/${id}`,
        {},
        { withCredentials: true },
      );
      dispatch(removeFeed(id));
    } catch (error) {
      console.log(error);
      toast.error("connect error!");
    }
  }

  return (
    <>
      {loader && <Loading />}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] py-8 px-4">
        {data.length > 0 ? (
          <FeedCard
            user={data[0]}
            handleDislike={handleDislike}
            handleConnect={handleConnect}
          />
        ) : (
          !loader &&
          data.length === 0 && (
            <h1 className="text-center text-purple-600 text-2xl font-bold">
              Feed Empty
            </h1>
          )
        )}
        {data.length > 0 && (
          <div className="text-center mt-8 text-gray-500 text-xs font-medium uppercase tracking-widest opacity-60">
            <span className="px-2 py-1 bg-gray-800 rounded mr-2 border border-gray-700">
              ←
            </span>
            Dislike
            <span className="px-2 py-1 bg-gray-800 rounded mx-2 border border-gray-700">
              →
            </span>
            Connect
          </div>
        )}
      </div>
    </>
  );
}

export default Feed;
