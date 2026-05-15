import { formatDistanceToNow, parseISO } from "date-fns";
import { type DashboardStats } from "../api/apiCall";

interface StatsGridProps {
  stats: DashboardStats | null;
  loading: boolean;
}

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}sec`;
}

function formatLastSession(isoDate: string) {
  return formatDistanceToNow(parseISO(isoDate), {
    addSuffix: true,
  }).replace(/about /i, "");
}

export function StatsGrid({ stats, loading }: StatsGridProps) {
  const cards = [
    {
      label: "Total Sessions",
      value: stats ? stats.totalSessions.toString() : "0",
      icon: "/assets/1-icon.svg",
      color: "text-[#DC2626]",
      bgColor: "bg-[#FEF2F2]",
    },
    {
      label: "Average Duration",
      value: stats ? formatDuration(stats.averageDuration) : "0m 0s",
      icon: "/assets/Icon.svg",
      color: "text-[#2563EB]",
      bgColor: "bg-[#EFF6FF]",
    },
    {
      label: "AI Used",
      value: stats ? `${stats.aiUsed} times` : "0 times",
      icon: "/assets/sparkles.svg",
      color: "text-[#059669]",
      bgColor: "bg-[#ECFDF5]",
    },
    {
      label: "Last Session",
      value: stats ? formatLastSession(stats.lastSession) : "No sessions yet",
      icon: "/assets/calendar-days.svg",
      color: "text-[#7B57C2]",
      bgColor: "bg-[#EBE1FF]",
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mt-8 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-card border border-border rounded-xl p-3 lg:p-5 h-20 lg:h-24"
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="bg-card border border-border rounded-2xl p-3 flex items-center gap-4 shadow-sm hover:shadow-md transition-all duration-300"
        >
          <div
            className={`w-12 h-12 rounded-xl ${card.bgColor} flex items-center justify-center shrink-0 shadow-sm`}
          >
            <img
              src={card.icon}
              alt={card.label}
              className="w-6 h-6 object-contain"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-medium text-muted-foreground mb-1">
              {card.label}
            </p>
            <p className="text-xl font-bold text-foreground">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
