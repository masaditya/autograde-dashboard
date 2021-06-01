import { DashboardDiagram } from "components/Dashboard/DashboardDiagram";
import { EXT_API } from "constant";

export default function Dashboard({ tugas }) {
  return (
    <>
      <DashboardDiagram tugas={tugas} />
    </>
  );
}

export async function getStaticProps() {
  const res = await (await fetch(EXT_API + "/assignment")).json();
  return {
    props: {
      tugas: res,
    },
  };
}
