import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Spin } from "antd";

export default function AuthGuard({ children }) {
  const [session : SE, loading] = useSession();

  const router = useRouter();
  useEffect(() => {
    if (!loading && !session) {
      console.log(loading, session);
      router.push("/");
    }
  }, [session, loading]);

  if (loading) return null;

  return <> {!loading ? <Spin size="large" /> : children} </>;
}
