"use client";

import { Sparkles } from "lucide-react";

export default function LoadingCard() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm animate-slide-up">
      <div className="flex flex-col items-center text-center">
        {/* Spinner */}
        <div className="relative mb-6">
          <div className="h-16 w-16 rounded-full border-4 border-primary-soft" />
          <div className="absolute inset-0 h-16 w-16 rounded-full border-4 border-transparent border-t-primary animate-spin-slow" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-900">
          AuraGen is generating a simplified interface for you...
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          This may take a few seconds.
        </p>

        {/* Progress bar */}
        <div className="mt-6 h-2 w-full max-w-xs overflow-hidden rounded-full bg-primary-soft">
          <div className="h-full rounded-full gradient-bg progress-animate" />
        </div>

        <p className="mt-6 text-xs italic text-gray-400">
          &ldquo;Simplifying your workspace based on real-time cognitive
          analysis...&rdquo;
        </p>
      </div>
    </div>
  );
}
