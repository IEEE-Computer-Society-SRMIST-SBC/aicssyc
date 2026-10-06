import React, { useState, useMemo, memo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Sparkles, Search, Layers, Crown, Shield, GraduationCap, Users, Award, UserCheck } from "lucide-react";
import { SiteNav } from "@/components/site/SiteNav";
import { Footer } from "@/components/site/Footer";
import { BackgroundFog } from "@/components/site/BackgroundFog";
import committeeData, { CommitteeMember } from "@/data/committee";
import leadershipData, { LeadershipMember } from "@/data/leadership";
import studentCommitteeData, { StudentLeader, StudentOrganiser } from "@/data/studentCommittee";

export const Route = createFileRoute("/committee")({
  component: CommitteePage,
  head: () => ({
    meta: [
      {
        title: "Organizing & Advisory Committee — AICSSYC 2026",
      },
      {
        name: "description",
        content:
          "The university leadership, chief patrons, patrons, faculty advisory, and student organizing committee powering AICSSYC 2026 at SRMIST.",
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

const formatRole = (role?: string) => {
  if (!role) return "";
  const trimmed = role.trim();
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
};

const LeadershipCard = memo(function LeadershipCard({
  member,
  isPriority = false,
}: {
  member: LeadershipMember;
  isPriority?: boolean;
}) {
  if (!member) return null;
  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#070c09]/90 hover:bg-[#09110d]/95 p-3 sm:p-3.5 transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:border-[#E2B767]/40 hover:shadow-xl hover:shadow-[#E2B767]/10 h-full">
      <div>
        {/* Photo Container */}
        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-neutral-900/80 border border-white/10 flex items-center justify-center">
          <img
            src={member.image || "/committee/placeholder.jpg"}
            alt={member.name || "Leadership"}
            className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
            loading={isPriority ? "eager" : "lazy"}
            decoding="async"
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src !== "/committee/placeholder.jpg") {
                target.src = "/committee/placeholder.jpg";
              }
            }}
          />

          {/* Subtle Ambient Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070c09]/80 via-transparent to-transparent pointer-events-none" />

          {/* Tag Badge */}
          {member.tag && (
            <div className="absolute top-2 right-2">
              <span className="px-2 py-0.5 rounded-md bg-[#070c09]/95 border border-[#E2B767]/40 text-[8px] font-mono text-[#E2B767] uppercase tracking-wider font-semibold shadow-md">
                {member.tag}
              </span>
            </div>
          )}
        </div>

        {/* Text Info */}
        <div className="pt-3 flex flex-col flex-grow">
          <h3 className="font-serif text-sm sm:text-base font-medium text-white group-hover:text-[#E2B767] transition-colors leading-tight line-clamp-2">
            {member.name}
          </h3>
          <p className="mt-1 text-xs font-semibold normal-case text-amber-400 line-clamp-2 min-h-[1.25rem]">
            {member.role}
          </p>
          <div className="mt-1 text-[11px] text-white/60 leading-relaxed font-sans line-clamp-2">
            {(member.institution || "").split("\n").map((line, idx) => (
              <p key={idx} className={idx > 0 ? "mt-0.5 text-white/50" : ""}>
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-2">
        {/* Hairline Divider */}
        <div className="my-2 border-t border-white/10" />

        {/* Footer */}
        <div className="flex items-center justify-between text-[10px] text-white/50">
          <span className="font-mono text-white/60">SRM Leadership</span>
          <span className="font-mono tracking-wider uppercase text-[#E2B767]/90 font-semibold">
            {member.tag}
          </span>
        </div>
      </div>
    </div>
  );
});

const CommitteeMemberCard = memo(function CommitteeMemberCard({ member }: { member: CommitteeMember }) {
  if (!member) return null;
  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#070c09]/85 hover:bg-[#09110d]/95 p-3 sm:p-3.5 transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:border-[#E2B767]/40 hover:shadow-lg hover:shadow-[#E2B767]/10 h-full">
      <div>
        {/* Photo Container */}
        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-neutral-900/80 border border-white/10 flex items-center justify-center">
          <img
            src={member.image || "/committee/placeholder.jpg"}
            alt={member.name || "Committee Member"}
            className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src !== "/committee/placeholder.jpg") {
                target.src = "/committee/placeholder.jpg";
              }
            }}
          />

          {/* Subtle Ambient Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070c09]/75 via-transparent to-transparent pointer-events-none" />

          {/* Tag Badge */}
          {member.tag && (
            <div className="absolute top-2 right-2">
              <span className="px-2 py-0.5 rounded-md bg-[#070c09]/95 border border-[#E2B767]/40 text-[8px] font-mono text-[#E2B767] uppercase tracking-wider font-semibold shadow-md">
                {member.tag}
              </span>
            </div>
          )}
        </div>

        {/* Text Info */}
        <div className="pt-3 flex flex-col flex-grow">
          <h4 className="font-serif text-sm sm:text-base font-medium text-white group-hover:text-[#E2B767] transition-colors leading-tight line-clamp-1">
            {member.name}
          </h4>
          <p className="mt-0.5 text-[11px] sm:text-xs font-mono text-amber-400/90 font-medium line-clamp-1">
            {formatRole(member.designation)}
          </p>
          <p className="mt-0.5 text-[11px] text-white/50 font-sans line-clamp-1">
            {member.department}
          </p>
        </div>
      </div>

      <div className="pt-2">
        <div className="border-t border-white/[0.06] pt-2 flex items-center justify-between text-[10px] font-mono text-white/40">
          <span className="text-[#E2B767]/80 truncate max-w-[110px]">{member.team}</span>
          <span>SRMIST</span>
        </div>
      </div>
    </div>
  );
});

const StudentLeadershipCard = memo(function StudentLeadershipCard({ member }: { member: StudentLeader }) {
  if (!member) return null;

  const categoryBadgeStyles: Record<string, { border: string; text: string; bg: string }> = {
    CHAIR: {
      border: "border-amber-400/50",
      text: "text-amber-300",
      bg: "bg-amber-400/10",
    },
    STUDENT_ADVISOR: {
      border: "border-sky-400/50",
      text: "text-sky-300",
      bg: "bg-sky-400/10",
    },
    "VICE-CHAIR": {
      border: "border-emerald-400/50",
      text: "text-emerald-300",
      bg: "bg-emerald-400/10",
    },
    CREATIVE_HEAD: {
      border: "border-purple-400/50",
      text: "text-purple-300",
      bg: "bg-purple-400/10",
    },
  };

  const badgeStyle = categoryBadgeStyles[member.category] || {
    border: "border-[#E2B767]/40",
    text: "text-[#E2B767]",
    bg: "bg-[#E2B767]/10",
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#070c09]/90 hover:bg-[#09110d]/95 p-3 sm:p-3.5 transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:border-[#E2B767]/40 hover:shadow-xl hover:shadow-[#E2B767]/10 h-full">
      <div>
        {/* Photo Container */}
        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-neutral-900/80 border border-white/10 flex items-center justify-center">
          <img
            src={member.image || "/committee/placeholder.jpg"}
            alt={member.name}
            className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src !== "/committee/placeholder.jpg") {
                target.src = "/committee/placeholder.jpg";
              }
            }}
          />

          {/* Subtle Ambient Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070c09]/80 via-transparent to-transparent pointer-events-none" />

          {/* Tag Badge */}
          <div className="absolute top-2 right-2">
            <span
              className={`px-2 py-0.5 rounded-md border text-[8px] font-mono uppercase tracking-wider font-semibold shadow-md ${badgeStyle.border} ${badgeStyle.text} ${badgeStyle.bg}`}
            >
              {member.role}
            </span>
          </div>
        </div>

        {/* Text Info */}
        <div className="pt-3 flex flex-col flex-grow">
          <h3 className="font-serif text-sm sm:text-base font-medium text-white group-hover:text-[#E2B767] transition-colors leading-tight line-clamp-1">
            {member.name}
          </h3>
          <p className="mt-1 text-xs font-semibold normal-case text-amber-400 line-clamp-1">
            {member.role}
          </p>
          <p className="mt-0.5 text-[11px] text-white/60 leading-relaxed font-sans">
            Student Leadership • AICSSYC 2026
          </p>
        </div>
      </div>

      <div className="pt-2">
        {/* Hairline Divider */}
        <div className="my-2 border-t border-white/10" />

        {/* Footer */}
        <div className="flex items-center justify-between text-[10px] text-white/50">
          <span className="font-mono text-white/60">IEEE CS SB SRMIST</span>
          <span className="font-mono tracking-wider uppercase text-[#E2B767]/90 font-semibold">
            {member.role}
          </span>
        </div>
      </div>
    </div>
  );
});

const StudentOrganiserCard = memo(function StudentOrganiserCard({ member }: { member: StudentOrganiser }) {
  if (!member) return null;
  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#070c09]/85 hover:bg-[#09110d]/95 p-3 sm:p-3.5 transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:border-[#E2B767]/40 hover:shadow-lg hover:shadow-[#E2B767]/10 h-full">
      <div>
        {/* Photo Container */}
        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-neutral-900/80 border border-white/10 flex items-center justify-center">
          <img
            src={member.image || "/committee/placeholder.jpg"}
            alt={member.name}
            className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src !== "/committee/placeholder.jpg") {
                target.src = "/committee/placeholder.jpg";
              }
            }}
          />

          {/* Subtle Ambient Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070c09]/75 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Text Info */}
        <div className="pt-3 flex flex-col flex-grow">
          <h4 className="font-serif text-sm sm:text-base font-medium text-white group-hover:text-[#E2B767] transition-colors leading-tight line-clamp-1">
            {member.name}
          </h4>
          <p className="mt-0.5 text-[11px] sm:text-xs font-mono text-amber-400/90 font-medium">
            {member.role}
          </p>
        </div>
      </div>

      <div className="pt-2">
        <div className="border-t border-white/[0.06] pt-2 flex items-center justify-between text-[10px] font-mono text-white/40">
          <span>SRMIST</span>
          <span className="text-[#E2B767]/70">AICSSYC &apos;26</span>
        </div>
      </div>
    </div>
  );
});

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

function CommitteePage() {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [studentSearchQuery, setStudentSearchQuery] = useState<string>("");

  const filteredFacultyMembers = useMemo(() => {
    if (!Array.isArray(committeeData)) return [];
    const q = searchQuery.trim().toLowerCase();
    return committeeData.filter((member: CommitteeMember) => {
      if (!member) return false;
      const team = member.team || "";
      const matchesTab =
        activeTab === "All" ||
        team.toLowerCase().includes(activeTab.toLowerCase()) ||
        (activeTab === "Stalls" && team.toLowerCase().includes("stall")) ||
        (activeTab === "Stalls & Battle of Chapters" &&
          (team.toLowerCase().includes("stall") ||
            team.toLowerCase().includes("chapter")));

      if (!matchesTab) return false;
      if (!q) return true;

      return (
        (member.name || "").toLowerCase().includes(q) ||
        (member.designation || "").toLowerCase().includes(q) ||
        team.toLowerCase().includes(q) ||
        (member.tag || "").toLowerCase().includes(q)
      );
    });
  }, [activeTab, searchQuery]);

  const tieredGroups = useMemo(() => {
    if (!Array.isArray(filteredFacultyMembers)) return [];
    return DESIGNATION_TIERS.map((tier) => ({
      ...tier,
      members: filteredFacultyMembers.filter(
        (member: CommitteeMember) => member?.designation === tier.key
      ),
    })).filter((group) => group.members.length > 0);
  }, [filteredFacultyMembers]);

  const filteredStudentOrganisers = useMemo(() => {
    const organisers = studentCommitteeData?.organisers || [];
    const q = studentSearchQuery.trim().toLowerCase();
    if (!q) return organisers;
    return organisers.filter((org) => org.name.toLowerCase().includes(q));
  }, [studentSearchQuery]);

  return (
    <div className="min-h-screen bg-[#060D0A] text-ivory flex flex-col selection:bg-[#E2B767] selection:text-neutral-950 relative overflow-hidden">
      <BackgroundFog />
      <SiteNav />

      {/* Lightweight GPU-accelerated decorative ambient glows */}
      <div className="fixed inset-0 pointer-events-none -z-40 overflow-hidden">
        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.08)_0%,_transparent_70%)]" />
        <div className="absolute top-[40%] -right-20 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,_rgba(226,183,103,0.05)_0%,_transparent_70%)]" />
      </div>

      <main className="flex-1 pt-32 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full border border-[#E2B767]/30 bg-[#070c09]/80 text-[11px] sm:text-xs font-mono text-[#E2B767] uppercase tracking-widest mb-4 shadow-[0_0_20px_rgba(226,183,103,0.15)]"
          >
            <Sparkles size={13} />
            <span>SRMIST KATTANKULATHUR • AICSSYC 2026</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-serif font-medium text-white tracking-tight text-balance leading-tight"
          >
            Organizing &amp; Advisory{" "}
            <span className="font-editorial italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-[#E2B767] to-amber-500">
              Committee
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-4 text-sm sm:text-base md:text-lg text-white/60 leading-relaxed font-sans max-w-2xl mx-auto"
          >
            The distinguished university leadership, patrons, deans, department chairs, faculty convenors, and student organizing committee driving AICSSYC 2026.
          </motion.p>
        </div>

        {/* ========================================================================= */}
        {/* LEADERSHIP TIERS (5 Official Hierarchy Tiers)                             */}
        {/* ========================================================================= */}
        <div className="space-y-16 mb-20">
          {/* 1. Chief Patrons Tier */}
          <section>
            <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-white/10">
              <Crown className="w-5 h-5 text-[#E2B767]" />
              <h2 className="text-xl sm:text-2xl font-serif text-white font-medium">
                Chief Patrons
              </h2>
              <span className="text-xs font-mono text-white/40 uppercase tracking-wider ml-auto">
                University Leadership
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-4xl mx-auto gap-4 sm:gap-5">
              {leadershipData?.chiefPatrons?.map((member) => (
                <LeadershipCard key={member.id} member={member} isPriority={true} />
              )) ?? null}
            </div>
          </section>

          {/* 2. Patrons Tier */}
          <section>
            <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-white/10">
              <Shield className="w-5 h-5 text-[#E2B767]" />
              <h2 className="text-xl sm:text-2xl font-serif text-white font-medium">
                Patrons
              </h2>
              <span className="text-xs font-mono text-white/40 uppercase tracking-wider ml-auto">
                Executive Leadership
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto gap-4 sm:gap-5">
              {leadershipData?.patrons?.map((member) => (
                <LeadershipCard key={member.id} member={member} />
              )) ?? null}
            </div>
          </section>

          {/* 3. Dean (CET) Tier */}
          <section>
            <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-white/10">
              <GraduationCap className="w-5 h-5 text-[#E2B767]" />
              <h2 className="text-xl sm:text-2xl font-serif text-white font-medium">
                Dean (CET)
              </h2>
              <span className="text-xs font-mono text-white/40 uppercase tracking-wider ml-auto">
                College of Engineering &amp; Technology
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto gap-4 sm:gap-5">
              {leadershipData?.deanCet?.map((member) => (
                <LeadershipCard key={member.id} member={member} />
              )) ?? null}
            </div>
          </section>

          {/* 4. School & Department Leadership Tier */}
          <section>
            <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-white/10">
              <Award className="w-5 h-5 text-[#E2B767]" />
              <h2 className="text-xl sm:text-2xl font-serif text-white font-medium">
                School &amp; Department Leadership
              </h2>
              <span className="text-xs font-mono text-white/40 uppercase tracking-wider ml-auto">
                School of Computing
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-4xl mx-auto gap-4 sm:gap-5">
              {leadershipData?.schoolDepartmentLeadership?.map((member) => (
                <LeadershipCard key={member.id} member={member} />
              )) ?? null}
            </div>
          </section>

          {/* 5. AICSSYC 2026 Convenor & Advisor Tier */}
          <section>
            <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-white/10">
              <Sparkles className="w-5 h-5 text-[#E2B767]" />
              <h2 className="text-xl sm:text-2xl font-serif text-white font-medium">
                AICSSYC 2026 Convenor &amp; Advisor
              </h2>
              <span className="text-xs font-mono text-white/40 uppercase tracking-wider ml-auto">
                Congress Leadership &amp; Student Branch Advisor
              </span>
            </div>

            <div className="grid grid-cols-1 max-w-xs mx-auto gap-4">
              {leadershipData?.convenorAdvisor ? (
                <LeadershipCard member={leadershipData.convenorAdvisor} />
              ) : null}
            </div>
          </section>
        </div>

        {/* ========================================================================= */}
        {/* DEPARTMENTAL ORGANIZING TEAMS (Faculty Members)                           */}
        {/* ========================================================================= */}
        <div className="pt-8 border-t border-white/10 mb-20">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono font-semibold uppercase tracking-widest mb-3">
              <Users size={12} />
              <span>DEPARTMENT OF COMPUTING TECHNOLOGIES</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-medium text-white tracking-tight">
              Faculty Organizing Teams
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
                  className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white/[0.05] border border-white/10 text-white placeholder-white/40 text-xs sm:text-sm focus:outline-none focus:border-[#E2B767]/60 focus:bg-white/[0.08] transition-colors"
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
                  className={`px-4 py-2 rounded-full text-xs font-mono whitespace-nowrap transition-colors duration-150 flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-[#E2B767] text-[#060D0A] font-semibold shadow-md shadow-[#E2B767]/20 border border-[#E2B767]"
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
              <strong className="text-[#E2B767]">{filteredFacultyMembers.length}</strong>
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
            {tieredGroups.map((group) => {
              const TierIcon = group.icon;
              return (
                <section key={group.key} className="space-y-6">
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
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5">
                    {group.members?.map((member: CommitteeMember) => (
                      <CommitteeMemberCard key={member.id} member={member} />
                    )) ?? null}
                  </div>
                </section>
              );
            })}
          </div>

          {/* Empty Search State */}
          {(filteredFacultyMembers?.length ?? 0) === 0 && (
            <div className="text-center py-16 px-4 rounded-3xl border border-white/10 bg-white/[0.02]">
              <p className="text-base text-white/70 font-serif">No faculty committee members found matching your criteria.</p>
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

        {/* ========================================================================= */}
        {/* STUDENT ORGANISING COMMITTEE SECTION                                      */}
        {/* ========================================================================= */}
        <div className="pt-12 border-t border-white/10 space-y-16">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-mono font-semibold uppercase tracking-widest mb-3 shadow-[0_0_15px_rgba(226,183,103,0.1)]">
              <UserCheck size={13} />
              <span>IEEE SRM STUDENT BRANCH</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-medium text-white tracking-tight">
              Student Organising{" "}
              <span className="font-editorial italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-[#E2B767] to-amber-500">
                Committee
              </span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-white/60 font-sans max-w-2xl mx-auto">
              The dedicated student executive leadership and organizing team orchestrating events, logistics, creative operations, and participant experiences for AICSSYC 2026.
            </p>
          </div>

          {/* 1. Student Leadership Tier */}
          <section>
            <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-white/10">
              <Crown className="w-5 h-5 text-[#E2B767]" />
              <h3 className="text-xl sm:text-2xl font-serif text-white font-medium">
                Student Leadership
              </h3>
              <span className="text-xs font-mono text-white/40 uppercase tracking-wider ml-auto">
                Congress Advisory &amp; Lead Organizer • IEEE CS SB SRMIST
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto gap-4 sm:gap-6">
              {studentCommitteeData?.leadership ? (
                studentCommitteeData.leadership.map((member) => (
                  <div key={member.name} className="w-full">
                    <StudentLeadershipCard member={member} />
                  </div>
                ))
              ) : (
                <>
                  {studentCommitteeData?.studentAdvisor ? (
                    <div className="w-full">
                      <StudentLeadershipCard member={studentCommitteeData.studentAdvisor} />
                    </div>
                  ) : null}
                  {studentCommitteeData?.chair ? (
                    <div className="w-full">
                      <StudentLeadershipCard member={studentCommitteeData.chair} />
                    </div>
                  ) : null}
                </>
              )}
            </div>
          </section>

          {/* 3. Student Organisers Tier */}
          <section className="pt-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <Users className="w-5 h-5 text-[#E2B767]" />
                <h3 className="text-xl sm:text-2xl font-serif text-white font-medium">
                  Student Organisers
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold border border-[#E2B767]/30 text-[#E2B767] bg-[#E2B767]/10">
                  {studentCommitteeData?.organisers?.length || 35} Members
                </span>
              </div>

              {/* Quick Search for Student Organisers */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 w-3.5 h-3.5 text-white/40 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search organiser..."
                  value={studentSearchQuery}
                  onChange={(e) => setStudentSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-white placeholder-white/40 text-xs focus:outline-none focus:border-[#E2B767]/60 focus:bg-white/[0.08] transition-colors"
                />
                {studentSearchQuery && (
                  <button
                    onClick={() => setStudentSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-white/50 hover:text-white"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Organisers Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5">
              {filteredStudentOrganisers.map((org) => (
                <StudentOrganiserCard key={org.name} member={org} />
              ))}
            </div>

            {/* Empty Search State */}
            {filteredStudentOrganisers.length === 0 && (
              <div className="text-center py-12 px-4 rounded-3xl border border-white/10 bg-white/[0.02]">
                <p className="text-sm text-white/70 font-serif">No student organisers found matching &ldquo;{studentSearchQuery}&rdquo;.</p>
                <button
                  onClick={() => setStudentSearchQuery("")}
                  className="mt-3 px-3.5 py-1.5 rounded-full bg-[#E2B767] text-[#060D0A] text-xs font-semibold"
                >
                  Clear Search
                </button>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default CommitteePage;
