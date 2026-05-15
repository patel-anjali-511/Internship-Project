import { MoreVertical, Calendar } from "lucide-react";
import { format, parseISO } from "date-fns";
import { type Call } from "../api/apiCall";

interface RecentCallsListProps {
  calls: Call[];
  loading: boolean;
}

export function RecentCallsList({ calls, loading }: RecentCallsListProps) {
  if (loading) {
    return (
      <div className="mt-12 space-y-4 animate-pulse">
        <div className="h-6 w-32 bg-muted mx-auto rounded"></div>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-16 bg-card border border-border rounded-xl"
          ></div>
        ))}
      </div>
    );
  }

  if (!calls || calls.length === 0) {
    return (
      <div className="mt-12 flex flex-col items-center">
        <h3 className="text-sm font-semibold text-foreground mb-8">
          Recent calls
        </h3>
        <div className="w-full max-w-4xl py-20 px-4 bg-white border border-border/50 rounded-[32px] flex flex-col items-center text-center shadow-sm">
          <div className="w-12 h-12 bg-[#EEF2FF] rounded-xl flex items-center justify-center mb-6">
            <Calendar size={24} className="text-[#6366F1]" />
          </div>
          <h3 className="text-lg font-bold text-[#0F172A] mb-2">No Recent Calls</h3>
          <p className="text-sm text-[#64748B] max-w-[400px] leading-relaxed mb-8">
            Connect your Google Calendar to see upcoming meetings, get reminders, and join calls directly from Hintro.
          </p>
          <button className="px-6 py-2 border border-border rounded-lg text-sm font-semibold text-foreground hover:bg-muted transition-colors">
            Start a Call
          </button>
        </div>
      </div>
    );
  }

  // Group calls by date string
  const groupedCalls = calls.reduce(
    (acc, call) => {
      const dateStr = format(parseISO(call.date), "MMMM do");
      if (!acc[dateStr]) {
        acc[dateStr] = [];
      }
      acc[dateStr].push(call);
      return acc;
    },
    {} as Record<string, Call[]>,
  );

  return (
    <div className="mt-12">
      <h3 className="text-center text-sm font-semibold text-foreground mb-6">
        Recent calls
      </h3>

      <div className="max-w-4xl mx-auto space-y-8">
        {Object.entries(groupedCalls).map(([dateLabel, dayCalls]) => (
          <div key={dateLabel}>
            <p className="text-xs font-medium text-muted-foreground mb-3 px-2">
              {dateLabel}
            </p>
            <div className="space-y-2">
              {dayCalls.map((call) => (
                <div
                  key={call.id}
                  className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-xl transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#7C3AED] text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
                      {call.title.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-foreground">
                        {call.title}
                      </h4>
                      <div className="flex -space-x-2 mt-1">
                        {call.attendees.map((avatar, idx) => (
                          <img
                            key={idx}
                            src={avatar}
                            alt="Attendee"
                            className="w-5 h-5 rounded-full border border-background"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-xs font-medium text-foreground">
                      {format(parseISO(call.date), "h:mm a")}
                    </span>
                    <button className="text-muted-foreground hover:text-foreground transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
