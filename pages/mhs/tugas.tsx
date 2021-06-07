import { Accordion } from "components/Dashboard/Accordion";
import { DashboardDiagram } from "components/Dashboard/DashboardDiagram";
import { EXT_API } from "constant";

export default function Tugasku() {
  return (
    <>
      <Accordion />
    </>
  );
}

// export async function getStaticProps() {
//   const res = await (await fetch(EXT_API + "/assignment")).json();
//   return {
//     props: {
//       tugas: res,
//     },
//   };
// }
