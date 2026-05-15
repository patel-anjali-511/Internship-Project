import { type User } from "../api/apiCall";

interface UserSelectionProps {
  users: User[];
  onSelectUser: (userId: string) => void;
}

export function UserSelection({ users, onSelectUser }: UserSelectionProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Welcome back to Hintro
        </h1>
        <p className="text-muted-foreground text-lg">
          Please select a user profile to continue
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl w-full">
        {users.map((user) => (
          <button
            key={user.id}
            onClick={() => onSelectUser(user.id)}
            className="group relative flex flex-col items-center p-8 bg-card border border-border rounded-2xl shadow-sm hover:shadow-xl hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:blur-2xl transition-all" />
              <img
                src={user.avatar}
                alt={user.firstName}
                className="w-32 h-32 rounded-full border-4 border-white shadow-md relative z-10 object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
              {user.firstName}
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              {user.id === "user_1"
                ? "Empty Account"
                : "Demo Account with Data"}
            </p>
            <div className="mt-6 px-6 py-2 bg-muted group-hover:bg-primary group-hover:text-primary-foreground rounded-full text-sm font-medium transition-all">
              Login as {user.firstName}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
