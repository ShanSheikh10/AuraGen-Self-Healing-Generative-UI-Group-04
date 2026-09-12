import React from "react";

export interface FileItem {
  icon: React.ElementType;
  name: string;
  date: string;
  size: string;
  color: string;
  bg: string;
}

interface RecentFilesProps {
  files: FileItem[];
}

export default function RecentFiles({ files }: RecentFilesProps) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-bold text-gray-900">Recent Files</h3>
        <button className="text-xs font-medium text-primary hover:underline">
          View all
        </button>
      </div>
      <div className="space-y-3">
        {files.map((file) => (
          <div
            key={file.name}
            className="flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-gray-50"
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${file.bg}`}
            >
              <file.icon className={`h-5 w-5 ${file.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium text-gray-900">
                {file.name}
              </p>
              <p className="text-xs text-gray-400">{file.date}</p>
            </div>
            <span className="text-xs font-medium text-gray-400">
              {file.size}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
