import { Search, Upload, BookOpen, FileText, Users, Download, Trophy, ShieldCheck, ArrowRight, Zap } from "lucide-react";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const stats = [
  { label: "Files Uploaded Today", value: "1,247", icon: FileText },
  { label: "Active Contributors", value: "3,892", icon: Users },
  { label: "Total Downloads", value: "89.4K", icon: Download },
];

const leaderboard = [
  { rank: 1, name: "Arjun Mehta", score: 2480, badge: "Verified Senior" },
  { rank: 2, name: "Priya Sharma", score: 2105, badge: "Verified Senior" },
  { rank: 3, name: "Karthik R.", score: 1890, badge: "Verified Senior" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-32">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="flex flex-col items-center text-center max-w-3xl mx-auto"
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={fadeUp}
              custom={0}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-xs font-medium text-muted-foreground mb-6"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-glow" />
              Community-Driven • Give-to-Get Barter System
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]"
            >
              Your Campus Legacy.{" "}
              <span className="gradient-text">Open Source.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-6 text-lg text-muted-foreground max-w-xl"
            >
              Upload your notes, earn credits, download what you need. The
              academic barter system built by students, for students.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              variants={fadeUp}
              custom={3}
              className="mt-10 w-full max-w-xl"
            >
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  placeholder="Search by Subject, Course Code, or Faculty..."
                  className="h-14 pl-12 pr-4 rounded-xl bg-secondary border-border text-base placeholder:text-muted-foreground focus:glow-border"
                />
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              custom={4}
              className="mt-8 flex flex-col sm:flex-row gap-3"
            >
              <Link to="/dashboard?upload=true">
                <Button size="lg" className="gap-2 text-base px-8 h-12">
                  <Upload className="h-4 w-4" />
                  Upload to Earn Credits
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2 text-base px-8 h-12 border-border text-foreground hover:bg-secondary"
                >
                  <BookOpen className="h-4 w-4" />
                  Browse Library
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Live Stats */}
      <section className="border-y border-border bg-secondary/30">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="flex items-center gap-4 justify-center sm:justify-start"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground stat-glow">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              How It Works
            </h2>
            <p className="mt-2 text-muted-foreground max-w-lg mx-auto">
              A simple give-to-get system — contribute to access.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                step: "01",
                icon: Upload,
                title: "Upload Your Notes",
                description:
                  "Share your CAT papers, FAT solutions, lab manuals, or any study material. Every upload helps the community.",
              },
              {
                step: "02",
                icon: Zap,
                title: "Earn Credits",
                description:
                  "Each approved upload earns you 5 download credits. The more you contribute, the more you can access.",
              },
              {
                step: "03",
                icon: Download,
                title: "Download What You Need",
                description:
                  "Use your credits to download notes from other students. Find exactly what you need for your next exam.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="relative rounded-xl border border-border bg-card p-6 card-hover text-center"
              >
                <span className="text-xs font-mono font-bold text-primary/40 absolute top-4 left-5">
                  {item.step}
                </span>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mx-auto mb-4 mt-2">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="max-w-md mx-auto"
          >
            <div className="flex items-center gap-2 mb-6 justify-center">
              <Trophy className="h-5 w-5 text-credit" />
              <h2 className="text-xl font-bold text-foreground">
                Hall of Fame
              </h2>
            </div>

            <div className="rounded-xl border border-border bg-card overflow-hidden">
              {leaderboard.map((user, i) => (
                <div
                  key={user.name}
                  className={`flex items-center gap-4 px-5 py-4 ${
                    i < leaderboard.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                      i === 0
                        ? "bg-credit/20 text-credit"
                        : i === 1
                        ? "bg-muted text-muted-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    #{user.rank}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-sm truncate">
                      {user.name}
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <ShieldCheck className="h-3 w-3 text-primary" />
                      <span className="text-xs text-primary font-medium">
                        {user.badge}
                      </span>
                    </div>
                  </div>
                  <span className="text-sm font-mono font-semibold text-muted-foreground">
                    {user.score.toLocaleString()} pts
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 text-center">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
              >
                View full leaderboard <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
