import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { Paperclip, Send } from "lucide-react";

function Chat() {
  const peer = {
    name: "Vivek",
    role: "Go + Distributed Systems",
    avatar: "https://i.pravatar.cc/150?img=3",
  };

  const dummyMessages = [
    { id: 1, fromMe: false, text: "Hey! Thanks for connecting 🚀" },
    { id: 2, fromMe: true, text: "Same here! Love the Go + Kafka stack 😁" },
    { id: 3, fromMe: false, text: "Yeah! microservices are fun!" },
  ];

  return (
    <div className="w-full min-h-screen bg-[#0B101B] py-10 px-4 font-sans text-slate-200">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* BACK */}
        <Link
          to="/connections"
          className="inline-flex items-center gap-2 font-bold text-slate-400 hover:text-white mb-6 transition-all"
        >
          <FaArrowLeft className="text-sm" />
          <span>Back to connections</span>
        </Link>

        {/* HEADER CARD */}
        <div className="bg-[#1E293B] rounded-3xl p-8 relative overflow-hidden border border-slate-800">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>

          <div className="flex items-center gap-4 relative">
            <img
              src={peer.avatar}
              className="w-14 h-14 rounded-full object-cover border border-slate-700"
            />
            <div>
              <h1 className="text-xl font-bold">{peer.name}</h1>
              <p className="text-sm text-slate-400">{peer.role}</p>
            </div>
          </div>
        </div>

        {/* CHAT BOX */}
        <div className="bg-[#1E293B] rounded-3xl border border-slate-800 p-6 flex flex-col h-[550px]">
          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            {dummyMessages.map((msg) => (
              <div
                key={msg.id}
                className={`max-w-[50%] px-4 py-2 rounded-2xl text-sm ${
                  msg.fromMe
                    ? "ml-auto bg-purple-600 text-white"
                    : "bg-slate-800 text-white"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* INPUT BAR */}
          <div className="mt-4 flex items-center gap-3">
            <Paperclip className="text-slate-400 cursor-pointer" size={20} />
            <input
              className="flex-1 bg-slate-800 rounded-xl px-3 py-2 text-sm placeholder-slate-400 outline-none border border-transparent focus:border-purple-500 transition"
              placeholder="Type a message..."
            />
            <Send size={20} className="text-purple-500 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
