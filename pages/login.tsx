import { signIn, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Login = () => {
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (session) {
        router.push("/");
      }
    };
    fetchData();
  }, [session]);
  return (
    <div>
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  );
};

export default Login;
