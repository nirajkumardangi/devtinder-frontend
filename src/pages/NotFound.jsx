const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans flex flex-col">
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        {/* Large Typography Focus */}
        <h1 className="text-[12rem] md:text-[16rem] font-black leading-none tracking-tighter text-slate-800/30">
          404
        </h1>

        <div className="relative -mt-20 md:-mt-32">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Page Not Found
          </h2>
          <p className="text-slate-400 max-w-md mx-auto mb-10 text-lg">
            We couldn't find a page at this endpoint. They might have deleted
            page or moved to a different url.
          </p>

          {/* Simple Clean Buttons - Matching the purple/dark theme */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/"
              className="w-full sm:w-auto px-10 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-bold transition-all"
            >
              KEEP EXPLORING
            </a>
            <button
              onClick={() => window.history.back()}
              className="w-full sm:w-auto px-10 py-4 bg-transparent border border-slate-700 hover:bg-slate-800 text-slate-300 rounded-full font-bold transition-all"
            >
              GO BACK
            </button>
          </div>
        </div>
      </main>

      {/* Footer hint */}
      <footer className="p-8 text-center text-slate-600 font-mono text-xs tracking-widest uppercase">
        Error_Code: 0x404 // Branch: Main
      </footer>
    </div>
  );
};

export default NotFound;
