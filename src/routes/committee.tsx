import React, { useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Search, Layers, Crown, Shield, GraduationCap, Users, Award } from "lucide-react";
import { SiteNav } from "@/components/site/SiteNav";
import { Footer } from "@/components/site/Footer";
import { BackgroundFog } from "@/components/site/BackgroundFog";
import committeeData, { CommitteeMember } from "@/data/committee";
import leadershipData, { LeadershipMember } from "@/data/leadership";

export const Route = createFileRoute("/committee")({
  component: CommitteePage,
  head: () => ({
    meta: [
      {
        title: "Advisory Committee — AICSSYC 2026",
      },
      {
        name: "description",
        content:
          "The university leadership, chief patrons, patrons, and advisory committee of SRMIST powering AICSSYC 2026.",
      },
    ],
  }),
});

const TEAMS = [
  "All",
  "Design",
  "Website",
  "Stalls & Battle of Chapters",
  "Hall Arrangement",
  "Sponsorship & Finance",
  "Publicity and Media",
  "Hospitality & Logistics",
  "Registration & Participation",
  "Session Management",
  "Startup Pitch",
  "Battle of Chapters",
  "Industry & Speakers",
  "Cultural",
  "Networking Dinner",
  "Heritage Visit",
];

const formatRole = (role: string) => {
  if (!role) return "";
  const trimmed = role.trim();
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
};

function LeadershipCard({ member }: { member: LeadershipMember }) {
  return (
    <div className="group relative flex flex-col justify-between rounded-3xl border border-white/[0.08] bg-[#070c09]/90 hover:bg-[#09110d]/95 p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#E2B767]/40 hover:shadow-2xl hover:shadow-[#E2B767]/10">
      <div>
        {/* Photo Container */}
        <div className="relative aspect-[4/3.8] w-full overflow-hidden rounded-2xl bg-neutral-900/80 border border-white/10 flex items-center justify-center">
          <img
            src={member.image}
            alt={member.name}
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          {/* Subtle Ambient Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070c09]/80 via-transparent to-transparent pointer-events-none" />

          {/* Tag Badge */}
          <div className="absolute top-2.5 right-2.5">
            <span className="px-2.5 py-1 rounded-md bg-[#070c09]/95 backdrop-blur-sm border border-[#E2B767]/40 text-[9px] font-mono text-[#E2B767] uppercase tracking-wider font-semibold shadow-md">
              {member.tag}
            </span>
          </div>
        </div>

        {/* Text Info */}
        <div className="pt-4 flex flex-col flex-grow">
          <h3 className="font-serif text-lg sm:text-xl font-medium text-white group-hover:text-[#E2B767] transition-colors leading-tight line-clamp-2">
            {member.name}
          </h3>
          <p className="mt-1 text-xs font-semibold normal-case text-amber-400 line-clamp-2 min-h-[1.25rem]">
            {member.role}
          </p>
          <div className="mt-1 text-xs text-white/60 leading-relaxed font-sans">
            {member.institution.split("\n").map((line, idx) => (
              <p key={idx} className={idx > 0 ? "mt-0.5 text-white/50" : ""}>
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div>
        {/* Hairline Divider */}
        <div className="my-3.5 border-t border-white/10" />

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-white/50">
          <span className="text-[11px] font-mono text-white/60">SRM Leadership</span>
          <span className="text-[10px] font-mono tracking-wider uppercase text-[#E2B767]/90 font-semibold">
            {member.tag}
          </span>
        </div>
      </div>
    </div>
  );
}

function CommitteeMemberCard({ member }: { member: CommitteeMember }) {
  return (
    <div className="group relative flex flex-col justify-between rounded-3xl border border-white/[0.08] bg-[#070c09]/90 hover:bg-[#09110d]/95 p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#E2B767]/40 hover:shadow-2xl hover:shadow-[#E2B767]/10 h-full">
      <div>
        {/* Photo Container */}
        <div className="relative aspect-[4/3.8] w-full overflow-hidden rounded-2xl bg-neutral-900/80 border border-white/10 flex items-center justify-center">
          <img
            src={member.image}
            alt={member.name}
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          {/* Subtle Ambient Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070c09]/80 via-transparent to-transparent pointer-events-none" />

          {/* Tag Badge */}
          <div className="absolute top-2.5 right-2.5">
            <span className="px-2.5 py-1 rounded-md bg-[#070c09]/95 backdrop-blur-sm border border-[#E2B767]/40 text-[9px] font-mono text-[#E2B767] uppercase tracking-wider font-semibold shadow-md">
              {member.tag}
            </span>
          </div>
        </div>

        {/* Text Info */}
        <div className="pt-4 flex flex-col flex-grow">
          <h3 className="font-serif text-lg sm:text-xl font-medium text-white group-hover:text-[#E2B767] transition-colors leading-tight line-clamp-2">
            {member.name}
          </h3>
          <p className="mt-1 text-xs font-semibold normal-case text-amber-400 line-clamp-1">
            {formatRole(member.designation)}
          </p>
          <p className="mt-1 text-xs text-white/60 leading-relaxed font-sans line-clamp-1">
            {member.department}
          </p>
        </div>
      </div>

      <div>
        {/* Hairline Divider */}
        <div className="my-3.5 border-t border-white/10" />

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-white/50">
          <span className="text-[11px] font-mono text-[#E2B767]/90 uppercase tracking-wider font-semibold">
            {member.team}
          </span>
          <span className="text-[10px] font-mono tracking-wider uppercase text-white/40">
            SRMIST
          </span>
        </div>
      </div>
    </div>
  );
}

const DESIGNATION_TIERS = [
  {
    key: "Professor",
    title: "Professors",
    subtitle: "Distinguished Academic Leadership & Senior Advisory",
    icon: Award,
    badgeColor: "text-amber-300 border-amber-400/30 bg-amber-400/10",
  },
  {
    key: "Associate Professor",
    title: "Associate Professors",
    subtitle: "Senior Faculty & Track Conveners",
    icon: GraduationCap,
    badgeColor: "text-emerald-300 border-emerald-400/30 bg-emerald-400/10",
  },
  {
    key: "Assistant Professor",
    title: "Assistant Professors",
    subtitle: "Faculty Coordinators & Operations Leads",
    icon: Users,
    badgeColor: "text-sky-300 border-sky-400/30 bg-sky-400/10",
  },
];

export function CommitteePage() {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredMembers = useMemo(() => {
    return committeeData.filter((member: CommitteeMember) => {
      const matchesTab =
        activeTab === "All" ||
        member.team.toLowerCase().includes(activeTab.toLowerCase()) ||
        (activeTab === "Stalls" && member.team.toLowerCase().includes("stall")) ||
        (activeTab === "Stalls & Battle of Chapters" &&
          (member.team.toLowerCase().includes("stall") ||
            member.team.toLowerCase().includes("chapter")));

      const matchesSearch =
        searchQuery.trim() === "" ||
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.team.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.tag.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  const tieredGroups = useMemo(() => {
    return DESIGNATION_TIERS.map((tier) => ({
      ...tier,
      members: filteredMembers.filter(
        (member: CommitteeMember) => member.designation === tier.key
      ),
    })).filter((group) => group.members.length > 0);
  }, [filteredMembers]);

  return (
    <div className="min-h-screen bg-[#060D0A] text-ivory flex flex-col selection:bg-[#E2B767] selection:text-neutral-950 relative overflow-hidden">
      <BackgroundFog />
      <SiteNav />

      {/* Decorative ambient glowing backdrops */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[400px] sm:w-[800px] h-[400px] sm:h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none transform-gpu will-change-transform" />
      <div className="absolute top-[40%] -right-40 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#E2B767]/5 rounded-full blur-[160px] pointer-events-none transform-gpu will-change-transform" />

      <main className="flex-1 pt-32 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full glass-pill border border-[#E2B767]/30 text-[11px] sm:text-xs font-mono text-[#E2B767] uppercase tracking-widest mb-4 shadow-[0_0_20px_rgba(226,183,103,0.15)]"
          >
            <Sparkles size={13} />
            <span>SRMIST KATTANKULATHUR • AICSSYC 2026</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-serif font-medium text-white tracking-tight text-balance leading-tight"
          >
            Advisory{" "}
            <span className="font-editorial italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-[#E2B767] to-amber-500">
              Committee
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-sm sm:text-base md:text-lg text-white/60 leading-relaxed font-sans max-w-2xl mx-auto"
          >
            The distinguished university leadership, patrons, deans, department chairs, and congress convenor guiding AICSSYC 2026.
          </motion.p>
        </div>

        {/* ========================================================================= */}
        {/* LEADERSHIP TIERS (5 Official Hierarchy Tiers)                             */}
        {/* ========================================================================= */}
        <div className="space-y-16 mb-20">
          {/* 1. Chief Patrons Tier */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-white/10">
              <Crown className="w-5 h-5 text-[#E2B767]" />
              <h2 className="text-xl sm:text-2xl font-serif text-white font-medium">
                Chief Patrons
              </h2>
              <span className="text-xs font-mono text-white/40 uppercase tracking-wider ml-auto">
                University Leadership
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto gap-5 sm:gap-6">
              {leadershipData.chiefPatrons.map((member) => (
                <LeadershipCard key={member.id} member={member} />
              ))}
            </div>
          </motion.section>

          {/* 2. Patrons Tier */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-white/10">
              <Shield className="w-5 h-5 text-[#E2B767]" />
              <h2 className="text-xl sm:text-2xl font-serif text-white font-medium">
                Patrons
              </h2>
              <span className="text-xs font-mono text-white/40 uppercase tracking-wider ml-auto">
                Executive Leadership
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 max-w-4xl mx-auto gap-5 sm:gap-6">
              {leadershipData.patrons.map((member) => (
                <LeadershipCard key={member.id} member={member} />
              ))}
            </div>
          </motion.section>

          {/* 3. Dean (CET) Tier */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-white/10">
              <GraduationCap className="w-5 h-5 text-[#E2B767]" />
              <h2 className="text-xl sm:text-2xl font-serif text-white font-medium">
                Dean (CET)
              </h2>
              <span className="text-xs font-mono text-white/40 uppercase tracking-wider ml-auto">
                College of Engineering &amp; Technology
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 max-w-4xl mx-auto gap-5 sm:gap-6">
              {leadershipData.deanCet.map((member) => (
                <LeadershipCard key={member.id} member={member} />
              ))}
            </div>
          </motion.section>

          {/* 4. School & Department Leadership Tier */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-white/10">
              <Award className="w-5 h-5 text-[#E2B767]" />
              <h2 className="text-xl sm:text-2xl font-serif text-white font-medium">
                School &amp; Department Leadership
              </h2>
              <span className="text-xs font-mono text-white/40 uppercase tracking-wider ml-auto">
                School of Computing
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto gap-5 sm:gap-6">
              {leadershipData.schoolDepartmentLeadership.map((member) => (
                <LeadershipCard key={member.id} member={member} />
              ))}
            </div>
          </motion.section>

          {/* 5. AICSSYC 2026 Convenor & Advisor Tier */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-white/10">
              <Sparkles className="w-5 h-5 text-[#E2B767]" />
              <h2 className="text-xl sm:text-2xl font-serif text-white font-medium">
                AICSSYC 2026 Convenor &amp; Advisor
              </h2>
              <span className="text-xs font-mono text-white/40 uppercase tracking-wider ml-auto">
                Congress Leadership &amp; Student Branch Advisor
              </span>
            </div>

            <div className="grid grid-cols-1 max-w-sm mx-auto gap-5 sm:gap-6">
              <LeadershipCard member={leadershipData.convenorAdvisor} />
            </div>
          </motion.section>
        </div>

        {/* ========================================================================= */}
        {/* DEPARTMENTAL ORGANIZING TEAMS (43 Faculty Members)                        */}
        {/* ========================================================================= */}
        <div className="pt-8 border-t border-white/10">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono font-semibold uppercase tracking-widest mb-3">
              <Users size={12} />
              <span>DEPARTMENT OF COMPUTING TECHNOLOGIES</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-medium text-white tracking-tight">
              Organizing Teams
            </h2>
            <p className="mt-2 text-sm text-white/60">
              Faculty committee members driving the specialized event tracks and operations.
            </p>

            {/* Search Bar */}
            <div className="mt-6 max-w-md mx-auto relative">
              <div className="relative flex items-center">
                <Search className="absolute left-4 w-4 h-4 text-white/40 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search faculty by name, team, or designation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white/[0.05] border border-white/10 text-white placeholder-white/40 text-xs sm:text-sm focus:outline-none focus:border-[#E2B767]/60 focus:bg-white/[0.08] transition-all backdrop-blur-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 text-xs text-white/50 hover:text-white"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none px-1">
            {TEAMS.map((team) => {
              const isSelected = activeTab === team;
              return (
                <button
                  key={team}
                  onClick={() => setActiveTab(team)}
                  className={`px-4 py-2 rounded-full text-xs font-mono whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-[#E2B767] text-[#060D0A] font-semibold shadow-lg shadow-[#E2B767]/25 border border-[#E2B767]"
                      : "bg-white/[0.04] text-white/70 border border-white/10 hover:border-[#E2B767]/40 hover:text-white"
                  }`}
                >
                  {team === "All" && <Layers size={13} />}
                  <span>{team}</span>
                </button>
              );
            })}
          </div>

          {/* Members Count Summary */}
          <div className="mb-6 flex items-center justify-between text-xs text-white/50 font-mono border-b border-white/10 pb-3">
            <span className="inline-flex items-center gap-1.5">
              <span>SHOWING</span>
              <strong className="text-[#E2B767]">{filteredMembers.length}</strong>
              <span>FACULTY COMMITTEE MEMBERS</span>
            </span>
            {activeTab !== "All" && (
              <span className="text-white/60 inline-flex items-center gap-1.5">
                <span>Filtered by:</span>
                <span className="text-white font-medium">{activeTab}</span>
              </span>
            )}
          </div>

          {/* Member Grid by Designation Tiers */}
          <div className="space-y-16">
            <AnimatePresence mode="popLayout">
              {tieredGroups.map((group) => {
                const TierIcon = group.icon;
                return (
                  <motion.section
                    key={group.key}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6 content-auto"
                    style={{
                      contain: "content",
                      contentVisibility: "auto",
                      containIntrinsicSize: "1px 800px",
                    }}
                  >
                    {/* Tier Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 border-b border-white/10">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl border ${group.badgeColor}`}>
                          <TierIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2.5">
                            <h3 className="text-xl sm:text-2xl font-serif text-white font-medium">
                              {group.title}
                            </h3>
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold border ${group.badgeColor}`}>
                              {`${group.members.length} ${group.members.length === 1 ? "Member" : "Members"}`}
                            </span>
                          </div>
                          <p className="text-xs text-white/50 font-sans mt-0.5">
                            {group.subtitle}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Member Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
                      {group.members.map((member: CommitteeMember, index: number) => (
                        <motion.div
                          key={member.id}
                          layout
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.25) }}
                        >
                          <CommitteeMemberCard member={member} />
                        </motion.div>
                      ))}
                    </div>
                  </motion.section>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Empty Search State */}
          {filteredMembers.length === 0 && (
            <div className="text-center py-16 px-4 rounded-3xl border border-white/10 bg-white/[0.02]">
              <p className="text-base text-white/70 font-serif">No committee members found matching your criteria.</p>
              <button
                onClick={() => {
                  setActiveTab("All");
                  setSearchQuery("");
                }}
                className="mt-4 px-4 py-2 rounded-full bg-[#E2B767] text-[#060D0A] text-xs font-semibold"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default CommitteePage;
