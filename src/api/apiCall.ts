const BASE_URL = "https://mock-backend-hintro.vercel.app/api";

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
};

export type DashboardStats = {
  totalSessions: number;
  averageDuration: number;
  aiUsed: number;
  lastSession: string;
};

export type Call = {
  id: string;
  title: string;
  attendees: string[];
  date: string;
};

export type DashboardData = {
  user: User;
  subscription: {
    plan: string;
    billing_cycle: string;
    status: string;
  };
  usage: {
    kb_files: {
      used: number;
      limit: number;
      percentage: number;
    };
    vocab_terms: number;
    notes: number;
  };
};

const getHeaders = (userId: string) => ({
  "Content-Type": "application/json",
  "x-user-id": userId === "user_1" ? "u1" : "u2",
});

export const apiCall = {
  getUsers: async (): Promise<User[]> => {
    return [
      {
        id: "user_1",
        firstName: "User 1",
        lastName: "",
        email: "user1@example.com",
        avatar: "/assets/user-avatar.jpg",
      },
      {
        id: "user_2",
        firstName: "User 2",
        lastName: "",
        email: "user2@example.com",
        avatar: "/assets/user-avatar.jpg",
      },
    ];
  },

  getProfile: async (userId: string): Promise<User> => {
    const response = await fetch(`${BASE_URL}/auth/profile`, {
      headers: getHeaders(userId),
    });
    const data = await response.json();
    return {
      ...data,
      avatar: "/assets/user-avatar.jpg",
    };
  },

  getDashboard: async (userId: string): Promise<DashboardData> => {
    const response = await fetch(`${BASE_URL}/auth/dashboard`, {
      headers: getHeaders(userId),
    });
    return response.json();
  },

  getStats: async (userId: string): Promise<DashboardStats | null> => {
    try {
      const response = await fetch(`${BASE_URL}/call-sessions/stats`, {
        headers: getHeaders(userId),
      });
      const data = await response.json();

      if (!data || data.totalSessions === 0) return null;

      return {
        totalSessions: data.totalSessions,
        averageDuration: data.averageDuration,
        aiUsed: data.totalAIInteractions,
        lastSession: data.lastSession?.[0] || new Date().toISOString(),
      };
    } catch (error) {
      return null;
    }
  },

  getRecentCalls: async (userId: string): Promise<Call[]> => {
    try {
      const response = await fetch(`${BASE_URL}/call-sessions?limit=10`, {
        headers: getHeaders(userId),
      });
      const data = await response.json();

      return (data.callSessions || []).map((session: any) => ({
        id: session._id,
        title: session.client || "Untitled Call",
        attendees: (session.participants || []).map(() => "/assets/user-avatar.jpg"),
        date: session.started_at,
      }));
    } catch (error) {
      return [];
    }
  },
};

