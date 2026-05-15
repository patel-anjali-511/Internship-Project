import { useState } from "react";
import {
  Play,
  ChevronDown,
  LogOut,
  Menu,
} from "lucide-react";
import { type User } from "../api/apiCall";
import { LogoutModal } from "./LogoutModal";

interface HeaderProps {
  users: User[];
  activeUser: string | null;
  profile: User | null;
  onLogout: () => void;
  onMenuClick?: () => void;
}

export function Header({
  users,
  activeUser,
  profile,
  onLogout,
  onMenuClick,
}: HeaderProps) {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const currentUser =
    profile || users.find((u) => u.id === activeUser) || users[0];

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 lg:px-8 shrink-0">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-1 -ml-1 text-muted-foreground hover:text-foreground"
        >
          <Menu size={24} />
        </button>
        <h2 className="text-lg font-semibold text-foreground lg:block hidden">Dashboard</h2>
      </div>

      <h2 className="text-lg font-semibold text-foreground lg:hidden absolute left-1/2 -translate-x-1/2">
        Dashboard
      </h2>

      <div className="flex items-center gap-3 lg:gap-6">
        <button className="hidden lg:flex items-center gap-2 px-4 py-1.5 border border-border/80 rounded-lg text-xs font-bold text-foreground hover:bg-muted transition-colors">
          <Play size={14} fill="currentColor" />
          Watch Tutorial
        </button>

        <div className="relative group">
          <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            {currentUser && (
              <div className="flex items-center gap-2">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.firstName}
                  className="w-8 h-8 rounded-full border border-border object-cover"
                />
                <ChevronDown size={14} className="text-muted-foreground" />
              </div>
            )}
          </button>

          <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden origin-top-right">
            <div className="p-1">
              <button
                onClick={() => setIsLogoutModalOpen(true)}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors font-medium"
              >
                <LogOut size={18} />
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={() => {
          setIsLogoutModalOpen(false);
          onLogout();
        }}
      />
    </header>
  );
}
