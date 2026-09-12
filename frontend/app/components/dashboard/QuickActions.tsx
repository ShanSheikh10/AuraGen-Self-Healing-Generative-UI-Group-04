"use client";

import { useState } from "react";
import {
  Plus,
  Upload,
  Video,
  BarChart3,
  X,
  CheckSquare,
  FileUp,
  Link as LinkIcon,
  FileBarChart,
} from "lucide-react";

interface ModalConfig {
  title: string;
  icon: React.ElementType;
  color: string;
  fields: { label: string; placeholder: string; type?: string }[];
  submitLabel: string;
}

const modalConfigs: Record<string, ModalConfig> = {
  "Create Task": {
    title: "Create New Task",
    icon: CheckSquare,
    color: "gradient-bg",
    fields: [
      { label: "Task Name", placeholder: "Enter task name..." },
      { label: "Description", placeholder: "Describe the task..." },
      { label: "Due Date", placeholder: "", type: "date" },
      { label: "Priority", placeholder: "High / Medium / Low" },
    ],
    submitLabel: "Create Task",
  },
  "Upload File": {
    title: "Upload File",
    icon: FileUp,
    color: "bg-success",
    fields: [
      { label: "File Name", placeholder: "Enter file name..." },
      { label: "Category", placeholder: "Documents / Images / Other" },
      { label: "Description", placeholder: "Optional description..." },
    ],
    submitLabel: "Upload",
  },
  "Join Meeting": {
    title: "Join Meeting",
    icon: LinkIcon,
    color: "bg-amber-500",
    fields: [
      { label: "Meeting Link", placeholder: "https://meet.example.com/..." },
      { label: "Meeting Name", placeholder: "e.g. Sprint Planning" },
    ],
    submitLabel: "Join Now",
  },
  "View Reports": {
    title: "View Reports",
    icon: FileBarChart,
    color: "bg-info",
    fields: [
      { label: "Report Type", placeholder: "Weekly / Monthly / Quarterly" },
      { label: "Date Range", placeholder: "Select date range...", type: "date" },
    ],
    submitLabel: "Generate Report",
  },
};

const actions = [
  {
    icon: Plus,
    label: "Create Task",
    color: "bg-primary text-white shadow-primary/25",
  },
  {
    icon: Upload,
    label: "Upload File",
    color: "bg-success text-white shadow-success/25",
  },
  {
    icon: Video,
    label: "Join Meeting",
    color: "bg-amber-500 text-white shadow-amber-500/25",
  },
  {
    icon: BarChart3,
    label: "View Reports",
    color: "bg-info text-white shadow-info/25",
  },
];

export default function QuickActions() {
  const [openModal, setOpenModal] = useState<string | null>(null);

  const config = openModal ? modalConfigs[openModal] : null;

  return (
    <>
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-base font-bold text-gray-900">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => (
            <button
              key={action.label}
              onClick={() => setOpenModal(action.label)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg ${action.color}`}
            >
              <action.icon className="h-4 w-4" />
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {openModal && config && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpenModal(null)}
          />

          {/* Modal content */}
          <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl animate-slide-up">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${config.color} text-white`}
                >
                  <config.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  {config.title}
                </h3>
              </div>
              <button
                onClick={() => setOpenModal(null)}
                className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form fields */}
            <div className="space-y-4">
              {config.fields.map((field) => (
                <div key={field.label}>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    {field.label}
                  </label>
                  <input
                    type={field.type || "text"}
                    placeholder={field.placeholder}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700 outline-none transition-all focus:border-primary/40 focus:bg-white focus:ring-2 focus:ring-primary/10"
                  />
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setOpenModal(null)}
                className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => setOpenModal(null)}
                className="rounded-xl gradient-bg px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/25 transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                {config.submitLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
