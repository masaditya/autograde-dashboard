import { signOut, useSession } from "next-auth/client";
import { useEffect } from "react";

const Dashboard = () => {
  
  return (
    <div>
      Dashboard
      <button onClick={() => signOut()}>Sign in</button>
    </div>
  );
};

export default Dashboard;
