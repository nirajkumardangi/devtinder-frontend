import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  FaRocket,
  FaGithub,
  FaUsers,
  FaCode,
  FaMicrochip,
  FaShieldAlt,
  FaBolt,
  FaDiscord,
  FaChartLine,
  FaLock,
  FaArrowRight,
  FaStar,
  FaQuoteLeft,
  FaCheckCircle,
  FaPlay,
  FaLightbulb,
  FaCodeBranch,
  FaAward,
  FaLinkedin,
  FaTwitter,
  FaRobot,
  FaInfinity,
} from "react-icons/fa";
import Hero from "./Hero";

const Home = () => {
  const [activeTab, setActiveTab] = useState("matching");

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 font-sans selection:bg-purple-500/30 overflow-x-hidden">
      {/* HERO SECTION */}
      <Hero />

      {/* TRUSTED BY SECTION */}
      <section className="py-16 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-slate-500 text-sm mb-8 uppercase tracking-widest">
            Trusted by developers from
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-40 grayscale">
            {["Google", "Meta", "Microsoft", "Amazon", "Netflix", "Stripe"].map(
              (company) => (
                <div key={company} className="text-2xl font-black text-white">
                  {company}
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ENHANCED METRIC BENTO GRID */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-black text-white mb-4">
            Built for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Scale
            </span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Real-time metrics from our distributed matching engine
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <BentoItem
            title="12k+"
            subtitle="Daily Matches"
            icon={<FaBolt className="text-amber-400" />}
            metric="+23%"
            className="md:col-span-1"
          />
          <BentoItem
            title="4.2M"
            subtitle="Commits Analyzed"
            icon={<FaCodeBranch className="text-purple-400" />}
            metric="+156%"
            className="md:col-span-2 md:row-span-2"
            featured
          />
          <BentoItem
            title="99.9%"
            subtitle="Uptime SLA"
            icon={<FaShieldAlt className="text-emerald-400" />}
            metric="100% Q4"
            className="md:col-span-1"
          />
          <BentoItem
            title="850ms"
            subtitle="Avg Match Time"
            icon={<FaInfinity className="text-blue-400" />}
            metric="-42%"
            className="md:col-span-1"
          />
          <BentoItem
            title="94%"
            subtitle="Success Rate"
            icon={<FaCheckCircle className="text-pink-400" />}
            metric="+8%"
            className="md:col-span-1"
          />
        </div>
      </section>

      {/* TECH STACK MARQUEE */}
      <div className="py-12 border-y border-white/5 bg-gradient-to-r from-purple-900/5 via-transparent to-pink-900/5 flex overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap gap-16 items-center text-slate-500 font-black text-5xl uppercase tracking-widest opacity-20">
          {[...Array(2)].map((_, idx) => (
            <div key={idx} className="flex gap-16">
              <span>React</span>
              <span>·</span>
              <span>Rust</span>
              <span>·</span>
              <span>Go</span>
              <span>·</span>
              <span>Solidity</span>
              <span>·</span>
              <span>Python</span>
              <span>·</span>
              <span>Next.js</span>
              <span>·</span>
              <span>Docker</span>
              <span>·</span>
              <span>AWS</span>
              <span>·</span>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
                How DevMatch{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  Works
                </span>
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                From code analysis to collaboration in four simple steps
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0" />

            {[
              {
                step: "01",
                title: "Connect GitHub",
                desc: "Link your GitHub account and let our AI analyze your coding patterns, contribution history, and technical expertise.",
                icon: <FaGithub />,
                color: "purple",
              },
              {
                step: "02",
                title: "AI Analysis",
                desc: "Our neural network processes your code style, architecture preferences, and collaboration patterns in real-time.",
                icon: <FaRobot />,
                color: "pink",
              },
              {
                step: "03",
                title: "Smart Matching",
                desc: "Get matched with developers who complement your skills and share your technical vision and values.",
                icon: <FaMicrochip />,
                color: "blue",
              },
              {
                step: "04",
                title: "Start Building",
                desc: "Instant sandbox environments, shared code sessions, and integrated communication tools to start collaborating immediately.",
                icon: <FaRocket />,
                color: "emerald",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-${item.color}-500/10 border border-${item.color}-500/20 flex items-center justify-center text-3xl text-${item.color}-400 mb-6 mx-auto relative z-10`}
                >
                  {item.icon}
                </div>
                <div className="text-center">
                  <div className="text-6xl font-black text-white/5 mb-2">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES DEEP DIVE */}
      <section className="py-32 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
              Enterprise-Grade Features
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Powerful tools designed for serious developers and technical teams
            </p>
          </div>

          {/* Tabbed Interface */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {[
                { id: "matching", label: "AI Matching", icon: <FaRobot /> },
                { id: "security", label: "Security", icon: <FaShieldAlt /> },
                {
                  id: "collaboration",
                  label: "Collaboration",
                  icon: <FaUsers />,
                },
                { id: "analytics", label: "Analytics", icon: <FaChartLine /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30"
                      : "bg-white/5 text-slate-400 hover:bg-white/10"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <div>
                <h3 className="text-4xl font-bold text-white mb-6">
                  {activeTab === "matching" && "Neural Matching Engine"}
                  {activeTab === "security" && "Bank-Level Security"}
                  {activeTab === "collaboration" && "Real-Time Collaboration"}
                  {activeTab === "analytics" && "Deep Analytics"}
                </h3>
                <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                  {activeTab === "matching" &&
                    "Our AI doesn't just look at keywords; it analyzes your coding style, indentation habits, logic patterns, and even your commit message quality. Machine learning models trained on millions of repositories ensure you're matched with developers who truly complement your workflow."}
                  {activeTab === "security" &&
                    "End-to-end encryption, SOC 2 compliance, and zero-knowledge architecture ensure your code and conversations remain private. We never share your data with third parties and give you full control over your profile visibility."}
                  {activeTab === "collaboration" &&
                    "Instantly spin up shared VS Code Live Share sessions, collaborative whiteboards, and integrated video calls. Built-in project management tools keep your team aligned from ideation to deployment."}
                  {activeTab === "analytics" &&
                    "Track your matching success rate, collaboration patterns, and skill development over time. Understand which technologies and project types align best with your expertise and interests."}
                </p>
                <ul className="space-y-4">
                  {activeTab === "matching" && (
                    <>
                      <FeatureListItem text="98% average match accuracy" />
                      <FeatureListItem text="Real-time code style analysis" />
                      <FeatureListItem text="Skill complementarity scoring" />
                      <FeatureListItem text="Project preference alignment" />
                    </>
                  )}
                  {activeTab === "security" && (
                    <>
                      <FeatureListItem text="AES-256 encryption" />
                      <FeatureListItem text="SOC 2 Type II certified" />
                      <FeatureListItem text="GDPR & CCPA compliant" />
                      <FeatureListItem text="Regular security audits" />
                    </>
                  )}
                  {activeTab === "collaboration" && (
                    <>
                      <FeatureListItem text="VS Code Live Share integration" />
                      <FeatureListItem text="Collaborative whiteboards" />
                      <FeatureListItem text="Integrated video/voice chat" />
                      <FeatureListItem text="Project management tools" />
                    </>
                  )}
                  {activeTab === "analytics" && (
                    <>
                      <FeatureListItem text="Match success tracking" />
                      <FeatureListItem text="Skill growth visualization" />
                      <FeatureListItem text="Collaboration insights" />
                      <FeatureListItem text="Custom reporting" />
                    </>
                  )}
                </ul>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl" />
                <div className="relative bg-slate-950/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
                  {activeTab === "matching" && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">
                          Match Algorithm v4.2
                        </span>
                        <span className="text-emerald-400 font-mono text-sm">
                          Active
                        </span>
                      </div>
                      <div className="space-y-3">
                        {[
                          { label: "Code Style", value: 96 },
                          { label: "Tech Stack", value: 89 },
                          { label: "Experience Level", value: 94 },
                          { label: "Communication", value: 92 },
                        ].map((item) => (
                          <div key={item.label}>
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-slate-300">
                                {item.label}
                              </span>
                              <span className="text-purple-400 font-mono">
                                {item.value}%
                              </span>
                            </div>
                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${item.value}%` }}
                                viewport={{ once: true }}
                                className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {activeTab === "security" && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          {
                            label: "Encrypted",
                            icon: <FaLock />,
                            status: "Active",
                          },
                          {
                            label: "2FA Enabled",
                            icon: <FaShieldAlt />,
                            status: "On",
                          },
                          {
                            label: "Audit Log",
                            icon: <FaCheckCircle />,
                            status: "Live",
                          },
                          {
                            label: "Compliance",
                            icon: <FaAward />,
                            status: "SOC 2",
                          },
                        ].map((item) => (
                          <div
                            key={item.label}
                            className="p-4 bg-white/5 rounded-xl border border-white/5"
                          >
                            <div className="text-2xl text-emerald-400 mb-2">
                              {item.icon}
                            </div>
                            <div className="text-sm text-slate-400">
                              {item.label}
                            </div>
                            <div className="text-xs text-emerald-400 mt-1">
                              {item.status}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {activeTab === "collaboration" && (
                    <div className="space-y-4">
                      <div className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl">
                        <div className="flex items-center gap-3 mb-3">
                          <FaPlay className="text-purple-400" />
                          <span className="text-white font-semibold">
                            Live Session Active
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-2">
                            {[1, 2, 3].map((i) => (
                              <img
                                key={i}
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=collab${i}`}
                                className="w-8 h-8 rounded-full border-2 border-slate-950"
                                alt={`User ${i}`}
                              />
                            ))}
                          </div>
                          <span className="text-slate-400 text-sm">
                            3 developers coding
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-white/5 rounded-lg text-center">
                          <div className="text-2xl font-bold text-white">
                            247
                          </div>
                          <div className="text-xs text-slate-400">
                            Lines Changed
                          </div>
                        </div>
                        <div className="p-3 bg-white/5 rounded-lg text-center">
                          <div className="text-2xl font-bold text-white">
                            1:23
                          </div>
                          <div className="text-xs text-slate-400">
                            Session Time
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {activeTab === "analytics" && (
                    <div className="space-y-6">
                      <div className="text-center p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl">
                        <div className="text-5xl font-black text-white mb-2">
                          94%
                        </div>
                        <div className="text-slate-400">
                          Average Match Success
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { label: "Matches", value: "142" },
                          { label: "Projects", value: "23" },
                          { label: "Growth", value: "+47%" },
                        ].map((stat) => (
                          <div
                            key={stat.label}
                            className="text-center p-3 bg-white/5 rounded-lg"
                          >
                            <div className="font-bold text-white">
                              {stat.value}
                            </div>
                            <div className="text-xs text-slate-400">
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
              Developer{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Stories
              </span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Real experiences from developers who found their perfect technical
              match
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "Found my co-founder in 3 days. We shipped our MVP in 2 weeks. DevMatch understands what LinkedIn never could.",
                author: "Sarah Chen",
                role: "Founder @ CloudSync",
                avatar: "Sarah",
                rating: 5,
              },
              {
                quote:
                  "The code analysis is scary accurate. It matched me with someone who writes TypeScript exactly like I do. We're now building together full-time.",
                author: "Marcus Johnson",
                role: "Senior Engineer",
                avatar: "Marcus",
                rating: 5,
              },
              {
                quote:
                  "Best investment in my career. The quality of connections here is unmatched. Everyone is serious about building.",
                author: "Priya Sharma",
                role: "Tech Lead @ StartupXYZ",
                avatar: "Priya",
                rating: 5,
              },
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 border border-white/10 rounded-3xl p-8 backdrop-blur-xl relative group"
              >
                <FaQuoteLeft className="text-4xl text-purple-500/20 mb-6" />
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 leading-relaxed mb-8 text-lg">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${testimonial.avatar}`}
                    className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-0.5"
                    alt={testimonial.author}
                  />
                  <div>
                    <div className="font-bold text-white">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-slate-400">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED DEVELOPER SPOTLIGHT */}
      <section className="py-32 bg-gradient-to-b from-slate-900/50 to-transparent relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6">
              <FaStar className="text-amber-400" />
              Featured Developer of the Week
            </div>
            <h2 className="text-5xl font-black text-white mb-4">
              Meet This Week's Standout
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900 border border-white/10 rounded-[3rem] p-12 backdrop-blur-xl shadow-2xl relative overflow-hidden"
          >
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 blur-3xl -z-10" />

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-30" />
                <img
                  src="https://github.com/nirajkumardangi.png"
                  className="relative w-full h-auto rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 p-2"
                  alt="Featured Developer"
                />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-2xl">
                  <div className="text-center">
                    <FaAward className="text-4xl text-white mb-1 mx-auto" />
                    <div className="text-white font-black text-sm">Top 1%</div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-6">
                  <h3 className="text-4xl font-black text-white">
                    Niraj Kr. Dangi
                  </h3>
                  <FaCheckCircle className="text-2xl text-blue-400" />
                </div>

                <p className="text-purple-400 font-mono text-sm mb-6 flex items-center gap-2">
                  <FaBolt /> Elite Contributor · 99.2% Match Success Rate
                </p>

                <p className="text-slate-300 leading-relaxed mb-8 text-lg">
                  Full-stack wizard specializing in building scalable AI-powered
                  platforms. Successfully matched with 47 developers and
                  launched 8 production apps in the last 6 months. Known for
                  clean code architecture and mentoring junior devs.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Technical Expertise</span>
                    <span className="text-emerald-400 font-mono text-sm">
                      Expert
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {[
                      "React",
                      "Node.js",
                      "Python",
                      "PostgreSQL",
                      "AWS",
                      "Javascriot",
                      "TypeScript",
                      "MongoDB",
                    ].map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 bg-purple-500/10 text-purple-300 text-sm rounded-full border border-purple-500/20 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-white/5 rounded-2xl border border-white/5">
                      <div className="text-3xl font-black text-white mb-1">
                        8
                      </div>
                      <div className="text-xs text-slate-400">Projects</div>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-2xl border border-white/5">
                      <div className="text-3xl font-black text-white mb-1">
                        47
                      </div>
                      <div className="text-xs text-slate-400">Matches</div>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-2xl border border-white/5">
                      <div className="text-3xl font-black text-white mb-1">
                        1.2k
                      </div>
                      <div className="text-xs text-slate-400">Commits</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-white hover:scale-105 transition-transform shadow-lg shadow-purple-500/30">
                    View Profile
                  </button>
                  <button className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all">
                    <FaGithub className="text-2xl" />
                  </button>
                  <button className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all">
                    <FaLinkedin className="text-2xl" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PRICING PREVIEW */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
              Simple, Transparent Pricing
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Start free, upgrade when you're ready to unlock advanced features
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Free",
                price: "$0",
                desc: "Perfect for exploring and making your first connections",
                features: [
                  "5 matches per month",
                  "Basic AI matching",
                  "GitHub integration",
                  "Community access",
                ],
                cta: "Start Free",
                popular: false,
              },
              {
                name: "Pro",
                price: "$29",
                desc: "For serious developers ready to scale their network",
                features: [
                  "Unlimited matches",
                  "Advanced AI matching",
                  "Priority support",
                  "Analytics dashboard",
                  "Team collaboration tools",
                  "Custom matching filters",
                ],
                cta: "Go Pro",
                popular: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                desc: "For teams and organizations at scale",
                features: [
                  "Everything in Pro",
                  "Dedicated account manager",
                  "Custom integrations",
                  "SLA guarantees",
                  "Advanced security",
                ],
                cta: "Contact Sales",
                popular: false,
              },
            ].map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative p-8 rounded-3xl ${
                  plan.popular
                    ? "bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-2 border-purple-500/50 shadow-2xl shadow-purple-500/20"
                    : "bg-slate-900/50 border border-white/10"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-sm font-bold text-white">
                    Most Popular
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-5xl font-black text-white">
                      {plan.price}
                    </span>
                    {plan.price !== "Custom" && (
                      <span className="text-slate-400">/month</span>
                    )}
                  </div>
                  <p className="text-slate-400">{plan.desc}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <FaCheckCircle className="text-emerald-400 mt-1 flex-shrink-0" />
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-4 rounded-xl font-bold transition-all ${
                    plan.popular
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:scale-105 shadow-lg shadow-purple-500/30"
                      : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                  }`}
                >
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-32 bg-slate-900/30">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-white mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-400">
              Everything you need to know about DevMatch
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                q: "How does the matching algorithm work?",
                a: "Our AI analyzes your GitHub repositories, coding patterns, tech stack preferences, and collaboration history. It then uses neural networks to find developers whose skills and working style complement yours, resulting in highly compatible matches.",
              },
              {
                q: "Is my code and data secure?",
                a: "Absolutely. We use bank-level AES-256 encryption, are SOC 2 Type II certified, and never share your code with anyone. You have full control over your profile visibility and can delete your data at any time.",
              },
              {
                q: "Can I use DevMatch to find co-founders?",
                a: "Yes! Many of our users have found their co-founders through DevMatch. Our matching algorithm is specifically designed to identify developers who share your vision and complement your technical skills.",
              },
              {
                q: "What makes DevMatch different from LinkedIn?",
                a: "LinkedIn focuses on professional networking with emphasis on job history and credentials. DevMatch analyzes actual code quality, technical preferences, and collaboration patterns to create meaningful technical partnerships based on skill compatibility.",
              },
              {
                q: "How do I get started?",
                a: "Simply connect your GitHub account, complete your profile with your interests and goals, and our AI will start finding compatible matches. You can start swiping and connecting immediately.",
              },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-900/50 border border-white/10 rounded-2xl p-8 hover:border-purple-500/30 transition-all"
              >
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <FaLightbulb className="text-purple-400" />
                  {faq.q}
                </h3>
                <p className="text-slate-400 leading-relaxed pl-9">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-indigo-700 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl" />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
                Ready to find your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-400">
                  technical soulmate?
                </span>
              </h2>
              <p className="text-white/80 text-xl mb-12 max-w-2xl mx-auto">
                Join 12,000+ developers who've already found their perfect
                match. Start building something amazing today.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-purple-600 rounded-2xl font-black text-xl hover:shadow-2xl hover:scale-105 transition-all"
                >
                  <FaRocket />
                  Get Started for Free
                  <FaArrowRight />
                </Link>
                <button className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white/10 backdrop-blur-sm text-white rounded-2xl font-bold text-xl hover:bg-white/20 transition-all border-2 border-white/20">
                  <FaPlay />
                  Watch Demo
                </button>
              </div>
              <p className="text-white/60 text-sm mt-8">
                No credit card required · Free forever · Cancel anytime
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

// --- HELPER COMPONENTS ---

const BentoItem = ({ title, subtitle, icon, metric, className, featured }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.02 }}
    className={`p-8 bg-gradient-to-br ${
      featured
        ? "from-purple-900/20 to-pink-900/20 border-purple-500/30"
        : "from-slate-900/40 to-slate-800/40 border-white/5"
    } border rounded-3xl flex flex-col justify-between hover:border-purple-500/50 transition-all relative overflow-hidden group ${className}`}
  >
    {featured && (
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
    )}
    <div className="text-3xl mb-4">{icon}</div>
    <div className="relative z-10">
      <h3 className="text-5xl font-black text-white mb-2">{title}</h3>
      <p className="text-slate-400 font-medium mb-2">{subtitle}</p>
      {metric && (
        <div className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-mono">
          <FaArrowRight className="rotate-[-45deg]" />
          {metric}
        </div>
      )}
    </div>
  </motion.div>
);

const FeatureListItem = ({ text }) => (
  <li className="flex items-center gap-3 text-slate-300">
    <FaCheckCircle className="text-emerald-400 flex-shrink-0" />
    <span>{text}</span>
  </li>
);

export default Home;
