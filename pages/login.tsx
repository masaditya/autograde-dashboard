import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { LoginForm } from "components/Login";
import { useEffect, useState } from "react";
import { LoadingScreen } from "components/Layout/loadingscreen";

const Login = () => {
  const [session, loading] = useSession();
  const [loadDocs, setLoadDocs] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (!loading && session) {
      router.push("/");
    } else {
      setLoadDocs(true);
    }
  }, [session, loading]);

  if (loading) return null;

  return (
    <>
      {loadDocs ? (
        <LoadingScreen />
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <LoginForm />
        </div>
      )}
    </>
  );
};

export default Login;
