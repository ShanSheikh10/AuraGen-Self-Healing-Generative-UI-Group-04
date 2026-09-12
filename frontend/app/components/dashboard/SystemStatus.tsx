"use client";

import { CheckCircle } from "lucide-react";

export default function SystemStatus() {
  const percentage = 98;
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-base font-bold text-gray-900">System Status</h3>
      <div className="flex flex-col items-center">
        <div className="relative h-32 w-32">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="#EEF2FF"
              strokeWidth="10"
            />
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="transition-all duration-1000"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#818CF8" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-gray-900">
              {percentage}%
            </span>
            <span className="text-[10px] text-gray-500">Uptime</span>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 rounded-full bg-success-soft px-3 py-1.5">
          <CheckCircle className="h-3.5 w-3.5 text-success" />
          <span className="text-xs font-semibold text-success">
            All Systems Normal
          </span>
        </div>
      </div>
    </div>
  );
}
