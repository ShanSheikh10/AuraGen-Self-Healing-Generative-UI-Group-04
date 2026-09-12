"use client";

import { useState, useCallback } from "react";
import {
  LayoutDashboard,
  BarChart3,
  CheckSquare,
  Calendar,
  MessageSquare,
  FolderOpen,
  Users,
  Settings,
  Home,
  Zap,
  ListTodo,
  Bell,
  Target,
  FileText,
  Image,
  FileSpreadsheet,
  FileCode,
  RotateCcw,
} from "lucide-react";
import Sidebar, { NavItem } from "@/app/components/dashboard/Sidebar";
import Topbar from "@/app/components/dashboard/Topbar";
import StatCard from "@/app/components/dashboard/StatCard";
import TaskChart from "@/app/components/dashboard/TaskChart";
import MiniCalendar from "@/app/components/dashboard/MiniCalendar";
import QuickActions from "@/app/components/dashboard/QuickActions";
import RecentFiles from "@/app/components/dashboard/RecentFiles";
import TeamActivity from "@/app/components/dashboard/TeamActivity";
import SystemStatus from "@/app/components/dashboard/SystemStatus";
import CognitiveLoadAlert from "@/app/components/dashboard/CognitiveLoadAlert";
import LoadingCard from "@/app/components/dashboard/LoadingCard";
import SimplifiedCards from "@/app/components/dashboard/SimplifiedCards";
import ChatPanel from "@/app/components/dashboard/ChatPanel";
import type { FileItem } from "@/app/components/dashboard/RecentFiles";
import type { ActivityItem } from "@/app/components/dashboard/TeamActivity";

type DashboardState = "normal" | "detecting" | "simplified" | "chat";

/* ---------- Placeholder Data Arrays ---------- */
const recentFilesData: FileItem[] = [
  {
    icon: FileText,
    name: "Q3 Report.pdf",
    date: "Sep 10, 2026",
    size: "2.4 MB",
    color: "text-danger",
    bg: "bg-red-50",
  },
  {
    icon: Image,
    name: "UI Mockups.fig",
    date: "Sep 9, 2026",
    size: "18.2 MB",
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
  {
    icon: FileSpreadsheet,
    name: "Budget_2026.xlsx",
    date: "Sep 8, 2026",
    size: "1.1 MB",
    color: "text-success",
    bg: "bg-green-50",
  },
  {
    icon: FileCode,
    name: "api_schema.json",
    date: "Sep 7, 2026",
    size: "45 KB",
    color: "text-info",
    bg: "bg-blue-50",
  },
];

const teamActivityData: ActivityItem[] = [
  {
    initials: "AK",
    color: "from-rose-400 to-pink-500",
    name: "Ananya K.",
    action: "completed task",
    target: "Design Review",
    time: "2m ago",
  },
  {
    initials: "RJ",
    color: "from-blue-400 to-indigo-500",
    name: "Rohan J.",
    action: "uploaded",
    target: "API Docs v2.pdf",
    time: "15m ago",
  },
  {
    initials: "MP",
    color: "from-emerald-400 to-teal-500",
    name: "Meera P.",
    action: "commented on",
    target: "Sprint Planning",
    time: "1h ago",
  },
  {
    initials: "VN",
    color: "from-amber-400 to-orange-500",
    name: "Vikram N.",
    action: "joined meeting",
    target: "Standup Call",
    time: "2h ago",
  },
];

/* ---------- Stat Cards ---------- */
const statCards = [
  {
    icon: CheckSquare,
    title: "Pending Tasks",
    value: "12",
    trend: { value: "+2.5%", direction: "up" as const },
    color: "indigo" as const,
  },
  {
    icon: Bell,
    title: "Notifications",
    value: "8",
    trend: { value: "-12%", direction: "down" as const },
    color: "amber" as const,
  },
  {
    icon: MessageSquare,
    title: "New Messages",
    value: "24",
    trend: { value: "+18%", direction: "up" as const },
    color: "green" as const,
  },
  {
    icon: Target,
    title: "Goal Progress",
    value: "78%",
    trend: { value: "+5.2%", direction: "up" as const },
    color: "rose" as const,
  },
];

export default function DashboardPage() {
  const [state, setState] = useState<DashboardState>("normal");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [messageCount, setMessageCount] = useState(3);

  /* ---------- Nav Definitions (reactive badge) ---------- */
  const fullNavItems: NavItem[] = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
    { icon: CheckSquare, label: "Tasks", href: "/dashboard/tasks" },
    { icon: Calendar, label: "Calendar", href: "/dashboard/calendar" },
    {
      icon: MessageSquare,
      label: "Messages",
      href: "/dashboard/messages",
      badge: messageCount,
    },
    { icon: FolderOpen, label: "Files", href: "/dashboard/files" },
    { icon: Users, label: "Team", href: "/dashboard/team" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  ];

  const simplifiedNavItems: NavItem[] = [
    { icon: Home, label: "Home", href: "/dashboard" },
    { icon: ListTodo, label: "My Tasks", href: "/dashboard/tasks" },
    { icon: Calendar, label: "Calendar", href: "/dashboard/calendar" },
    { icon: FolderOpen, label: "Files", href: "/dashboard/files" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  ];

  const navItems =
    state === "normal" || state === "detecting"
      ? fullNavItems
      : simplifiedNavItems;

  /* ---------- State Transitions ---------- */
  const simulateCognitiveLoad = useCallback(() => {
    setState("detecting");

    // After 2 seconds, transition to simplified
    setTimeout(() => {
      setState("simplified");
    }, 2000);
  }, []);

  const openChat = useCallback(() => {
    setState("chat");
  }, []);

  const resetToNormal = useCallback(() => {
    setState("normal");
  }, []);

  /* ---------- Greeting ---------- */
  const getGreeting = () => {
    if (state === "simplified" || state === "chat") {
      return "Good to see you, Pratham!";
    }
    return "Welcome back, Pratham! 👋";
  };

  const getSubtitle = () => {
    if (state === "simplified" || state === "chat") {
      return "Here's the essentials.";
    }
    return "Here's what's happening with your projects today.";
  };

  return (
    <div className="flex h-screen bg-lavender">
      {/* Sidebar */}
      <Sidebar
        navItems={navItems}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-7xl p-6 lg:p-8">
          {/* Topbar */}
          <Topbar
            greeting={getGreeting()}
            subtitle={getSubtitle()}
            onMenuToggle={() => setMobileOpen(true)}
            notificationCount={state === "normal" ? 5 : 0}
          />

          {/* Content area */}
          <div className="mt-8">
            {/* ===== NORMAL DASHBOARD ===== */}
            {state === "normal" && (
              <div className="space-y-6 animate-fade-in">
                {/* Stat Cards Row */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {statCards.map((card, i) => (
                    <StatCard
                      key={card.title}
                      {...card}
                      delay={`${i * 0.1}s`}
                    />
                  ))}
                </div>

                {/* Middle Row: Chart, Calendar, Quick Actions */}
                <div className="grid gap-6 lg:grid-cols-3">
                  <div className="lg:col-span-1">
                    <TaskChart />
                  </div>
                  <div className="lg:col-span-1">
                    <MiniCalendar />
                  </div>
                  <div className="lg:col-span-1">
                    <QuickActions />
                  </div>
                </div>

                {/* Bottom Row: Files, Activity, Status */}
                <div className="grid gap-6 lg:grid-cols-3">
                  <div className="lg:col-span-1">
                    <RecentFiles files={recentFilesData} />
                  </div>
                  <div className="lg:col-span-1">
                    <TeamActivity activities={teamActivityData} />
                  </div>
                  <div className="lg:col-span-1">
                    <SystemStatus />
                  </div>
                </div>
              </div>
            )}

            {/* ===== DETECTING STATE ===== */}
            {state === "detecting" && (
              <div className="space-y-6">
                <CognitiveLoadAlert />
                <LoadingCard />
              </div>
            )}

            {/* ===== SIMPLIFIED STATE ===== */}
            {state === "simplified" && (
              <SimplifiedCards onOpenChat={openChat} />
            )}

            {/* ===== CHAT STATE ===== */}
            {state === "chat" && <ChatPanel />}
          </div>

          {/* Floating action buttons */}
          <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-30">
            {state === "normal" && (
              <button
                onClick={simulateCognitiveLoad}
                className="flex items-center gap-2 rounded-2xl gradient-bg px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:shadow-xl hover:-translate-y-0.5"
              >
                <Zap className="h-4 w-4" />
                Simulate Cognitive Load
              </button>
            )}
            {(state === "simplified" || state === "chat") && (
              <button
                onClick={resetToNormal}
                className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
              >
                <RotateCcw className="h-4 w-4" />
                Restore Full Dashboard
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
