import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";
import { Paperclip, Send, MoreHorizontal, ShieldCheck } from "lucide-react";

function Chat() {
  const { id } = useParams();
  const connections = useSelector((s) => s.connection);
  const peer = connections.find((u) => u._id === id) || {
    name: "Developer",
    headline: "Full Stack Developer",
    avatar: "https://i.pravatar.cc/150",
  };

  const [message, setMessage] = useState("");
  const scrollRef = useRef(null);

  const dummyMessages = [
    {
      id: 1,
      fromMe: false,
      text: "Hey! Thanks for connecting 🚀",
      time: "10:00 AM",
    },
    {
      id: 2,
      fromMe: true,
      text: "Same here! Love the Go + Kafka stack 😁",
      time: "10:02 AM",
    },
    {
      id: 3,
      fromMe: false,
      text: "Yeah! microservices are fun!",
      time: "10:05 AM",
    },
    {
      id: 4,
      fromMe: true,
      text: "Totally! Curious — are you deploying to Kubernetes or ECS?",
      time: "10:06 AM",
    },
    {
      id: 5,
      fromMe: false,
      text: "Kubernetes! We migrated last fall. Helm charts + ArgoCD for deploys.",
      time: "10:10 AM",
    },
    {
      id: 6,
      fromMe: true,
      text: "Nice 😎 I've been wanting to try ArgoCD. Using GitOps must feel clean.",
      time: "10:12 AM",
    },
    {
      id: 7,
      fromMe: false,
      text: "Super clean! Production rollbacks are way less scary now haha",
      time: "10:15 AM",
    },
  ];

  // Auto-scroll logic
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [dummyMessages]);

  return (
    <div className="w-full min-h-[calc(100vh-64px)] bg-[#0B101B] flex flex-col font-sans text-slate-200">
      <div className="max-w-5xl w-full mx-auto flex flex-col h-[85vh] my-auto px-4">
        {/* TOP NAVIGATION & HEADER */}
        <div className="flex items-center justify-between py-4">
          <Link
            to="/connections"
            className="p-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 hover:text-white transition-all"
          >
            <FaArrowLeft size={14} />
          </Link>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
              Active Now
            </span>
          </div>
          <button className="p-2 text-slate-500 hover:text-white cursor-pointer">
            <MoreHorizontal size={20} />
          </button>
        </div>

        {/* CHAT INTERFACE */}
        <div className="flex-1 bg-slate-900/40 border border-slate-800 rounded-[1.5rem] flex flex-col overflow-hidden shadow-2xl">
          {/* USER INFO BAR */}
          <div className="p-6 border-b border-slate-800/50 bg-slate-900/20 backdrop-blur-md flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={peer.avatar}
                  className="w-12 h-12 rounded-2xl object-cover ring-2 ring-purple-500/20"
                  alt=""
                />
                <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-0.5 border-2 border-[#161E2D]">
                  <ShieldCheck size={10} className="text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-lg font-bold text-white leading-none">
                  {peer.name}
                </h1>
                <p className="text-xs text-purple-400 font-medium mt-1">
                  {peer.headline || peer.role}
                </p>
              </div>
            </div>
          </div>

          {/* MESSAGES AREA */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-800"
          >
            {dummyMessages.map((msg, index) => (
              <div
                key={msg.id}
                className={`flex ${msg.fromMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`group relative max-w-[75%] md:max-w-[60%] ${msg.fromMe ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`px-4 py-3 rounded-3xl text-sm font-medium leading-relaxed shadow-sm ${
                      msg.fromMe
                        ? "bg-purple-600 text-white rounded-br-none"
                        : "bg-slate-800 text-slate-200 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <p
                    className={`text-[10px] mt-1 font-bold text-slate-600 uppercase tracking-tighter ${msg.fromMe ? "text-right" : "text-left"}`}
                  >
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* INPUT AREA */}
          <div className="p-6 bg-slate-900/20 border-t border-slate-800/50">
            <div className="relative flex items-center gap-3 bg-slate-950/50 border border-slate-800 rounded-2xl p-2 focus-within:border-purple-500/50 transition-all">
              <button className="p-2 text-slate-500 hover:text-purple-400 transition-colors cursor-pointer">
                <Paperclip size={20} />
              </button>
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 bg-transparent px-2 py-2 text-sm text-white placeholder-slate-600 outline-none"
                placeholder={`Message ${peer.name}...`}
              />
              <button
                disabled={!message.trim()}
                className="p-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-30 disabled:hover:bg-purple-600 text-white rounded-xl transition-all shadow-lg shadow-purple-900/20 cursor-pointer"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
