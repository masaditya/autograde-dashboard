import { signIn, useSession } from "next-auth/client";
import { useContext, useEffect, useState } from "react";
import { LoadingScreen } from "components/Layout/loadingscreen";
import { Wrapper } from "components/Layout/wrapper";
import { AppContext } from "context/ContextWrapper";

export default function AuthGuard({ children }) {
  const [session, loading] = useSession();
  const [loadDocs, setLoadDocs] = useState(false);
  const { setStudentClass, setIsDosen } = useContext(AppContext);

  useEffect(() => {
    if (!loading && !session) {
      signIn();
    } else {
      //@ts-ignore
      session ? setIsDosen(session.user.user.role === "student") : setIsDosen(true)
      //@ts-ignore
      session && setStudentClass(session.user.user.class) 
      setLoadDocs(true);
    }
  }, [session, loading]);

  if (loading) return null;

  return (
    <> {!loadDocs ? <LoadingScreen /> : <Wrapper> {children} </Wrapper>}</>
  );
}
