import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  icon: React.ElementType;
  title: string;
  value: string | number;
  trend?: { value: string; direction: "up" | "down" };
  color: "indigo" | "green" | "amber" | "rose" | "blue";
  delay?: string;
}

const colorMap = {
  indigo: {
    bg: "bg-primary-soft",
    icon: "text-primary",
    trend: "text-primary",
  },
  green: {
    bg: "bg-success-soft",
    icon: "text-success",
    trend: "text-success",
  },
  amber: {
    bg: "bg-warning-soft",
    icon: "text-amber-600",
    trend: "text-amber-600",
  },
  rose: {
    bg: "bg-red-50",
    icon: "text-rose-500",
    trend: "text-rose-500",
  },
  blue: {
    bg: "bg-info-soft",
    icon: "text-info",
    trend: "text-info",
  },
};

export default function StatCard({
  icon: Icon,
  title,
  value,
  trend,
  color,
  delay = "0s",
}: StatCardProps) {
  const colors = colorMap[color];
  return (
    <div
      className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 animate-slide-up"
      style={{ animationDelay: delay }}
    >
      <div className="flex items-start justify-between">
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${colors.bg}`}>
          <Icon className={`h-5 w-5 ${colors.icon}`} />
        </div>
        {trend && (
          <div
            className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
              trend.direction === "up"
                ? "bg-success-soft text-success"
                : "bg-danger-soft text-danger"
            }`}
          >
            {trend.direction === "up" ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {trend.value}
          </div>
        )}
      </div>
      <p className="mt-4 text-2xl font-bold text-gray-900">{value}</p>
      <p className="mt-1 text-sm text-gray-500">{title}</p>
    </div>
  );
}
