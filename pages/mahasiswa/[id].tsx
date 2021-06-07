import { EXT_API } from "constant";
import { Accordion } from "components/Dashboard/Accordion";

export default function MhsDetail({ tugas }) {
  console.log(tugas);
  return (
    <>
      <Accordion />
    </>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${EXT_API}/user`);
  const students = await res.json();
  const paths = students.map((st) => ({
    params: { id: st.id.toString() },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  console.log(`${EXT_API}/user/${params.id}`);
  const res = await fetch(`${EXT_API}/user/${params.id}`);
  const tugas = await res.json();
  return { props: { tugas } };
}
