import { useAuth } from "../hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        No user data available
      </div>
    );
  }

  return (
    <div className="Dashboard">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>
      {user.avatarUrl && (
        <img
          src={user.avatarUrl}
          alt="User Avatar"
          className="mt-4 rounded-full w-16 h-16"
        />
      )}
      <p>{user.spreadSheetId}</p>
    </div>
  );
};

export default Dashboard;
