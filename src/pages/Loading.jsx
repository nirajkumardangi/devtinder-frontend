function Loading() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="backdrop-blur-md bg-white/70 shadow-lg rounded-xl px-6 py-5 flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-indigo-600 font-medium tracking-wide">
          Checking session...
        </p>
      </div>
    </div>
  );
}

export default Loading;
