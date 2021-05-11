import { signOut } from "next-auth/client";
import React from "react";

const Dashboard = () => {
  return (
    <div>
      Dashboard
      <button onClick={() => signOut()}>Sign in</button>
    </div>
  );
};

export default Dashboard;
