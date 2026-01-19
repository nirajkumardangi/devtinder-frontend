import { Link } from "react-router-dom";
import {
  FaRocket,
  FaPlay,
  FaCheckCircle,
  FaTimes,
  FaHeart,
  FaUsers,
  FaLaptopCode,
  FaComments,
  FaArrowRight,
} from "react-icons/fa";
import SkillTags from "../components/SkillTags";

function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans overflow-x-hidden">
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden">
        {/* Background Gradients/Blobs */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black opacity-20"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600 rounded-full filter blur-[100px] opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-600 rounded-full filter blur-[100px] opacity-30 animate-pulse"></div>

        <div className="relative flex justify-center items-center max-w-7xl min-h-screen mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:gap-40 justify-between z-10">
            {/* --- Left Column: Text Content --- */}
            <div className="text-center md:text-left z-10">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Find Your Perfect <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 block">
                  Dev Match
                </span>
              </h1>
              <p className="text-xl text-gray-400 mb-8 max-w-lg mx-auto md:mx-0">
                Connect with developers who share your passion. Collaborate on
                projects, find mentors, or meet your next co-founder.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col px-8 md:px-0 md:flex-wrap sm:flex-row gap-4 justify-center md:justify-start">
                <Link
                  to="/login"
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-lg hover:opacity-90 transition-all transform hover:scale-105 shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <FaRocket /> Get Started Free
                </Link>
                <Link
                  to="/feed"
                  className="px-8 py-4 bg-gray-800 rounded-xl font-semibold text-lg hover:bg-gray-700 transition-all border border-gray-700 flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <FaPlay /> Explore Feed
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="mt-8 flex items-center justify-center md:justify-start space-x-6 text-gray-400">
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" />
                  <span>100% Free</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" />
                  <span>10K+ Developers</span>
                </div>
              </div>
            </div>

            {/* --- Right Column: Hero Card UI --- */}
            <div className="relative hidden md:block">
              <div className="relative w-80 h-[410px] mx-auto">
                {/* Decorative Cards Behind */}
                <div className="absolute inset-0 bg-gray-800 rounded-3xl transform rotate-6 shadow-2xl border border-gray-700 opacity-60"></div>
                <div className="absolute inset-0 bg-gray-800 rounded-3xl transform -rotate-3 shadow-2xl border border-gray-700 opacity-80"></div>

                {/* Main Card */}
                <div className="relative bg-[#1F2937] rounded-3xl p-6 shadow-2xl border border-gray-700 h-full flex flex-col">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                    alt="Sarah Chen"
                    className="w-24 h-24 rounded-full mx-auto mb-5 ring-4 ring-purple-500/50 bg-gray-700"
                  />
                  <h3 className="text-2xl mb-4 font-bold text-center text-white">
                    Sarah Chen
                  </h3>
                  <p className="text-purple-400 text-center text-sm font-medium mb-4">
                    Full Stack Developer
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    <SkillTags
                      skills={[
                        "React",
                        "Javascript",
                        "MongoDB",
                        "Python",
                        "Node.js",
                        "MySQL",
                      ]}
                    />
                  </div>

                  {/* Swipe Actions */}
                  <div className="flex justify-center gap-6 mt-auto my-10">
                    <button className="w-14 h-14 bg-red-500/10 rounded-full flex items-center justify-center hover:bg-red-500/20 transition-all border border-red-500/20 group">
                      <FaTimes className="text-red-500 text-xl group-hover:scale-110 transition-transform" />
                    </button>
                    <button className="w-14 h-14 bg-green-500/10 rounded-full flex items-center justify-center hover:bg-green-500/20 transition-all border border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.2)] group">
                      <FaHeart className="text-green-500 text-xl group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section className="py-24 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Why DevTinder?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Built by developers, for developers. We understand what you're
              looking for.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-purple-500/50 transition-all group hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-purple-900/20">
                <FaUsers className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">
                Find Collaborators
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Connect with developers who complement your skills and share
                your vision for amazing projects.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-purple-500/50 transition-all group hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-purple-900/20">
                <FaLaptopCode className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">
                Skill Matching
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Our smart algorithm matches you with developers based on tech
                stack, experience, and interests.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-purple-500/50 transition-all group hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-purple-900/20">
                <FaComments className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">
                Real Connections
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Chat, collaborate, and build lasting professional relationships
                in the dev community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS SECTION ================= */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "10K+", label: "Active Developers" },
              { number: "5K+", label: "Matches Made" },
              { number: "500+", label: "Projects Started" },
              { number: "50+", label: "Countries" },
            ].map((stat, index) => (
              <div key={index} className="text-center group cursor-default">
                <div className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="py-24 bg-gray-800/50 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative max-w-4xl mx-auto px-4 text-center z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            Ready to Find Your Match?
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            Join thousands of developers already connecting on DevTinder.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-bold text-lg text-white hover:opacity-90 transition-all transform hover:scale-105 shadow-xl shadow-purple-500/30"
          >
            Start Swiping Now <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
