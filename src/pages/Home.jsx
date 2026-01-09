function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-slate-900 text-center px-4 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6">
          Swipe Right on <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600 block pt-4">
            Great Code
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-2xl mx-auto">
          The only dating app designed for developers. Connect based on tech
          stack, coding style, and open source contributions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full font-bold text-lg hover:shadow-lg hover:shadow-pink-500/30 transition-all">
            Create Account
          </button>
          <button className="px-8 py-4 bg-slate-800 text-white rounded-full font-bold text-lg hover:bg-slate-700 transition-all border border-slate-700">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
