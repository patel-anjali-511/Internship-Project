import { useState, useEffect } from "react";
import { apiCall, type DashboardStats, type Call } from "../api/apiCall";

export function useDashboardData(userId: string | null) {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [calls, setCalls] = useState<Call[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;

    let mounted = true;
    setLoading(true);

    Promise.all([
      apiCall.getStats(userId),
      apiCall.getRecentCalls(userId),
    ]).then(([statsData, callsData]) => {
      if (mounted) {
        setStats(statsData);
        setCalls(callsData);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
    };
  }, [userId]);

  return { stats, calls, loading };
}
