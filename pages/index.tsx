import { getAssignment } from "lib/assignment";
import AuthGuard from "./_authguard";
import { Wrapper } from "components/Layout/wrapper";

export async function getStaticProps() {
  const assignments = await getAssignment();
  return {
    props: {
      assignments,
    },
  };
}

export default function Home({ assignments }) {
  return (
    <AuthGuard>
      <h1>Hello</h1>
    </AuthGuard>
  );
}
