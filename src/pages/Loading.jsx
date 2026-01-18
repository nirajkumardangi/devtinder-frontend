function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none select-none">
      {/* Ambient glow */}
      <div className="absolute w-[320px] h-[320px] bg-purple-600/20 dark:bg-purple-500/20 blur-3xl rounded-full" />

      {/* Spinner */}
      <div className="relative z-10 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-purple-500/40 border-t-purple-500 rounded-full animate-spin" />
      </div>
    </div>
  );
}

export default Loading;
