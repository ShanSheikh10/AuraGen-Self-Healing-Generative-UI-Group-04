"use client";

import {
  CheckSquare,
  Calendar,
  FolderOpen,
  Sparkles,
  MessageCircle,
} from "lucide-react";

interface SimplifiedCardsProps {
  onOpenChat: () => void;
}

const cards = [
  {
    icon: CheckSquare,
    title: "My Tasks",
    value: "5 pending",
    description: "Focus on what matters most",
    color: "from-primary to-primary-light",
    items: ["Review API documentation", "Submit weekly report", "Update UI components"],
  },
  {
    icon: Calendar,
    title: "Calendar",
    value: "View schedule",
    description: "Your upcoming events",
    color: "from-emerald-500 to-teal-500",
    items: ["Team standup — 10:00 AM", "Design review — 2:00 PM", "Sprint planning — 4:00 PM"],
  },
  {
    icon: FolderOpen,
    title: "My Files",
    value: "Recently accessed",
    description: "Quick access to your work",
    color: "from-amber-500 to-orange-500",
    items: ["Q3 Report.pdf", "UI Mockups.fig", "Budget_2026.xlsx"],
  },
];

export default function SimplifiedCards({ onOpenChat }: SimplifiedCardsProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Simplified Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, i) => (
          <div
            key={card.title}
            className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 animate-slide-up"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div
              className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${card.color} shadow-lg`}
            >
              <card.icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">{card.title}</h3>
            <p className="mt-1 text-sm text-primary font-semibold">{card.value}</p>
            <p className="mt-1 text-xs text-gray-400">{card.description}</p>

            <div className="mt-4 space-y-2">
              {card.items.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-600"
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-primary/40" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Decorative gradient panel */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-primary-light to-indigo-400 p-8 text-white shadow-lg shadow-primary/20">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

        <div className="relative z-10 flex flex-col items-center text-center sm:flex-row sm:text-left sm:justify-between">
          <div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <Sparkles className="h-5 w-5" />
              <span className="text-sm font-semibold text-white/80">AuraGen</span>
            </div>
            <p className="mt-2 text-xl font-bold italic">
              &ldquo;A simpler workspace, for a brighter you.&rdquo;
            </p>
            <p className="mt-1 text-sm text-white/70">
              Your interface has been optimized for focus and clarity.
            </p>
          </div>
          <button
            onClick={onOpenChat}
            className="mt-4 sm:mt-0 flex items-center gap-2 rounded-xl bg-white/20 backdrop-blur-sm px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-white/30 border border-white/20"
          >
            <MessageCircle className="h-4 w-4" />
            Chat with Aura
          </button>
        </div>
      </div>
    </div>
  );
}
