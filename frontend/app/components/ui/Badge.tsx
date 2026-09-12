import React from "react";

type BadgeVariant = "indigo" | "red" | "green" | "gray" | "warning";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  indigo: "bg-primary-soft text-primary",
  red: "bg-danger-soft text-danger",
  green: "bg-success-soft text-success",
  gray: "bg-gray-100 text-gray-600",
  warning: "bg-warning-soft text-warning",
};

export default function Badge({
  children,
  variant = "indigo",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
