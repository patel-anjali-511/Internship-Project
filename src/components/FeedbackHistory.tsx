import { useState, useEffect } from "react";
import { formatDistanceToNow, parseISO } from "date-fns";
import { cn } from "../lib/utils";

interface FeedbackEntry {
  id: string;
  text: string;
  date: string;
  category?: string;
  rating?: number;
}

interface FeedbackHistoryProps {
  onBack: () => void;
  userId: string;
}

export function FeedbackHistory({ onBack, userId }: FeedbackHistoryProps) {
  const [feedbacks, setFeedbacks] = useState<FeedbackEntry[]>([]);

  useEffect(() => {
    const storageKey = `hintro_feedback_${userId}`;
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        setFeedbacks(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse feedback history", e);
      }
    } else {
      setFeedbacks([]);
    }
  }, [userId]);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-secondary rounded-full"
            title="Back to Dashboard"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">
              Feedback History
            </h1>
            <p className="text-sm text-muted-foreground">
              Review your past submissions and thoughts
            </p>
          </div>
        </div>
        <div className="bg-primary/5 px-4 py-2 rounded-xl text-primary text-sm font-bold border border-primary/10">
          {feedbacks.length} Submissions
        </div>
      </div>

      {feedbacks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-muted/30 rounded-3xl border border-border">
          <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mb-4 text-muted-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-foreground">
            No feedback found
          </h3>
          <p className="text-muted-foreground mt-1 text-center max-w-xs text-sm">
            Your shared thoughts will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {feedbacks.map((item) => (
            <div
              key={item.id}
              className="bg-card border border-border rounded-2xl p-6"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  {item.category && (
                    <span
                      className={cn(
                        "px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider",
                        item.category === "bug"
                          ? "bg-red-50 text-red-600 border border-red-100"
                          : item.category === "feature"
                            ? "bg-blue-50 text-blue-600 border border-blue-100"
                            : "bg-green-50 text-green-600 border border-green-100",
                      )}
                    >
                      {item.category}
                    </span>
                  )}
                  <span className="text-xs font-medium text-muted-foreground/60">
                    {formatDistanceToNow(parseISO(item.date), {
                      addSuffix: true,
                    }).replace(/about /i, "")}
                  </span>
                </div>
                {item.rating && item.rating > 0 && (
                  <div className="flex items-center gap-1 bg-amber-50/50 px-2 py-1 rounded-lg text-amber-600 border border-amber-100/50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    <span className="text-xs font-bold">{item.rating}</span>
                  </div>
                )}
              </div>
              <p className="text-base text-foreground/80 leading-relaxed">
                "{item.text}"
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
