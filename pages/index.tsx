import { getAssignment } from "lib/assignment";
import AuthGuard from "./_authguard";
import { Wrapper } from "components/Layout/wrapper";
import { useSession } from "next-auth/client";
import { useContext, useEffect } from "react";
import { AppContext } from "context/ContextWrapper";

export async function getStaticProps() {
  const assignments = await getAssignment();
  return {
    props: {
      assignments,
    },
  };
}

export default function Home({ assignments }) {
  const [session, loading] = useSession();
  const { studentClass, isDosen } = useContext(AppContext);

  useEffect(() => {
    console.log(isDosen);
    return () => {};
  }, [loading]);
  return (
    <AuthGuard>
      <h1>Hello</h1>
    </AuthGuard>
  );
}
