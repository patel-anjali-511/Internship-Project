import { useState } from "react";
import { X } from "lucide-react";
import { cn } from "../lib/utils";
import { FeedbackModal } from "./FeedbackModal";
import { type DashboardData } from "../api/apiCall";

const navItems = [
  { icon: "/assets/dashboard.svg", label: "Dashboard", active: true },
  { icon: "/assets/phone.svg", label: "Call Insights", active: false },
  {
    icon: "/assets/document-text.svg",
    label: "Knowledge Base",
    active: false,
    info: true,
  },
  {
    icon: "/assets/chat-bubble-bottom-center-text.svg",
    label: "Prompts",
    active: false,
    info: true,
  },
  {
    icon: "/assets/support.svg",
    label: "Boxy Controls",
    active: false,
    info: true,
  },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  currentView: "dashboard" | "feedback-history";
  onViewChange: (view: "dashboard" | "feedback-history") => void;
  userId: string;
}

export function Sidebar({
  isOpen,
  onClose,
  currentView,
  onViewChange,
  userId,
}: SidebarProps) {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 flex flex-col bg-sidebar border-r border-border h-full transition-transform duration-300 lg:relative lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-border">
          <h1 className="text-xl font-bold text-foreground tracking-tight">
            Hintro
          </h1>
          <button
            onClick={onClose}
            className="lg:hidden text-muted-foreground hover:text-foreground"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item, idx) => (
            <button
              key={idx}
              className={cn(
                "w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-all",
                item.label === "Dashboard" && currentView === "dashboard"
                  ? "bg-[#EFF6FF] text-[#2563EB]"
                  : "text-[#64748B] hover:bg-muted hover:text-foreground",
              )}
              onClick={() => {
                if (item.label === "Dashboard") {
                  onViewChange("dashboard");
                  onClose?.();
                }
              }}
            >
              <div className="flex items-center gap-3">
                <img
                  src={item.icon}
                  alt={item.label}
                  className="w-6 h-6 object-contain"
                />
                {item.label}
              </div>
              {item.info && (
                <img
                  src={"/assets/i_icon.svg"}
                  alt={item.label}
                  className="w-4 h-4 object-contain"
                />
              )}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-border space-y-2">
          <button
            onClick={() => {
              onViewChange("feedback-history");
              onClose?.();
            }}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-semibold transition-colors",
              currentView === "feedback-history"
                ? "bg-[#EFF6FF] text-[#2563EB]"
                : "text-[#0F172A] hover:bg-muted",
            )}
          >
            <img
              src={"/assets/inbox-in.svg"}
              alt={""}
              className="w-6 h-6 object-contain"
            />
            Feedback History
          </button>
          <button
            onClick={() => setIsFeedbackOpen(true)}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-semibold text-[#0F172A] hover:bg-muted transition-colors"
          >
            <img
              src={"/assets/gift.svg"}
              alt={""}
              className="w-6 h-6 object-contain"
            />
            Feedback
          </button>

          <div className="pt-6">
            <button className="w-full bg-[#8E8E93] text-white hover:bg-[#8E8E93]/90 font-bold py-3 rounded-xl text-xs transition-colors uppercase tracking-widest">
              UPGRADE
            </button>
          </div>
        </div>
      </aside>

      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        userId={userId}
      />
    </>
  );
}
