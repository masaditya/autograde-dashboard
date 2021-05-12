import { signIn, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LoadingScreen } from "components/Layout/loadingscreen";
import { Wrapper } from "components/Layout/wrapper";

export default function AuthGuard({ children }) {
  const [session, loading] = useSession();
  const [loadDocs, setLoadDocs] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (!loading && !session) {
      signIn();
    } else {
      setLoadDocs(true);
    }
  }, [session, loading]);

  if (loading) return null;

  return (
    <> {!loadDocs ? <LoadingScreen /> : <Wrapper> {children} </Wrapper>}</>
  );
}
