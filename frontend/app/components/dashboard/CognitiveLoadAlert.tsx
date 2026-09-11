import {
  Brain,
  AlertTriangle,
  Clock,
  MousePointerClick,
  ArrowLeftRight,
  ArrowDown,
  TrendingUp,
} from "lucide-react";

const metrics = [
  {
    icon: Clock,
    label: "Time on Page",
    value: "4m 32s",
    increase: "+45%",
  },
  {
    icon: MousePointerClick,
    label: "Repeated Clicks",
    value: "23 clicks",
    increase: "+67%",
  },
  {
    icon: ArrowLeftRight,
    label: "Navigation Backtracks",
    value: "8 times",
    increase: "+38%",
  },
  {
    icon: ArrowDown,
    label: "Scroll Depth",
    value: "92%",
    increase: "+52%",
  },
];

export default function CognitiveLoadAlert() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Alert Banner */}
      <div className="flex items-start gap-4 rounded-2xl border border-red-200 bg-gradient-to-r from-danger-soft to-red-50 p-6 shadow-sm">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-danger/10">
          <Brain className="h-6 w-6 text-danger" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-gray-900">
              High Cognitive Load Detected
            </h3>
            <AlertTriangle className="h-5 w-5 text-danger" />
          </div>
          <p className="mt-1 text-sm leading-relaxed text-gray-600">
            You seem to be spending more time and making repeated actions.
            AuraGen is analyzing your interaction and will simplify the
            interface.
          </p>
        </div>
      </div>

      {/* User Interaction Analysis */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h3 className="mb-5 text-base font-bold text-gray-900">
          User Interaction Analysis
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, i) => (
            <div
              key={metric.label}
              className="rounded-xl border border-gray-100 bg-gray-50/50 p-4 animate-slide-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-danger-soft">
                  <metric.icon className="h-4 w-4 text-danger" />
                </div>
                <div className="flex items-center gap-1 rounded-full bg-danger-soft px-2 py-0.5 text-[11px] font-bold text-danger">
                  <TrendingUp className="h-3 w-3" />
                  {metric.increase}
                </div>
              </div>
              <p className="text-lg font-bold text-gray-900">{metric.value}</p>
              <p className="mt-0.5 text-xs text-gray-500">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
