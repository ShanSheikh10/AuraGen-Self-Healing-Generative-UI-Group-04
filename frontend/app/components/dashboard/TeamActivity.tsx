export interface ActivityItem {
  initials: string;
  color: string;
  name: string;
  action: string;
  target: string;
  time: string;
}

interface TeamActivityProps {
  activities: ActivityItem[];
}

export default function TeamActivity({ activities }: TeamActivityProps) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-bold text-gray-900">Team Activity</h3>
        <button className="text-xs font-medium text-primary hover:underline">
          View all
        </button>
      </div>
      <div className="space-y-4">
        {activities.map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <div
              className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${item.color} text-xs font-bold text-white`}
            >
              {item.initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">{item.name}</span>{" "}
                {item.action}{" "}
                <span className="font-medium text-primary">{item.target}</span>
              </p>
              <p className="mt-0.5 text-xs text-gray-400">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
