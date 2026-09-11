"use client";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const barData = [
  { day: "Mon", completed: 8, pending: 3 },
  { day: "Tue", completed: 6, pending: 5 },
  { day: "Wed", completed: 10, pending: 2 },
  { day: "Thu", completed: 7, pending: 4 },
  { day: "Fri", completed: 9, pending: 3 },
  { day: "Sat", completed: 4, pending: 1 },
  { day: "Sun", completed: 3, pending: 2 },
];

const maxVal = 14;

export default function TaskChart() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-gray-900">Task Overview</h3>
          <p className="mt-0.5 text-xs text-gray-500">Weekly performance</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full gradient-bg" />
            Completed
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-primary-soft" />
            Pending
          </span>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="flex items-end justify-between gap-2 h-40">
        {barData.map((item) => (
          <div key={item.day} className="flex flex-1 flex-col items-center gap-1">
            <div className="relative flex w-full flex-col items-center gap-1" style={{ height: "120px" }}>
              <div
                className="w-6 rounded-t-md gradient-bg transition-all duration-500 mt-auto"
                style={{ height: `${(item.completed / maxVal) * 100}%` }}
                title={`Completed: ${item.completed}`}
              />
              <div
                className="w-6 rounded-t-md bg-primary-soft"
                style={{ height: `${(item.pending / maxVal) * 100}%` }}
                title={`Pending: ${item.pending}`}
              />
            </div>
            <span className="text-[10px] font-medium text-gray-400 mt-2">
              {item.day}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
