import { useState, useEffect } from "react";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { StatsGrid } from "./components/StatsGrid";
import { RecentCallsList } from "./components/RecentCallsList";
import { UserSelection } from "./components/UserSelection";
import { FeedbackHistory } from "./components/FeedbackHistory";
import { useDashboardData } from "./hooks/useDashboardData";
import { apiCall, type User } from "./api/apiCall";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [activeUser, setActiveUser] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [dashboard, setDashboard] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState<"dashboard" | "feedback-history">("dashboard");

  const { stats, calls, loading } = useDashboardData(activeUser);

  useEffect(() => {
    apiCall.getUsers().then((fetchedUsers) => {
      setUsers(fetchedUsers);
    });
  }, []);

  useEffect(() => {
    if (isAuthenticated && activeUser) {
      // Fetch both profile and dashboard data
      Promise.all([
        apiCall.getProfile(activeUser),
        apiCall.getDashboard(activeUser),
      ]).then(([profile, dashboardData]) => {
        setCurrentUser(profile);
        setDashboard(dashboardData);
      });
    } else {
      setCurrentUser(null);
      setDashboard(null);
    }
  }, [isAuthenticated, activeUser]);

  const handleLogin = (userId: string) => {
    setActiveUser(userId);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setActiveUser(null);
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <UserSelection users={users} onSelectUser={handleLogin} />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar - Hidden on mobile by default, shown as drawer */}
      <Sidebar
        dashboard={dashboard}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentView={currentView}
        onViewChange={setCurrentView}
        userId={activeUser || ""}
      />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <Header
          users={users}
          activeUser={activeUser}
          profile={currentUser}
          onUserChange={setActiveUser}
          onLogout={handleLogout}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <div className="flex-1 overflow-y-auto bg-white">
          <div className="max-w-6xl mx-auto px-4 lg:px-8 py-6 lg:py-8">
            {currentView === "dashboard" ? (
              <>
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
                  <div>
                    <h2 className="text-xl lg:text-2xl font-medium text-foreground flex items-center gap-2">
                      Hi, {currentUser?.firstName || "User"}{" "}
                      <span className="text-xl lg:text-2xl">👋</span> Welcome to
                      Hintro
                    </h2>
                    <p className="text-xs lg:text-sm text-muted-foreground mt-1">
                      Ready to make your next call smarter ?
                    </p>
                  </div>
                  <button className="w-fit lg:w-auto bg-black text-white px-8 py-2.5 rounded-lg font-bold text-sm hover:bg-black/90 transition-all shadow-lg shadow-black/10">
                    Start New Call
                  </button>
                </div>

                <StatsGrid stats={stats} loading={loading} />
                <RecentCallsList calls={calls} loading={loading} />
              </>
            ) : (
              <FeedbackHistory 
                userId={activeUser || ""} 
                onBack={() => setCurrentView("dashboard")} 
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
